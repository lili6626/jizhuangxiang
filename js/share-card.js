const ShareCardGenerator = (() => {
  const W = 1080;

  const C = {
    BG: '#FCF9F4', BG2: '#F5FAF8',
    SAGE: '#8AC08A', SAGE_D: '#4E915C', SAGE_L: '#E4F4E4', SAGE_P: '#C8E8C8',
    CORAL: '#E67E72', CORAL_D: '#C6544C', CORAL_L: '#FCE4DE', CORAL_P: '#F6CEC8',
    LAVEN: '#A498D0', LAVEN_D: '#7864B2', LAVEN_L: '#E6E2F8', LAVEN_P: '#D6CEEE',
    BUTTER: '#F8E08C', BUTTER_D: '#CCAA44', BUTTER_P: '#FCEEC0',
    NAVY: '#2C3448', NAVY_L: '#4C586E', NAVY_D: '#7E8A9E', NAVY_M: '#AEB6C2', NAVY_S: '#C6CED6',
  };

  const ACCENT = [C.SAGE, C.CORAL, C.LAVEN];
  const ACCENT_D = [C.SAGE_D, C.CORAL_D, C.LAVEN_D];
  const ACCENT_L = [C.SAGE_L, C.CORAL_L, C.LAVEN_L];
  const ACCENT_P = [C.SAGE_P, C.CORAL_P, C.LAVEN_P];

  const FONT_CN = '"Noto Serif SC", "Microsoft YaHei", "微软雅黑", "PingFang SC", sans-serif';
  const FONT_EN = 'sans-serif';

  function srand(seed) {
    let s = seed | 0;
    return () => { s = (s * 1664525 + 1013904223) | 0; return (s >>> 0) / 4294967296; };
  }

  function rr(ctx, x, y, w, h, r, fill, stroke, lw) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); }
  }

  function pill(ctx, x, y, w, h, fill, stroke, lw) {
    rr(ctx, x, y, w, h, h / 2, fill, stroke, lw);
  }

  function ct(ctx, text, x, y, font, color, align) {
    ctx.font = font; ctx.fillStyle = color;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
  }

  function ctCenter(ctx, text, cx, y, font, color) {
    ctx.font = font; ctx.fillStyle = color;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(text, cx, y);
  }

  function measureW(ctx, text, font) {
    ctx.font = font; return ctx.measureText(text).width;
  }

  function dashedH(ctx, y, x0, x1, dash, gap, color, lw) {
    ctx.strokeStyle = color; ctx.lineWidth = lw || 1;
    ctx.setLineDash([dash, gap]);
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    ctx.setLineDash([]);
  }

  function dashedRect(ctx, x0, y0, x1, y1, r, dash, gap, color, lw) {
    ctx.strokeStyle = color; ctx.lineWidth = lw || 1;
    ctx.setLineDash([dash, gap]);
    ctx.beginPath(); ctx.roundRect(x0, y0, x1 - x0, y1 - y0, r); ctx.stroke();
    ctx.setLineDash([]);
  }

  function star4(ctx, cx, cy, sz, color, lw) {
    ctx.strokeStyle = color; ctx.lineWidth = lw || 2;
    ctx.beginPath();
    ctx.moveTo(cx - sz, cy); ctx.lineTo(cx + sz, cy);
    ctx.moveTo(cx, cy - sz); ctx.lineTo(cx, cy + sz);
    ctx.stroke();
  }

  function star5(ctx, cx, cy, sz, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * 2 * i / 10 - Math.PI / 2;
      const r = i % 2 === 0 ? sz : sz * 0.42;
      const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill();
  }

  function wobblyCircle(ctx, cx, cy, r, color, lw, rng) {
    ctx.strokeStyle = color; ctx.lineWidth = lw || 2;
    ctx.beginPath();
    const n = 28;
    for (let i = 0; i <= n; i++) {
      const a = Math.PI * 2 * i / n;
      const w = (rng ? rng() : Math.random()) * 2.4 - 1.2;
      const px = cx + (r + w) * Math.cos(a), py = cy + (r + w) * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  function illust(ctx, cx, cy, r, name, accent, rng) {
    wobblyCircle(ctx, cx, cy, r, C.NAVY_M, 2, rng);

    const drawStar5In = (dx, dy, sz, c) => star5(ctx, cx + dx, cy + dy, sz, c);
    const drawStar4In = (dx, dy, sz, c) => star4(ctx, cx + dx, cy + dy, sz, c, 1);
    const line = (x1, y1, x2, y2, c, w) => {
      ctx.strokeStyle = c; ctx.lineWidth = w || 2;
      ctx.beginPath(); ctx.moveTo(cx + x1, cy + y1); ctx.lineTo(cx + x2, cy + y2); ctx.stroke();
    };
    const arc = (rx, ry, rw, rh, sa, ea, c, w) => {
      ctx.strokeStyle = c; ctx.lineWidth = w || 2;
      ctx.beginPath(); ctx.ellipse(cx + rx, cy + ry, rw, rh, 0, sa, ea); ctx.stroke();
    };

    if (name.includes('愚')) {
      drawStar5In(0, -r * 0.33, r * 0.22, C.BUTTER);
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i + Math.PI / 6;
        line(r * 0.2 * Math.cos(a), -r * 0.33 + r * 0.2 * Math.sin(a), r * 0.38 * Math.cos(a), -r * 0.33 + r * 0.38 * Math.sin(a), C.BUTTER_D, 1);
      }
      line(0, -r * 0.12, 0, r * 0.33, C.SAGE_D, 2);
    } else if (name.includes('魔术')) {
      drawStar5In(0, 0, r * 0.32, accent);
      drawStar4In(-r * 0.42, -r * 0.42, r * 0.14, accent);
      drawStar4In(r * 0.42, -r * 0.42, r * 0.14, accent);
    } else if (name.includes('女祭')) {
      arc(0, 0, r * 0.4, r * 0.4, Math.PI * 1.1, Math.PI * 1.88, C.LAVEN, 3);
      arc(0, 0, r * 0.25, r * 0.25, Math.PI * 1.1, Math.PI * 1.88, C.NAVY_D, 2);
      drawStar5In(-r * 0.15, -r * 0.2, r * 0.08, C.LAVEN_L);
    } else if (name.includes('皇')) {
      drawStar5In(0, 0, r * 0.32, accent);
      line(-r * 0.33, r * 0.33, r * 0.33, r * 0.33, accent, 2);
      line(0, -r * 0.33, 0, r * 0.25, accent, 2);
    } else if (name.includes('教皇') || name.includes('祭司')) {
      drawStar5In(0, -r * 0.15, r * 0.2, accent);
      line(-r * 0.25, 0, r * 0.25, 0, accent, 2);
      line(0, r * 0.1, 0, r * 0.35, accent, 2);
    } else if (name.includes('恋')) {
      drawStar5In(-r * 0.2, 0, r * 0.14, C.CORAL);
      drawStar5In(r * 0.2, 0, r * 0.14, C.CORAL);
      arc(0, r * 0.05, r * 0.28, r * 0.22, 0, Math.PI, C.CORAL, 1);
    } else if (name.includes('战车')) {
      line(0, -r * 0.4, 0, r * 0.3, accent, 3);
      drawStar5In(0, -r * 0.4, r * 0.15, C.CORAL);
      line(-r * 0.3, r * 0.3, r * 0.3, r * 0.3, accent, 2);
    } else if (name.includes('力量')) {
      arc(0, 0, r * 0.35, r * 0.3, 0, Math.PI * 1.8, accent, 2);
      drawStar5In(r * 0.15, -r * 0.15, r * 0.1, C.CORAL);
    } else if (name.includes('隐')) {
      drawStar5In(0, -r * 0.35, r * 0.12, C.BUTTER);
      line(0, -r * 0.2, 0, r * 0.35, C.SAGE_D, 2);
      arc(0, r * 0.1, r * 0.12, r * 0.12, 0, Math.PI * 2, C.SAGE, 1);
    } else if (name.includes('命运') || name.includes('轮')) {
      const rng2 = srand(77);
      wobblyCircle(ctx, cx, cy, r * 0.35, accent, 2, rng2);
      drawStar5In(0, 0, r * 0.12, C.CORAL);
    } else if (name.includes('正义')) {
      line(0, -r * 0.4, 0, r * 0.35, accent, 2);
      line(-r * 0.3, -r * 0.1, r * 0.3, -r * 0.1, accent, 2);
      drawStar5In(0, -r * 0.4, r * 0.1, C.LAVEN);
    } else if (name.includes('倒吊')) {
      line(0, -r * 0.35, 0, r * 0.15, accent, 2);
      line(-r * 0.25, r * 0.15, r * 0.25, r * 0.15, accent, 2);
      drawStar5In(0, r * 0.3, r * 0.08, C.BUTTER);
    } else if (name.includes('死')) {
      arc(0, 0, r * 0.3, r * 0.3, 0, Math.PI * 2, accent, 2);
      line(-r * 0.2, -r * 0.15, r * 0.2, r * 0.15, accent, 2);
      line(r * 0.2, -r * 0.15, -r * 0.2, r * 0.15, accent, 2);
    } else if (name.includes('节制')) {
      arc(0, -r * 0.1, r * 0.28, r * 0.2, Math.PI * 0.1, Math.PI * 0.9, accent, 2);
      line(0, r * 0.1, 0, r * 0.4, accent, 2);
    } else if (name.includes('恶魔')) {
      drawStar5In(0, 0, r * 0.3, accent);
      arc(0, r * 0.15, r * 0.15, r * 0.12, 0, Math.PI, accent, 1);
    } else if (name.includes('高塔') || name.includes('塔')) {
      line(-r * 0.2, r * 0.3, 0, -r * 0.35, accent, 2);
      line(r * 0.2, r * 0.3, 0, -r * 0.35, accent, 2);
      drawStar4In(0, -r * 0.35, r * 0.18, C.CORAL, 2);
    } else if (name.includes('星')) {
      drawStar5In(0, 0, r * 0.35, C.BUTTER);
      for (let i = 0; i < 8; i++) {
        const a = Math.PI / 4 * i;
        line(r * 0.2 * Math.cos(a), r * 0.2 * Math.sin(a), r * 0.45 * Math.cos(a), r * 0.45 * Math.sin(a), C.BUTTER_D, 1);
      }
    } else if (name.includes('月')) {
      arc(r * 0.08, 0, r * 0.38, r * 0.38, Math.PI * 1.1, Math.PI * 1.88, C.LAVEN, 3);
      drawStar5In(-r * 0.05, -r * 0.15, r * 0.08, C.LAVEN_L);
    } else if (name.includes('太阳')) {
      drawStar5In(0, 0, r * 0.32, C.BUTTER);
      for (let i = 0; i < 8; i++) {
        const a = Math.PI / 4 * i;
        line(r * 0.22 * Math.cos(a), r * 0.22 * Math.sin(a), r * 0.45 * Math.cos(a), r * 0.45 * Math.sin(a), C.BUTTER_D, 1);
      }
    } else if (name.includes('审判')) {
      drawStar4In(0, -r * 0.3, r * 0.2, accent, 2);
      line(0, -r * 0.1, 0, r * 0.35, accent, 2);
      drawStar5In(0, r * 0.35, r * 0.1, C.BUTTER);
    } else if (name.includes('世界')) {
      wobblyCircle(ctx, cx, cy, r * 0.35, accent, 2, rng);
      drawStar5In(0, 0, r * 0.15, C.BUTTER);
    } else if (name.includes('杯')) {
      arc(0, -r * 0.1, r * 0.25, r * 0.2, 0, Math.PI, C.CORAL, 2);
      line(-r * 0.25, -r * 0.1, r * 0.25, -r * 0.1, C.CORAL, 2);
      line(0, r * 0.1, 0, r * 0.38, C.CORAL, 2);
    } else if (name.includes('杖')) {
      line(0, -r * 0.4, 0, r * 0.4, C.SAGE_D, 3);
      drawStar5In(0, -r * 0.4, r * 0.15, C.CORAL);
    } else if (name.includes('剑')) {
      line(0, -r * 0.4, 0, r * 0.25, C.NAVY_L, 2);
      line(-r * 0.28, -r * 0.12, r * 0.28, -r * 0.12, C.NAVY_L, 2);
      drawStar5In(0, r * 0.3, r * 0.08, C.NAVY_M);
    } else if (name.includes('币')) {
      const rng2 = srand((rng ? 0 : 1) + 7);
      wobblyCircle(ctx, cx, cy, r * 0.3, C.BUTTER, 2, rng2);
      wobblyCircle(ctx, cx, cy, r * 0.12, C.BUTTER_D, 1, srand(99));
    } else {
      drawStar5In(0, 0, r * 0.28, accent);
    }
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
    ctx.font = font; ctx.fillStyle = color;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    let line = '', cy = y;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const test = line + ch;
      if (ctx.measureText(test).width > maxWidth && line.length > 0) {
        ctx.fillText(line, x, cy);
        line = ch; cy += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, x, cy);
    return cy + lineHeight;
  }

  function applyPaperGrain(ctx, w, h) {
    const id = ctx.getImageData(0, 0, w, h);
    const d = id.data;
    const rng = srand(99);
    for (let i = 0; i < 5000; i++) {
      const px = (rng() * w) | 0, py = (rng() * h) | 0;
      const idx = (py * w + px) * 4;
      const a = [8, 10, 12][(rng() * 3) | 0];
      d[idx] = Math.max(0, d[idx] - a);
      d[idx + 1] = Math.max(0, d[idx + 1] - a);
      d[idx + 2] = Math.max(0, d[idx + 2] - a);
    }
    ctx.putImageData(id, 0, 0);
  }

  function drawBlobs(ctx, w, h) {
    ctx.save();
    if (typeof ctx.filter !== 'undefined') {
      ctx.filter = 'blur(90px)';
    }
    ctx.globalAlpha = 0.035;
    ctx.fillStyle = '#FCDED6';
    ctx.beginPath(); ctx.ellipse(w - 175, 130, 230, 160, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#DAF2DA';
    ctx.beginPath(); ctx.ellipse(145, h - 155, 195, 185, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#E4DEF8';
    ctx.beginPath(); ctx.ellipse(125, 640, 155, 160, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawDecorations(ctx, w, h) {
    const rng = srand(42);
    const sparkles = [[130,88],[920,75],[75,395],[955,365],[165,750],[885,720],[65,1130],[965,1090],[195,1370],[875,1350]];
    sparkles.forEach(([sx, sy]) => star4(ctx, sx, sy, 3 + rng() * 3 | 0, C.NAVY_S, 1));
    const stars = [[935,148],[115,190],[950,480],[80,880],[960,850],[90,1280],[925,1260]];
    stars.forEach(([sx, sy]) => star5(ctx, sx, sy, 3 + rng() * 2 | 0, C.NAVY_S));
    for (let i = 0; i < 20; i++) {
      const dx = 35 + rng() * (w - 70), dy = 35 + rng() * (h - 70);
      ctx.fillStyle = C.NAVY_S;
      ctx.beginPath(); ctx.arc(dx, dy, 1, 0, Math.PI * 2); ctx.fill();
    }
  }

  function calcHeight(cardCount) {
    if (cardCount <= 3) return 1600;
    if (cardCount <= 5) return 1850;
    if (cardCount <= 7) return 2200;
    return 1600 + cardCount * 100;
  }

  function cardBlockH(cardCount) {
    if (cardCount <= 3) return 195;
    if (cardCount <= 5) return 155;
    if (cardCount <= 7) return 125;
    return 100;
  }

  const DOMAIN_LABELS = { love: '感情', career: '事业', finance: '财务', health: '健康', study: '学业', general: '综合' };

  async function generate(reading, opts = {}) {
    const { spread, question, cards, domain, summary } = reading;
    const decisionLabels = opts.decisionLabels || null;
    const dateStr = opts.date || new Date().toLocaleDateString('zh-CN').replace(/\//g, '.');
    const cardCount = cards.length;
    const H = calcHeight(cardCount);
    const CH = cardBlockH(cardCount);
    const CG = cardCount <= 3 ? 16 : 12;

    await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2000))]);

    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background gradient
    for (let y = 0; y < H; y++) {
      const t = y / H;
      const r = Math.round(252 * (1 - t) + 245 * t);
      const g = Math.round(249 * (1 - t) + 250 * t);
      const b = Math.round(244 * (1 - t) + 248 * t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, W, 1);
    }

    drawBlobs(ctx, W, H);
    drawDecorations(ctx, W, H);

    // === HEADER ===
    let y = 48;
    ctCenter(ctx, '又来算了', W / 2, y, `bold 40px ${FONT_CN}`, C.NAVY);
    y = 96;
    ctCenter(ctx, '好的信，坏的不信', W / 2, y, `18px ${FONT_CN}`, C.NAVY_D);
    y = 136;
    dashedH(ctx, y, 100, W - 100, 10, 7, C.NAVY_S);

    // Spread + date
    y = 164;
    const spreadLabel = `${spread.name}${spread.name_en ? ' · ' + spread.name_en : ''}`;
    const slW = measureW(ctx, spreadLabel, `bold 20px ${FONT_CN}`) + 36;
    const slX = (W - slW) / 2;
    pill(ctx, slX, y, slX + slW, y + 42, ACCENT_P[0], ACCENT[0]);
    ctCenter(ctx, spreadLabel, W / 2, y + 8, `bold 20px ${FONT_CN}`, ACCENT_D[0]);
    ctx.font = `16px ${FONT_CN}`; ctx.fillStyle = C.NAVY_D;
    ctx.textAlign = 'right'; ctx.textBaseline = 'top';
    ctx.fillText(dateStr, W - 88, y + 10);

    // Question
    y = 228;
    const qH = 105;
    rr(ctx, 80, y, W - 80, y + qH, 16, '#FFFFFF', C.NAVY_S, 1);
    pill(ctx, 104, y + 14, 142, y + 44, C.CORAL_P, C.CORAL);
    ctCenter(ctx, 'Q', 123, y + 17, `bold 18px ${FONT_EN}`, C.CORAL_D);
    const displayQ = question === '（未输入问题）' ? '' : question;
    if (displayQ) {
      const qFont = `bold 26px ${FONT_CN}`;
      const qW = measureW(ctx, displayQ, qFont);
      if (qW > W - 280) {
        const truncated = displayQ.slice(0, 22) + '...';
        ct(ctx, truncated, 160, y + 18, qFont, C.NAVY);
      } else {
        ct(ctx, displayQ, 160, y + 18, qFont, C.NAVY);
      }
    }
    const domainLabel = DOMAIN_LABELS[domain] || '综合';
    const dLabelW = measureW(ctx, domainLabel + '指引', `16px ${FONT_CN}`) + 20;
    pill(ctx, 160, y + 62, 160 + dLabelW, y + 88, ACCENT_P[2], ACCENT[2]);
    ct(ctx, domainLabel + '指引', 170, y + 68, `16px ${FONT_CN}`, ACCENT_D[2]);

    // Divider
    y = y + qH + 18;
    dashedH(ctx, y, 80, W - 80, 8, 5, C.NAVY_S);

    // === CARDS ===
    y += 26;
    const cardStartY = y;

    cards.forEach((card, i) => {
      const ai = i % 3;
      const posName = decisionLabels
        ? card.position.name.replace(/选择A/g, decisionLabels.a).replace(/选择B/g, decisionLabels.b)
        : card.position.name;
      const posDesc = decisionLabels
        ? card.position.description.replace(/选择A/g, decisionLabels.a).replace(/选择B/g, decisionLabels.b)
        : card.position.description;
      const orient = card.is_reversed ? '逆位' : '正位';
      const keywords = card.is_reversed ? card.reversed_keywords : card.upright_keywords;
      const advice = card.contextual_advice || '';

      rr(ctx, 80, y, W - 80, y + CH, 16, '#FFFFFF', ACCENT[ai], 2);

      // Position pill
      const posFont = `bold 17px ${FONT_CN}`;
      const posW = measureW(ctx, posName, posFont) + 28;
      pill(ctx, 108, y + 16, 108 + posW, y + 46, ACCENT_P[ai], ACCENT[ai]);
      ct(ctx, posName, 122, y + 20, posFont, ACCENT_D[ai]);

      // Position desc
      if (CH >= 150) {
        ct(ctx, posDesc, 112 + posW + 10, y + 22, `14px ${FONT_CN}`, C.NAVY_D);
      }

      // Illustration (skip for 10-card)
      const showIllus = cardCount <= 7;
      if (showIllus) {
        const ir = cardCount <= 3 ? 46 : 32;
        const iy = y + (CH >= 150 ? 120 : 80);
        const rng = srand(i * 7 + 13);
        illust(ctx, 172, iy, ir, card.name_zh, ACCENT[ai], rng);
      }

      // Card name
      const nameX = showIllus ? 250 : 180;
      const nameFont = `bold ${CH >= 150 ? 30 : CH >= 120 ? 24 : 20}px ${FONT_CN}`;
      ct(ctx, card.name_zh, nameX, y + 58, nameFont, C.NAVY);

      // English name
      ct(ctx, card.name_en, nameX + 2, y + 94, `${CH >= 150 ? 13 : 11}px ${FONT_EN}`, C.NAVY_D);

      // Orientation pill
      const nw = measureW(ctx, card.name_zh, nameFont);
      const ox = nameX + nw + 16;
      const oW = measureW(ctx, orient, `15px ${FONT_CN}`) + 20;
      pill(ctx, ox, y + 66, ox + oW, y + 92, ACCENT_P[ai], ACCENT[ai]);
      ct(ctx, orient, ox + 10, y + 72, `15px ${FONT_CN}`, ACCENT_D[ai]);

      // Keywords
      const kwX0 = nameX + 2;
      let kx = kwX0, ky = y + 120;
      const kwFont = `14px ${FONT_CN}`;
      keywords.forEach((kw, j) => {
        const kwPxW = measureW(ctx, kw, kwFont) + 18;
        if (kx + kwPxW > W - 110) { kx = kwX0; ky += 34; }
        pill(ctx, kx, ky, kx + kwPxW, ky + 28, ACCENT_L[ai]);
        ct(ctx, kw, kx + 9, ky + 4, kwFont, ACCENT_D[ai]);
        kx += kwPxW + 8;
      });

      // Brief advice (1-2 lines)
      if (CH >= 150 && advice) {
        const maxAdvW = W - 80 - nameX - 10;
        const advFont = `14px ${FONT_CN}`;
        let ay = y + 158;
        if (ky + 34 > ay) ay = ky + 34;
        let advLine = '', advY = ay;
        ctx.font = advFont; ctx.fillStyle = C.NAVY_L;
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        let charCount = 0;
        for (let ci = 0; ci < advice.length && charCount < 50; ci++) {
          const ch = advice[ci];
          const test = advLine + ch;
          if (ctx.measureText(test).width > maxAdvW && advLine.length > 0) {
            ctx.fillText(advLine, nameX + 2, advY);
            advLine = ch; advY += 22; charCount += advLine.length;
          } else {
            advLine = test; charCount = advLine.length;
          }
        }
        if (advLine && charCount < 50) ctx.fillText(advLine, nameX + 2, advY);
      }

      y += CH + CG;
    });

    // === SUMMARY ===
    const yS = y + 14;
    const summaryH = 260;
    dashedRect(ctx, 68, yS, W - 68, yS + summaryH, 16, 10, 6, C.NAVY_S);

    pill(ctx, 108, yS + 22, 236, yS + 54, C.BUTTER_P, C.BUTTER);
    ctCenter(ctx, '给你的话', 172, yS + 27, `bold 18px ${FONT_CN}`, C.BUTTER_D);

    const maxSumW = W - 68 - 80;
    const sumFont = `19px ${FONT_CN}`;
    let sy = yS + 72;
    let sumLine = '';
    ctx.font = sumFont; ctx.fillStyle = C.NAVY;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    for (let ci = 0; ci < summary.length; ci++) {
      const ch = summary[ci];
      if (ch === '\n') {
        ctx.fillText(sumLine, 118, sy); sumLine = ''; sy += 36; continue;
      }
      const test = sumLine + ch;
      if (ctx.measureText(test).width > maxSumW && sumLine.length > 0) {
        ctx.fillText(sumLine, 118, sy); sumLine = ch; sy += 36;
      } else {
        sumLine = test;
      }
    }
    if (sumLine) ctx.fillText(sumLine, 118, sy);

    // === FOOTER ===
    const yF = H - 78;
    dashedH(ctx, yF - 8, 80, W - 80, 5, 5, C.NAVY_S);
    ctCenter(ctx, '又来算了  ·  好的信，坏的不信', W / 2, yF + 8, `15px ${FONT_CN}`, C.NAVY_D);
    ctCenter(ctx, '长按保存 · 分享给朋友', W / 2, yF + 34, `13px ${FONT_CN}`, C.NAVY_M);
    star5(ctx, 72, yF + 16, 3, C.NAVY_S);
    star4(ctx, W - 72, yF + 16, 4, C.NAVY_S, 1);

    // Paper grain
    applyPaperGrain(ctx, W, H);

    return new Promise(resolve => {
      canvas.toBlob(blob => resolve(blob), 'image/png');
    });
  }

  return { generate };
})();
