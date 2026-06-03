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
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); }
  }

  function pill(ctx, x, y, w, h, fill, stroke, lw) {
    rr(ctx, x, y, w, h, h / 2, fill, stroke, lw);
  }

  function ct(ctx, text, x, y, font, color) {
    ctx.font = font; ctx.fillStyle = color;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
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
    ctx.strokeStyle = color; ctx.lineWidth = lw || 1;
    ctx.beginPath();
    ctx.moveTo(cx - sz, cy); ctx.lineTo(cx + sz, cy);
    ctx.moveTo(cx, cy - sz); ctx.lineTo(cx, cy + sz);
    ctx.stroke();
  }

  function star5(ctx, cx, cy, sz, color) {
    ctx.fillStyle = color; ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * 2 * i / 10 - Math.PI / 2;
      const r = i % 2 === 0 ? sz : sz * 0.42;
      const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill();
  }

  function wobblyCircle(ctx, cx, cy, r, color, lw, rng) {
    ctx.strokeStyle = color; ctx.lineWidth = lw || 2; ctx.beginPath();
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
    const s5 = (dx, dy, sz, c) => star5(ctx, cx + dx, cy + dy, sz, c);
    const s4 = (dx, dy, sz, c) => star4(ctx, cx + dx, cy + dy, sz, c, 1);
    const line = (x1, y1, x2, y2, c, w) => {
      ctx.strokeStyle = c; ctx.lineWidth = w || 2;
      ctx.beginPath(); ctx.moveTo(cx + x1, cy + y1); ctx.lineTo(cx + x2, cy + y2); ctx.stroke();
    };
    const arc = (rx, ry, rw, rh, sa, ea, c, w) => {
      ctx.strokeStyle = c; ctx.lineWidth = w || 2;
      ctx.beginPath(); ctx.ellipse(cx + rx, cy + ry, rw, rh, 0, sa, ea); ctx.stroke();
    };

    if (name.includes('愚')) { s5(0, -r*0.33, r*0.22, C.BUTTER); line(0, -r*0.12, 0, r*0.33, C.SAGE_D, 2); }
    else if (name.includes('魔术')) { s5(0, 0, r*0.32, accent); s4(-r*0.42, -r*0.42, r*0.14, accent); }
    else if (name.includes('女祭')) { arc(0, 0, r*0.4, r*0.4, 3.46, 5.88, C.LAVEN, 3); s5(-r*0.15, -r*0.2, r*0.08, C.LAVEN_L); }
    else if (name.includes('皇')) { s5(0, 0, r*0.32, accent); line(-r*0.33, r*0.33, r*0.33, r*0.33, accent, 2); line(0, -r*0.33, 0, r*0.25, accent, 2); }
    else if (name.includes('恋')) { s5(-r*0.2, 0, r*0.14, C.CORAL); s5(r*0.2, 0, r*0.14, C.CORAL); arc(0, r*0.05, r*0.28, r*0.22, 0, Math.PI, C.CORAL, 1); }
    else if (name.includes('星')) { s5(0, 0, r*0.35, C.BUTTER); for(let i=0;i<8;i++){const a=Math.PI/4*i;line(r*0.2*Math.cos(a),r*0.2*Math.sin(a),r*0.45*Math.cos(a),r*0.45*Math.sin(a),C.BUTTER_D,1);} }
    else if (name.includes('月')) { arc(r*0.08, 0, r*0.38, r*0.38, 3.46, 5.88, C.LAVEN, 3); }
    else if (name.includes('太阳')) { s5(0, 0, r*0.32, C.BUTTER); for(let i=0;i<8;i++){const a=Math.PI/4*i;line(r*0.22*Math.cos(a),r*0.22*Math.sin(a),r*0.45*Math.cos(a),r*0.45*Math.sin(a),C.BUTTER_D,1);} }
    else if (name.includes('世界')) { wobblyCircle(ctx, cx, cy, r*0.35, accent, 2, rng); s5(0, 0, r*0.15, C.BUTTER); }
    else if (name.includes('杯')) { arc(0, -r*0.1, r*0.25, r*0.2, 0, Math.PI, C.CORAL, 2); line(-r*0.25, -r*0.1, r*0.25, -r*0.1, C.CORAL, 2); line(0, r*0.1, 0, r*0.38, C.CORAL, 2); }
    else if (name.includes('杖')) { line(0, -r*0.4, 0, r*0.4, C.SAGE_D, 3); s5(0, -r*0.4, r*0.15, C.CORAL); }
    else if (name.includes('剑')) { line(0, -r*0.4, 0, r*0.25, C.NAVY_L, 2); line(-r*0.28, -r*0.12, r*0.28, -r*0.12, C.NAVY_L, 2); }
    else if (name.includes('币')) { wobblyCircle(ctx, cx, cy, r*0.3, C.BUTTER, 2, srand(14)); wobblyCircle(ctx, cx, cy, r*0.12, C.BUTTER_D, 1, srand(99)); }
    else { s5(0, 0, r*0.28, accent); }
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
    ctx.font = font; ctx.fillStyle = color;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    let line = '', cy = y;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '\n') { ctx.fillText(line, x, cy); line = ''; cy += lineHeight; continue; }
      const test = line + ch;
      if (ctx.measureText(test).width > maxWidth && line.length > 0) {
        ctx.fillText(line, x, cy); line = ch; cy += lineHeight;
      } else { line = test; }
    }
    if (line) ctx.fillText(line, x, cy);
    return cy + lineHeight;
  }

  function applyPaperGrain(ctx, w, h) {
    const id = ctx.getImageData(0, 0, w, h);
    const d = id.data; const rng = srand(99);
    for (let i = 0; i < 4000; i++) {
      const px = (rng() * w) | 0, py = (rng() * h) | 0;
      const idx = (py * w + px) * 4;
      const a = [6, 8, 10][(rng() * 3) | 0];
      d[idx] = Math.max(0, d[idx] - a);
      d[idx+1] = Math.max(0, d[idx+1] - a);
      d[idx+2] = Math.max(0, d[idx+2] - a);
    }
    ctx.putImageData(id, 0, 0);
  }

  function drawBlobs(ctx, w, h) {
    ctx.save();
    if (typeof ctx.filter !== 'undefined') ctx.filter = 'blur(90px)';
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = '#FCDED6'; ctx.beginPath(); ctx.ellipse(w-175, 130, 230, 160, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#DAF2DA'; ctx.beginPath(); ctx.ellipse(145, h-155, 195, 185, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#E4DEF8'; ctx.beginPath(); ctx.ellipse(125, 640, 155, 160, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  function drawDecorations(ctx, w, h) {
    const rng = srand(42);
    [[130,88],[920,75],[75,395],[955,365],[165,750],[885,720],[65,1130],[965,1090]].forEach(([sx,sy]) => star4(ctx, sx, sy, 3+rng()*3|0, C.NAVY_S, 1));
    [[935,148],[115,190],[950,480],[80,880],[960,850],[90,1280]].forEach(([sx,sy]) => star5(ctx, sx, sy, 3+rng()*2|0, C.NAVY_S));
    for (let i=0;i<15;i++){const dx=35+rng()*(w-70),dy=35+rng()*(h-70);ctx.fillStyle=C.NAVY_S;ctx.beginPath();ctx.arc(dx,dy,1,0,Math.PI*2);ctx.fill();}
  }

  function calcHeight(cardCount, summaryLines) {
    const cardSection = cardCount <= 3 ? cardCount * 200 : cardCount <= 5 ? cardCount * 160 : cardCount * 130;
    const summarySection = Math.max(180, summaryLines * 38 + 100);
    return 420 + cardSection + summarySection + 120;
  }

  function cardBlockH(cardCount) {
    if (cardCount <= 3) return 180;
    if (cardCount <= 5) return 145;
    if (cardCount <= 7) return 115;
    return 90;
  }

  const DOMAIN_LABELS = { love: '感情', career: '事业', finance: '财务', health: '健康', study: '学业', general: '综合' };

  function countSummaryLines(text, maxW, font) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    let lines = 1, line = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '\n') { lines++; line = ''; continue; }
      if (ctx.measureText(line + ch).width > maxW && line.length > 0) { lines++; line = ch; }
      else line += ch;
    }
    return lines;
  }

  async function generate(reading, opts = {}) {
    const { spread, question, cards, domain, summary } = reading;
    const decisionLabels = opts.decisionLabels || null;
    const dateStr = opts.date || new Date().toLocaleDateString('zh-CN').replace(/\//g, '.');
    const cardCount = cards.length;
    const hasQuestion = question && question !== '（未输入问题）';
    const domainLabel = DOMAIN_LABELS[domain] || '综合';

    const sumFont = `19px ${FONT_CN}`;
    const maxSumW = W - 68 - 80;
    const sumLines = countSummaryLines(summary, maxSumW, sumFont);
    const H = calcHeight(cardCount, sumLines);
    const CH = cardBlockH(cardCount);
    const CG = cardCount <= 3 ? 14 : 10;

    await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2000))]);

    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background
    for (let y = 0; y < H; y++) {
      const t = y / H;
      ctx.fillStyle = `rgb(${Math.round(252*(1-t)+245*t)},${Math.round(249*(1-t)+250*t)},${Math.round(244*(1-t)+248*t)})`;
      ctx.fillRect(0, y, W, 1);
    }

    drawBlobs(ctx, W, H);
    drawDecorations(ctx, W, H);

    // === HEADER ===
    let y = 52;
    ctCenter(ctx, '又来算了', W / 2, y, `bold 42px ${FONT_CN}`, C.NAVY);
    y = 104;
    ctCenter(ctx, '好的信，坏的不信', W / 2, y, `17px ${FONT_CN}`, C.NAVY_D);
    y = 142;
    dashedH(ctx, y, 100, W - 100, 10, 7, C.NAVY_S);

    // Spread pill + date
    y = 168;
    const spreadLabel = `${spread.name}${spread.name_en ? ' · ' + spread.name_en : ''}`;
    const slFont = `bold 20px ${FONT_CN}`;
    const slW = measureW(ctx, spreadLabel, slFont) + 40;
    pill(ctx, (W - slW) / 2, y, (W + slW) / 2, y + 42, ACCENT_P[0], ACCENT[0]);
    ctCenter(ctx, spreadLabel, W / 2, y + 8, slFont, ACCENT_D[0]);
    ctx.font = `15px ${FONT_CN}`; ctx.fillStyle = C.NAVY_D;
    ctx.textAlign = 'right'; ctx.textBaseline = 'top';
    ctx.fillText(dateStr, W - 90, y + 12);

    // Question area (only if has question)
    y = 228;
    if (hasQuestion) {
      const qH = 90;
      rr(ctx, 80, y, W - 80, y + qH, 16, '#FFFFFF', C.NAVY_S, 1);
      pill(ctx, 104, y + 14, 142, y + 42, C.CORAL_P, C.CORAL);
      ctCenter(ctx, 'Q', 123, y + 17, `bold 18px ${FONT_EN}`, C.CORAL_D);
      const qFont = `bold 25px ${FONT_CN}`;
      const qText = question.length > 24 ? question.slice(0, 24) + '...' : question;
      ct(ctx, qText, 156, y + 18, qFont, C.NAVY);
      const dLabelW = measureW(ctx, domainLabel + '指引', `15px ${FONT_CN}`) + 20;
      pill(ctx, 156, y + 56, 156 + dLabelW, y + 80, ACCENT_P[2], ACCENT[2]);
      ct(ctx, domainLabel + '指引', 166, y + 60, `15px ${FONT_CN}`, ACCENT_D[2]);
      y += qH + 16;
    } else {
      // Just domain tag
      const dLabel = domainLabel + '指引';
      const dLW = measureW(ctx, dLabel, `bold 17px ${FONT_CN}`) + 28;
      pill(ctx, (W - dLW) / 2, y + 10, (W + dLW) / 2, y + 42, ACCENT_P[2], ACCENT[2]);
      ctCenter(ctx, dLabel, W / 2, y + 16, `bold 17px ${FONT_CN}`, ACCENT_D[2]);
      y += 60;
    }

    // Divider
    dashedH(ctx, y, 80, W - 80, 8, 5, C.NAVY_S);
    y += 24;

    // === CARDS ===
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

      rr(ctx, 80, y, W - 80, y + CH, 14, '#FFFFFF', ACCENT[ai], 2);

      // Position pill
      const posFont = `bold 16px ${FONT_CN}`;
      const posW = measureW(ctx, posName, posFont) + 26;
      pill(ctx, 108, y + 14, 108 + posW, y + 42, ACCENT_P[ai], ACCENT[ai]);
      ct(ctx, posName, 121, y + 18, posFont, ACCENT_D[ai]);

      // Position desc (only if enough space)
      if (CH >= 130 && posDesc.length <= 14) {
        ct(ctx, posDesc, 112 + posW + 10, y + 20, `13px ${FONT_CN}`, C.NAVY_D);
      }

      // Illustration
      const showIllus = cardCount <= 5;
      if (showIllus) {
        const ir = cardCount <= 3 ? 42 : 30;
        const iy = y + CH / 2 + (CH >= 130 ? 14 : 0);
        const rng = srand(i * 7 + 13);
        illust(ctx, 172, iy, ir, card.name_zh, ACCENT[ai], rng);
      }

      // Card name
      const nameX = showIllus ? 248 : 120;
      const nameSize = CH >= 130 ? 28 : CH >= 100 ? 22 : 18;
      const nameFont = `bold ${nameSize}px ${FONT_CN}`;
      ct(ctx, card.name_zh, nameX, y + 14, nameFont, C.NAVY);

      // Orientation pill — beside card name
      const nw = measureW(ctx, card.name_zh, nameFont);
      const ox = nameX + nw + 14;
      const oW = measureW(ctx, orient, `14px ${FONT_CN}`) + 18;
      if (ox + oW < W - 100) {
        pill(ctx, ox, y + 20, ox + oW, y + 44, ACCENT_P[ai], ACCENT[ai]);
        ct(ctx, orient, ox + 9, y + 24, `14px ${FONT_CN}`, ACCENT_D[ai]);
      }

      // English name
      ct(ctx, card.name_en, nameX + 2, y + 48, `${CH >= 130 ? 12 : 10}px ${FONT_EN}`, C.NAVY_D);

      // Keywords
      let kx = nameX, ky = y + 70;
      const kwFont = `13px ${FONT_CN}`;
      keywords.forEach(kw => {
        const kwW = measureW(ctx, kw, kwFont) + 16;
        if (kx + kwW > W - 100) { kx = nameX; ky += 30; }
        pill(ctx, kx, ky, kx + kwW, ky + 26, ACCENT_L[ai]);
        ct(ctx, kw, kx + 8, ky + 4, kwFont, ACCENT_D[ai]);
        kx += kwW + 6;
      });

      // Brief advice
      if (CH >= 130 && advice) {
        let ay = ky + 34;
        if (ay > y + CH - 24) ay = y + CH - 24;
        ct(ctx, advice.length > 40 ? advice.slice(0, 40) + '...' : advice, nameX, ay, `12px ${FONT_CN}`, C.NAVY_D);
      }

      y += CH + CG;
    });

    // === SUMMARY ===
    y += 14;
    const sumTop = y;
    const sumBot = y + 72 + sumLines * 36 + 30;
    dashedRect(ctx, 68, sumTop, W - 68, sumBot, 14, 10, 6, C.NAVY_S);

    pill(ctx, 108, sumTop + 20, 232, sumTop + 50, C.BUTTER_P, C.BUTTER);
    ctCenter(ctx, '给你的话', 170, sumTop + 24, `bold 17px ${FONT_CN}`, C.BUTTER_D);

    wrapText(ctx, summary, 118, sumTop + 64, maxSumW, 36, sumFont, C.NAVY);

    y = sumBot + 20;

    // === FOOTER ===
    const footerY = Math.max(y + 10, H - 72);
    dashedH(ctx, footerY, 80, W - 80, 5, 5, C.NAVY_S);
    ctCenter(ctx, '又来算了  ·  好的信，坏的不信', W / 2, footerY + 8, `14px ${FONT_CN}`, C.NAVY_D);
    ctCenter(ctx, '长按保存 · 分享给朋友', W / 2, footerY + 32, `12px ${FONT_CN}`, C.NAVY_M);

    applyPaperGrain(ctx, W, H);

    return new Promise(resolve => {
      canvas.toBlob(blob => resolve(blob), 'image/png');
    });
  }

  return { generate };
})();
