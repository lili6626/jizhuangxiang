const App = {
  reader: new TarotReader(),
  currentScreen: "home",
  aiAvailable: false,
  selectedSlots: [],
  availableDeck: [],
  dragState: null,
  decisionLabels: null,

  cardBackSVG: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>`,

  parseDecisionOptions(question) {
    const q = question.replace(/（未输入问题）/, "");
    if (!q) return null;
    const patterns = [
      /[（(]([^()）]+?)[)）]\s*(?:还是|or|抑或|或是|或者)\s*[（(]([^()）]+?)[)）]/,
      /([^，。？！,!?]+?)\s*(?:还是|or|抑或|或是|或者)\s*([^，。？！,!?]+?)(?:[，。？！,!?]|$)/,
      /(?:要不要|该不该|是否|是不是)\s*(.+)/,
    ];
    for (const p of patterns) {
      const m = q.match(p);
      if (m) {
        let a, b;
        if (p === patterns[2]) {
          const action = m[1].replace(/[？?！!。，,]+$/, "").trim();
          a = action;
          b = "不" + action;
        } else {
          a = (m[1] || "").trim().replace(/[好坏优劣]$/, "");
          b = (m[2] || "").trim().replace(/[好坏优劣]$/, "");
        }
        if (a && b && a !== b) return { a, b };
      }
    }
    const hm = q.match(/(离开|出去|辞职|放弃|接受|回去|分手|离职)/);
    const opposites = { "离开": "留下", "出去": "留下", "辞职": "留下", "放弃": "坚持", "接受": "拒绝", "回去": "留下", "分手": "复合", "离职": "留下" };
    if (hm && opposites[hm[1]]) return { a: hm[1], b: opposites[hm[1]] };
    return null;
  },

  getDecisionPositionName(posName) {
    if (!this.decisionLabels) return posName;
    return posName.replace(/选择A/g, this.decisionLabels.a).replace(/选择B/g, this.decisionLabels.b);
  },

  init() {
    this.checkAI();
    this.showScreen("home");
  },

  async checkAI() {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
      });
      this.aiAvailable = res.ok;
    } catch {
      this.aiAvailable = false;
    }
  },

  async callAI(messages) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = await res.json();
      return data.choices?.[0]?.message?.content || null;
    } catch {
      return null;
    }
  },

  showScreen(screen) {
    this.currentScreen = screen;
    if (screen !== "draw") {
      this.selectedSlots = [];
      this.availableDeck = [];
    }
    if (screen === "home") this.decisionLabels = null;
    const app = document.getElementById("app");
    app.className = `screen-${screen}`;
    app.innerHTML = "";
    switch (screen) {
      case "home": this.renderHome(); break;
      case "question": this.renderQuestion(); break;
      case "draw": this.renderDraw(); break;
      case "reading": this.renderReading(); break;
    }
  },

  recommendSpread(question) {
    const q = question.toLowerCase();
    const hasSpecificPartner = /他|她|我们|前任|对象|伴侣|老公|老婆|男朋友|女朋友/.test(q);
    const isTimelineQuestion = /什么时候|多久|几时|何时|多久能|什么时候能/.test(q);
    const loveKeywords = ["分手", "复合", "暧昧", "暗恋", "表白", "在一起"];
    const hasLoveKeyword = loveKeywords.some(kw => q.includes(kw));
    const isTrivialYesNo = !hasLoveKeyword && /要不要(吃|买|去|看|做|玩|喝|穿|用|带|拿|给|说|问|发|回|叫|找|换|改|删|加|开|关|停|试|等|搬|养|剪|种|修|学|考|选|报|订|约|送|接|陪|帮|请|让|追|聊)/.test(q) && !/工作|辞职|离职|创业|转行|考研|留学|出国|买房|投资|跳槽/.test(q);
    const isSimpleYesNo = !hasLoveKeyword && !hasSpecificPartner && /^(要不要|该不该|能不能|会不会|是不是|好不好|行不行)\S{0,4}$/.test(q.replace(/[？?！!。，,.]/g, ""));

    const rules = [
      { test: () => hasSpecificPartner && !isTimelineQuestion, spread: "relationship", reason: "关于具体的感情关系，关系牌阵能深入分析双方的感受和走向" },
      { keywords: loveKeywords, spread: "relationship", reason: "关于感情发展的问题，关系牌阵能分析双方的能量和关系走向" },
      { test: () => isSimpleYesNo || isTrivialYesNo, spread: "single", reason: "简单的是/否问题，单牌阵给你最直接的答案" },
      { keywords: ["抉择", "还是", "该不该", "是否"], spread: "decision", reason: "面对二选一的抉择，决策牌阵帮你对比两条路的利弊" },
      { test: () => /要不要|该不该/.test(q) && /工作|辞职|离职|创业|转行|考研|留学|出国|买房|投资|跳槽/.test(q), spread: "decision", reason: "涉及人生重要抉择，决策牌阵帮你全面分析利弊" },
      { test: () => isTimelineQuestion, spread: "horseshoe", reason: "关于时间线和未来趋势的问题，马蹄牌阵能看清脉络和最终走向" },
      { keywords: ["为什么", "怎么回事", "到底", "背后", "隐藏", "深层", "真相", "原因"], spread: "horseshoe", reason: "想了解事情背后的隐藏因素，马蹄牌阵能揭示你看不到的影响" },
      { keywords: ["一生", "命运", "人生", "整体", "全面", "何去何从", "出路", "迷茫"], spread: "celtic", reason: "涉及人生的深层困惑，凯尔特十字牌阵提供最全面的解读" },
    ];

    for (const rule of rules) {
      if (rule.test) {
        if (rule.test()) {
          const spread = TAROT_SPREADS.find(s => s.id === rule.spread);
          return { spread, reason: rule.reason };
        }
      } else if (rule.keywords?.some(kw => q.includes(kw))) {
        const spread = TAROT_SPREADS.find(s => s.id === rule.spread);
        return { spread, reason: rule.reason };
      }
    }
    return { spread: TAROT_SPREADS.find(s => s.id === "three"), reason: "通用型问题，三牌阵通过过去/现在/未来给你清晰的脉络" };
  },

  async aiRecommendSpread(question) {
    const spreadList = TAROT_SPREADS.map(s => `${s.id}(${s.name},${s.card_count}张牌): ${s.description}`).join("\n");
    const result = await this.callAI([
      {
        role: "system",
        content: `你是一位经验丰富的塔罗占卜师，正在为来访者推荐最适合的牌阵。

你要像真正的塔罗师一样思考：
- 如果来访者问"什么时候能谈恋爱"，TA关心的是时间线趋势，还没有具体对象，不应该用关系牌阵（那需要分析双方），应该用三牌阵或马蹄牌阵看趋势
- 如果来访者问"我和他还有机会吗"，TA有具体对象和关系困惑，这时才适合关系牌阵
- 如果来访者纠结要不要做某事，用决策牌阵
- 如果来访者对人生方向迷茫，凯尔特十字最全面

回复格式严格为JSON（不要markdown代码块，不要额外文字）：
{"id":"牌阵id","reason":"推荐理由，口语化，温暖，一句话"}

可选牌阵：
${spreadList}`
      },
      { role: "user", content: question }
    ]);
    if (!result) return null;
    try {
      const match = result.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        const spread = TAROT_SPREADS.find(s => s.id === parsed.id);
        if (spread && parsed.reason) return { spread, reason: parsed.reason };
      }
    } catch {}
    return null;
  },

  backBtn(label = "") {
    return `<button class="back-btn" aria-label="${label || '返回'}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
    </button>`;
  },

  renderHome() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <div class="home-screen">
        <div class="home-header">
          <div class="logo">
            <span class="logo-dot blue"></span>
            <span class="logo-dot green"></span>
            <span class="logo-dot purple"></span>
          </div>
          <h1>又来算了</h1>
          <p class="subtitle">好的信，坏的不信</p>
        </div>
        <div class="recommend-section">
          <div class="recommend-input-row">
            <input type="text" id="recommendInput" placeholder="输入你的问题，为你推荐牌阵..." />
            <button class="recommend-btn" id="recommendBtn">推荐</button>
          </div>
          <div id="recommendResult"></div>
          <label class="reversal-toggle-inline">
            <input type="checkbox" id="reversalCheck" checked>
            <span class="toggle-slider"></span>
            <span>启用逆位</span>
          </label>
        </div>
        <div class="spread-grid">
          ${TAROT_SPREADS.map(s => `
            <div class="spread-card" data-spread="${s.id}">
              <div class="spread-icon">${s.icon}</div>
              <h3>${s.name}</h3>
              <span class="card-count">${s.card_count}张牌</span>
              <p>${s.description}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("recommendBtn").addEventListener("click", async () => {
      const input = document.getElementById("recommendInput").value.trim();
      if (!input) return;

      const resultEl = document.getElementById("recommendResult");
      const btn = document.getElementById("recommendBtn");
      btn.textContent = "思考中...";
      btn.disabled = true;

      let result = null;
      if (this.aiAvailable) result = await this.aiRecommendSpread(input);
      if (!result) result = this.recommendSpread(input);

      btn.textContent = "推荐";
      btn.disabled = false;

      const { spread, reason } = result;
      resultEl.innerHTML = `
        <div class="recommend-card" data-spread="${spread.id}">
          <div class="recommend-spread">
            <span class="recommend-icon">${spread.icon}</span>
            <div>
              <span class="recommend-name">${spread.name}</span>
              <span class="recommend-count">${spread.card_count}张牌</span>
            </div>
          </div>
          <p class="recommend-reason">${reason}</p>
          <span class="recommend-action">点击使用此牌阵 →</span>
        </div>
      `;
      resultEl.querySelector(".recommend-card").addEventListener("click", () => {
        this.reader.setSpread(spread);
        this.reader.useReversals = document.getElementById("reversalCheck").checked;
        this.reader.setQuestion(input);
        this.decisionLabels = spread.id === "decision" ? this.parseDecisionOptions(input) : null;
        this.selectedSlots = new Array(spread.card_count).fill(null);
        this.availableDeck = [...this.reader.deck];
        this.showScreen("draw");
      });
    });

    document.getElementById("recommendInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("recommendBtn").click();
    });

    app.querySelectorAll(".spread-card").forEach(card => {
      card.addEventListener("click", () => {
        const spreadId = card.dataset.spread;
        const spread = TAROT_SPREADS.find(s => s.id === spreadId);
        this.reader.setSpread(spread);
        this.reader.useReversals = document.getElementById("reversalCheck").checked;
        this.showScreen("question");
      });
    });
  },

  renderQuestion() {
    const app = document.getElementById("app");
    const spread = this.reader.currentSpread;
    app.innerHTML = `
      <div class="question-screen">
        ${this.backBtn("返回首页")}
        <div class="question-content">
          <h2>${spread.name}</h2>
          <p class="spread-info">${spread.card_count}张牌 · ${spread.description}</p>
          <div class="position-list">
            ${spread.positions.map(p => `
              <div class="position-item">
                <span class="position-num">${p.index + 1}</span>
                <span class="position-name">${this.getDecisionPositionName(p.name)}</span>
                <span class="position-desc">${p.description.replace(/选择A/g, this.decisionLabels?.a || "A").replace(/选择B/g, this.decisionLabels?.b || "B")}</span>
              </div>
            `).join("")}
          </div>
          <div class="question-input-area">
            <label for="questionInput">你想问什么？</label>
            <textarea id="questionInput" placeholder="在此输入你的问题..." rows="3"></textarea>
            <p class="hint">也可以不输入问题，直接开始抽牌</p>
          </div>
          <button class="primary-btn" id="startDraw">开始抽牌</button>
        </div>
      </div>
    `;

    document.querySelector(".back-btn").addEventListener("click", () => {
      this.reader.resetDeck();
      this.showScreen("home");
    });

    document.getElementById("startDraw").addEventListener("click", () => {
      const question = document.getElementById("questionInput").value.trim();
      this.reader.setQuestion(question || "（未输入问题）");
      this.decisionLabels = spread.id === "decision" ? this.parseDecisionOptions(question || "") : null;
      this.selectedSlots = new Array(spread.card_count).fill(null);
      this.availableDeck = [...this.reader.deck];
      this.showScreen("draw");
    });
  },

  renderDraw() {
    this._slotsBound = false;
    const app = document.getElementById("app");
    const spread = this.reader.currentSpread;
    const filledCount = this.selectedSlots.filter(s => s !== null).length;
    const allFilled = filledCount === spread.card_count;

    app.innerHTML = `
      <div class="draw-screen">
        ${this.backBtn("返回")}
        <div class="draw-header">
          <div class="draw-progress">${filledCount} / ${spread.card_count}</div>
          <p>凭直觉点击牌背，选择你的牌</p>
        </div>
        <div class="draw-area" id="drawArea"></div>
        <div class="draw-slots" id="drawSlots">
          ${spread.positions.map((p, i) => `
            <div class="draw-slot ${this.selectedSlots[i] ? 'filled' : ''}" data-slot="${i}">
              <div class="slot-card-area" data-slot="${i}">
                ${this.selectedSlots[i] ? `<div class="slot-card-back">${this.cardBackSVG}</div>` : '<div class="slot-empty"></div>'}
              </div>
              <span class="slot-name">${this.getDecisionPositionName(p.name)}</span>
            </div>
          `).join("")}
        </div>
        <button class="primary-btn reveal-btn ${allFilled ? '' : 'hidden'}" id="revealBtn">解读</button>
      </div>
    `;

    document.querySelector(".back-btn").addEventListener("click", () => {
      this.reader.resetDeck();
      this.selectedSlots = [];
      this.availableDeck = [];
      this.showScreen("question");
    });

    this.renderCardBacks();
    this.bindSlotEvents();
  },

  renderSlotCard() {
    return `<div class="slot-card-back">${this.cardBackSVG}</div>`;
  },

  renderCardBacks() {
    const area = document.getElementById("drawArea");
    if (!area) return;
    const remaining = this.availableDeck.length;
    const perRow = window.innerWidth < 500 ? 10 : 13;
    const totalRows = Math.ceil(remaining / perRow);
    area.innerHTML = "";

    let rowEl = null;
    for (let i = 0; i < remaining; i++) {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const totalInRow = row < totalRows - 1 ? perRow : remaining - row * perRow;
      const isTop = col === totalInRow - 1;
      const rotation = (col - totalInRow / 2) * 1.5 + (Math.random() - 0.5) * 2;

      if (col === 0) {
        rowEl = document.createElement("div");
        rowEl.className = "draw-area-row";
        area.appendChild(rowEl);
      }

      const card = document.createElement("div");
      card.className = "deck-card" + (isTop ? " deck-card-top" : "");
      card.dataset.deckIndex = i;
      card.innerHTML = `<div class="deck-card-inner" style="transform:rotate(${rotation}deg)">${this.cardBackSVG}</div>`;
      card.addEventListener("click", () => this.selectCard(i));
      rowEl.appendChild(card);
    }
  },

  selectCard(deckIndex) {
    const spread = this.reader.currentSpread;
    const emptyIndex = this.selectedSlots.findIndex(s => s === null);
    if (emptyIndex === -1) return;

    const card = { ...this.availableDeck[deckIndex] };
    card.is_reversed = this.reader.useReversals && Math.random() < 0.5;

    this.selectedSlots[emptyIndex] = { card, is_reversed: card.is_reversed };
    this.availableDeck.splice(deckIndex, 1);

    const clickedEl = document.querySelector(`.deck-card[data-deck-index="${deckIndex}"]`);
    if (clickedEl) {
      const slot = document.querySelector(`.slot-card-area[data-slot="${emptyIndex}"]`);
      if (slot) {
        clickedEl.classList.add("card-pull-up");
        const rect = clickedEl.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();

        const ghost = clickedEl.cloneNode(true);
        ghost.classList.remove("card-pull-up");
        ghost.classList.add("card-ghost");
        ghost.style.position = "fixed";
        ghost.style.left = rect.left + "px";
        ghost.style.top = rect.top + "px";
        ghost.style.width = rect.width + "px";
        ghost.style.height = rect.height + "px";
        ghost.style.zIndex = "999";
        ghost.style.pointerEvents = "none";
        document.body.appendChild(ghost);

        setTimeout(() => {
          ghost.style.transition = "all 0.35s ease";
          ghost.style.left = (slotRect.left + slotRect.width / 2 - rect.width / 2) + "px";
          ghost.style.top = (slotRect.top + slotRect.height / 2 - rect.height / 2) + "px";
          ghost.style.transform = "scale(0.85)";
          ghost.style.opacity = "0.7";
        }, 200);

        clickedEl.style.opacity = "0";
        setTimeout(() => {
          clickedEl.remove();
          ghost.remove();
        }, 550);
      }
    }

    this.refreshDrawUI();
  },

  returnCard(slotIndex) {
    const slot = this.selectedSlots[slotIndex];
    if (!slot) return;

    this.availableDeck.push(slot.card);
    this.selectedSlots[slotIndex] = null;
    this.refreshDrawUI();
  },

  swapSlots(i, j) {
    const temp = this.selectedSlots[i];
    this.selectedSlots[i] = this.selectedSlots[j];
    this.selectedSlots[j] = temp;
    this.refreshDrawUI();
  },

  refreshDrawUI() {
    const spread = this.reader.currentSpread;
    const filledCount = this.selectedSlots.filter(s => s !== null).length;
    const allFilled = filledCount === spread.card_count;

    const progress = document.querySelector(".draw-progress");
    if (progress) progress.textContent = `${filledCount} / ${spread.card_count}`;

    const slotsContainer = document.getElementById("drawSlots");
    if (slotsContainer) {
      spread.positions.forEach((p, i) => {
        const slotEl = slotsContainer.querySelector(`[data-slot="${i}"]`);
        if (!slotEl) return;
        const cardArea = slotEl.querySelector(".slot-card-area");
        if (this.selectedSlots[i]) {
          slotEl.classList.add("filled");
          cardArea.innerHTML = this.renderSlotCard();
        } else {
          slotEl.classList.remove("filled");
          cardArea.innerHTML = '<div class="slot-empty"></div>';
        }
      });
    }

    const revealBtn = document.getElementById("revealBtn");
    if (revealBtn) {
      revealBtn.classList.toggle("hidden", !allFilled);
    }

    this.renderCardBacks();
    this.bindSlotEvents();
  },

  bindSlotEvents() {
    const self = this;
    if (this._slotsBound) return;
    this._slotsBound = true;
    let longPressTimer = null;
    let isDragging = false;
    let dragSlotIndex = null;
    let dragGhost = null;
    let dragStartX = 0, dragStartY = 0;

    document.querySelectorAll(".slot-card-area").forEach(el => {
      const slotIndex = parseInt(el.dataset.slot);
      if (!self.selectedSlots[slotIndex]) return;

      el.style.touchAction = "none";

      el.addEventListener("pointerdown", (e) => {
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragSlotIndex = slotIndex;

        longPressTimer = setTimeout(() => {
          isDragging = true;
          el.setPointerCapture(e.pointerId);
          el.style.opacity = "0.4";

          const rect = el.getBoundingClientRect();
          dragGhost = document.createElement("div");
          dragGhost.className = "drag-ghost";
          dragGhost.innerHTML = self.renderSlotCard();
          dragGhost.style.position = "fixed";
          dragGhost.style.left = (e.clientX - 30) + "px";
          dragGhost.style.top = (e.clientY - 44) + "px";
          dragGhost.style.zIndex = "9999";
          dragGhost.style.pointerEvents = "none";
          document.body.appendChild(dragGhost);

          document.querySelectorAll(".draw-slot").forEach(s => {
            if (parseInt(s.dataset.slot) !== slotIndex && self.selectedSlots[parseInt(s.dataset.slot)]) {
              s.classList.add("swap-target");
            }
          });
        }, 250);
      });

      el.addEventListener("pointermove", (e) => {
        if (longPressTimer && !isDragging) {
          const dx = e.clientX - dragStartX;
          const dy = e.clientY - dragStartY;
          if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
          }
        }
        if (isDragging && dragGhost) {
          dragGhost.style.left = (e.clientX - 30) + "px";
          dragGhost.style.top = (e.clientY - 44) + "px";
        }
      });

      el.addEventListener("pointerup", (e) => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
        if (isDragging) {
          isDragging = false;
          el.style.opacity = "1";

          if (dragGhost) {
            dragGhost.remove();
            dragGhost = null;
          }

          document.querySelectorAll(".draw-slot").forEach(s => s.classList.remove("swap-target", "swap-highlight"));

          const dropEl = document.elementFromPoint(e.clientX, e.clientY);
          const dropSlot = dropEl?.closest(".draw-slot");
          if (dropSlot) {
            const dropIndex = parseInt(dropSlot.dataset.slot);
            if (dropIndex !== dragSlotIndex && self.selectedSlots[dropIndex]) {
              self.swapSlots(dragSlotIndex, dropIndex);
            }
          }
          dragSlotIndex = null;
        } else {
          self.returnCard(slotIndex);
        }
      });

      el.addEventListener("pointercancel", () => {
        if (longPressTimer) clearTimeout(longPressTimer);
        isDragging = false;
        if (dragGhost) { dragGhost.remove(); dragGhost = null; }
        el.style.opacity = "1";
        document.querySelectorAll(".draw-slot").forEach(s => s.classList.remove("swap-target", "swap-highlight"));
      });
    });

    const revealBtn = document.getElementById("revealBtn");
    if (revealBtn && !revealBtn._bound) {
      revealBtn._bound = true;
      revealBtn.addEventListener("click", () => this.startReveal());
    }
  },

  async startReveal() {
    const spread = this.reader.currentSpread;
    this.reader.setDrawnCards(this.selectedSlots, spread);
    this.showScreen("reading");
  },

  async renderReading() {
    const app = document.getElementById("app");
    if (!app) return;
    try {
    const reading = this.reader.getReading();
    if (!reading) {
      app.innerHTML = `
        <div class="reading-screen">
          ${this.backBtn("返回首页")}
          <p style="text-align:center;padding:60px 0;color:var(--text-secondary);">解读生成失败，请重新占卜</p>
          <button class="primary-btn" id="restartBtn">重新占卜</button>
        </div>`;
      document.querySelector(".back-btn")?.addEventListener("click", () => {
        this.reader.resetDeck();
        this.showScreen("home");
      });
      document.getElementById("restartBtn")?.addEventListener("click", () => {
        this.reader.resetDeck();
        this.showScreen("home");
      });
      return;
    }
    const { spread, question, cards, domain, summary } = reading;
    const domainLabels = { love: "感情", career: "事业", finance: "财务", health: "健康", study: "学业", general: "综合" };

    app.innerHTML = `
      <div class="reading-screen">
        ${this.backBtn("重新抽牌")}
        <div class="reading-header">
          <h2>${spread.name} · 解读</h2>
          <span class="reading-domain-tag">${domainLabels[domain]}指引</span>
          <p class="reading-question">${question}</p>
        </div>
        <div class="reading-loading" id="readingLoading">
          <div class="loading-spinner"></div>
          <p>正在为你解读...</p>
        </div>
        <div class="reading-cards" id="readingCards" style="display:none"></div>
        <div class="reading-summary" id="readingSummary" style="display:none">
          <h3>给你的话</h3>
          <p id="summaryText"></p>
        </div>
        <button class="primary-btn" id="restartBtn" style="display:none">重新占卜</button>
      </div>
    `;

    document.querySelector(".back-btn").addEventListener("click", () => {
      this.reader.resetDeck();
      this.selectedSlots = new Array(spread.card_count).fill(null);
      this.availableDeck = [...this.reader.deck];
      this.showScreen("draw");
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
      this.reader.resetDeck();
      this.showScreen("home");
    });

    let aiReading = null;

    if (this.aiAvailable) {
      const cardsInfo = cards.map(c =>
        `【${c.position.name}】位置：${c.name_zh}(${c.name_en}) ${c.is_reversed ? "逆位" : "正位"}\n关键词：${(c.is_reversed ? c.reversed_keywords : c.upright_keywords).join("、")}\n基本牌意：${c.is_reversed ? c.reversed_description : c.upright_description}`
      ).join("\n\n");

      aiReading = await this.callAI([
        {
          role: "system",
          content: `你是一位拥有十年经验的塔罗占卜师，风格温暖、真诚、像朋友聊天。你正在为一位来访者解读牌面。

来访者的问题领域：${domainLabels[domain]}
${this.decisionLabels ? `\n这是一个决策牌阵，选项A是"${this.decisionLabels.a}"，选项B是"${this.decisionLabels.b}"。请在解读中直接使用"${this.decisionLabels.a}"和"${this.decisionLabels.b}"代替"选择A""选择B"。` : ""}

解读要求：
1. 每张牌的解读必须结合它在牌阵中的位置含义。比如"过去"位置出现愚者正位，不是说愚者本身的含义，而是说过去经历中有着愚者"新开始、天真冒险"的课题
2. 正位牌重点说机遇、能量和可发挥的优势；逆位牌不是说运气差，而是说能量受阻、需要调整，给出来调整方向
3. 解读要具体、有针对性，像在跟朋友说话。不要说"你可能需要考虑沟通"这种模糊的话，要说"试着直接告诉TA你的感受，发条消息也行"
4. 如果问题涉及感情，给感情建议；涉及事业，给职业建议；不要所有领域用同一套话术
5. 不要每张牌都用"这暗示着""这告诉我们"开头，换不同的表达方式
6. "给你的话"部分要像写一封信给来访者，真诚、有温度，3-4句话

严格用以下JSON格式回复（不要markdown代码块，不要额外文字）：
{"cards":[{"position":"位置名","advice":"解读内容，2-3句话"},{"position":"位置名","advice":"解读内容，2-3句话"}],"summary":"给你的话，3-4句话"}`
        },
        {
          role: "user",
          content: `我的问题是：${question}\n\n牌阵：${spread.name}（${spread.card_count}张牌）\n\n抽到的牌：\n${cardsInfo}`
        }
      ]);
    }

    const loading = document.getElementById("readingLoading");
    const cardsEl = document.getElementById("readingCards");
    const summaryEl = document.getElementById("readingSummary");
    const restartBtn = document.getElementById("restartBtn");

    if (!cardsEl || !loading || !summaryEl || !restartBtn) return;

    let parsedAI = null;
    if (aiReading) {
      try {
        const match = aiReading.match(/\{[\s\S]*\}/);
        if (match) parsedAI = JSON.parse(match[0]);
      } catch {}
    }

    cardsEl.innerHTML = cards.map((card, i) => {
      const displayName = this.getDecisionPositionName(card.position.name);
      const displayDesc = card.position.description.replace(/选择A/g, this.decisionLabels?.a || "A").replace(/选择B/g, this.decisionLabels?.b || "B");
      const aiAdvice = parsedAI?.cards?.find(c => c.position === card.position.name || c.position === displayName)?.advice;
      const fallbackAdvice = card.contextual_advice;
      const advice = aiAdvice || fallbackAdvice;

      return `
        <div class="reading-card-item" data-index="${i}">
          <div class="reading-card-row">
            <div class="reading-card-visual ${card.is_reversed ? "reversed" : ""}">
              <span class="rc-arcana">${card.arcana === "major" ? "大" : "小"}</span>
              <h3 class="rc-name">${card.name_zh}</h3>
              <span class="rc-en">${card.name_en}</span>
              <span class="rc-orient ${card.is_reversed ? "rev" : ""}">${card.is_reversed ? "逆位" : "正位"}</span>
            </div>
            <div class="reading-card-body">
              <div class="reading-card-pos">
                <span class="pos-label">${displayName}</span>
                <span class="pos-desc">${displayDesc}</span>
              </div>
              <div class="rc-keywords">
                ${(card.is_reversed ? card.reversed_keywords : card.upright_keywords).map(k => `<span class="keyword">${k}</span>`).join("")}
              </div>
              <p class="rc-advice">${advice}</p>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const summaryText = parsedAI?.summary || summary;
    document.getElementById("summaryText").textContent = summaryText;

    loading.style.display = "none";
    cardsEl.style.display = "flex";
    summaryEl.style.display = "block";
    restartBtn.style.display = "block";

    this.animateReadingCards();
  } catch (err) {
    console.error("renderReading error:", err);
    app.innerHTML = `
      <div class="reading-screen">
        ${this.backBtn("返回首页")}
        <p style="text-align:center;padding:60px 0;color:var(--text-secondary);">解读出错，请重新占卜</p>
        <button class="primary-btn" id="errRestart">重新占卜</button>
      </div>`;
    document.querySelector(".back-btn")?.addEventListener("click", () => {
      this.reader.resetDeck();
      this.showScreen("home");
    });
    document.getElementById("errRestart")?.addEventListener("click", () => {
      this.reader.resetDeck();
      this.showScreen("home");
    });
  }
  },

  animateReadingCards() {
    const items = document.querySelectorAll(".reading-card-item");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      setTimeout(() => {
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, i * 150);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
