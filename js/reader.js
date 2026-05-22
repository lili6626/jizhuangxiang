class TarotReader {
  constructor() {
    this.deck = [];
    this.drawnCards = [];
    this.currentSpread = null;
    this.question = "";
    this.useReversals = true;
    this.resetDeck();
  }

  resetDeck() {
    this.deck = [...TAROT_CARDS];
    this.drawnCards = [];
    this.shuffleDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  setSpread(spread) {
    this.currentSpread = spread;
    this.resetDeck();
  }

  setQuestion(question) {
    this.question = question;
  }

  drawCard() {
    if (this.deck.length === 0) return null;
    if (this.drawnCards.length >= this.currentSpread.card_count) return null;

    const cardIndex = Math.floor(Math.random() * this.deck.length);
    const card = { ...this.deck[cardIndex] };
    card.is_reversed = this.useReversals && Math.random() < 0.5;
    card.position = this.currentSpread.positions[this.drawnCards.length];

    this.deck.splice(cardIndex, 1);
    this.drawnCards.push(card);

    return card;
  }

  setDrawnCards(selectedSlots, spread) {
    this.currentSpread = spread;
    this.drawnCards = selectedSlots.map((slot, i) => ({
      ...slot.card,
      is_reversed: slot.is_reversed,
      position: spread.positions[i]
    }));
  }

  isComplete() {
    return this.currentSpread && this.drawnCards.length >= this.currentSpread.card_count;
  }

  getDrawnCount() {
    return this.drawnCards.length;
  }

  getRequiredCount() {
    return this.currentSpread ? this.currentSpread.card_count : 0;
  }

  detectDomain() {
    const q = this.question;
    const domains = {
      love: ["爱", "喜欢", "恋", "感情", "分手", "复合", "暧昧", "暗恋", "男朋友", "女朋友", "老公", "老婆", "婚姻", "相亲", "脱单", "桃花", "表白", "在一起", "他爱", "她爱", "我们", "关系", "前任", "对象", "伴侣", "夫妻"],
      career: ["工作", "事业", "职业", "升职", "跳槽", "创业", "面试", "老板", "同事", "领导", "薪资", "辞职", "就业", "转行", "项目", "合作", "人力", "采购", "职场", "上班", "加班", "裁员", "offer"],
      finance: ["钱", "财", "投资", "理财", "赚钱", "亏", "收益", "收入", "存款", "买房", "还贷", "经济"],
      health: ["健康", "身体", "病", "手术", "康复", "失眠", "焦虑", "抑郁", "心理"],
      study: ["考试", "学习", "考研", "留学", "成绩", "学业", "论文", "毕业", "入学"],
    };

    for (const [domain, keywords] of Object.entries(domains)) {
      if (keywords.some(kw => q.includes(kw))) return domain;
    }
    return "general";
  }

  getContextualAdvice(card, position, domain) {
    const pos = position.name;
    const isRev = card.is_reversed;
    const name = card.name_zh;
    const keywords = isRev ? card.reversed_keywords : card.upright_keywords;
    const kwStr = keywords.join("、");

    const posAdvice = this.positionAdvice(card, position, domain);
    return posAdvice;
  }

  positionAdvice(card, position, domain) {
    const isRev = card.is_reversed;
    const rev = isRev ? "逆位" : "正位";
    const name = card.name_zh;
    const pos = position.name;
    const kw = (isRev ? card.reversed_keywords : card.upright_keywords).join("、");

    const domainTemplates = {
      love: {
        "过去": {
          upright: `${name}在过去的位置告诉我们，你的感情经历中${kw}的课题一直伴随你。这段过往塑造了你现在的情感模式和期待，理解它才能放下它。`,
          reversed: `${name}逆位在过去的位置暗示，你在感情中曾经经历过${kw}的挑战。也许你还没有完全消化这段过去，它仍在潜移默化地影响你现在的恋爱方式。`
        },
        "现在": {
          upright: `当下的感情状态中，${name}${rev}正在发挥作用——${kw}。如果你是单身，这暗示你正处于值得打开心扉的时机；如果在关系中，这意味着你们之间有着真实的情感流动。`,
          reversed: `当下的感情中，${name}逆位提醒你注意${kw}的问题。也许你在逃避真实的感受，或关系中存在未说出口的委屈。现在是需要坦诚面对内心的时刻。`
        },
        "未来": {
          upright: `未来感情的方向上，${name}${rev}带来了${kw}的讯息。如果保持现在的节奏，感情会朝着更加${kw}的方向发展。记住，爱需要勇气也需要耐心。`,
          reversed: `未来感情可能出现${kw}的状况。这并不意味着坏事，而是提醒你要更加留意关系中的隐患，主动沟通比被动等待更能扭转局面。`
        },
        "你": {
          upright: `在关系中，你目前的状态是${kw}。${name}说明你有着真诚而温暖的能量，对方也能感受到你的用心。保持真实的自己就是最好的状态。`,
          reversed: `在关系中，你目前的状态受到${kw}的影响。也许你在压抑自己的需求来迎合对方，或者害怕展现真实的一面。爱一个人之前，先学会爱自己。`
        },
        "对方": {
          upright: `对方在这段关系中的状态是${kw}。${name}说明TA对你的感情是真实的，只是表达方式可能和你期待的不同。试着理解对方的爱之语。`,
          reversed: `对方的状态受到${kw}的影响，可能TA自己也在关系中感到困惑或不确定。给彼此一些空间和时间，不要急于要答案。`
        },
        "你的感受": {
          upright: `你内心对这段关系的真实感受是${kw}。${name}告诉你，你的直觉是准的——相信你感受到的，那正是关系的真相。`,
          reversed: `你内心深处其实被${kw}所困扰。也许你不敢面对自己的真实感受，但只有承认它，你才能做出对的选择。`
        },
        "对方的感受": {
          upright: `对方内心的真实感受是${kw}。${name}暗示TA比你表面上看到的更在乎你，也许只是不知道如何表达。`,
          reversed: `对方内心可能正在经历${kw}的挣扎。这不代表TA不在乎，而是TA自己也有需要面对的课题。`
        },
        "关系结果": {
          upright: `这段关系的走向是${kw}。${name}带来了积极的信号——只要双方都愿意付出，这段关系是有未来的。`,
          reversed: `关系的走向可能出现${kw}的状况。这是一个提醒，不是宣判。如果你在乎这段关系，现在就该主动做出改变了。`
        },
        _default: {
          upright: `${name}${rev}在这个位置，对感情意味着${kw}。顺应这份能量，用真诚和耐心对待感情，好的结果自然会来。`,
          reversed: `${name}${rev}提醒你，感情方面要注意${kw}的课题。不要回避问题，坦诚面对才能找到出口。`
        }
      },
      career: {
        "过去": {
          upright: `${name}在过去的位置说明，你的职业发展中${kw}的经历是关键转折。这段经历给了你重要的能力和信心，也为你现在的工作打下了基础。`,
          reversed: `过去的职业经历中，${name}逆位暗示你曾遭遇${kw}的困境。也许那段经历让你动摇过，但它也让你更清楚自己想要什么。`
        },
        "现在": {
          upright: `当前的工作状态中，${name}${rev}正带来${kw}的能量。这是一个适合发挥实力、展现价值的时期，好好把握眼前的机会。`,
          reversed: `当前工作中，${name}逆位提醒你注意${kw}的问题。也许你感到方向不明确或能力受限，但先理清重点再行动比盲目努力更有效。`
        },
        "未来": {
          upright: `事业发展的方向上，${name}${rev}带来${kw}的信号。继续保持现在的节奏和专注，成果会比你想象的来得更快。`,
          reversed: `未来事业可能出现${kw}的状况。与其焦虑，不如提前做好准备——多学一项技能，多留一个退路，风雨来时你才能从容应对。`
        },
        _default: {
          upright: `${name}${rev}在工作方面意味着${kw}。脚踏实地，保持专注，你的努力终将被看见。`,
          reversed: `${name}${rev}提醒你在事业上注意${kw}。现在是反思和调整策略的时机，而不是盲目加速的时候。`
        }
      },
      finance: {
        _default: {
          upright: `${name}${rev}在财务方面带来${kw}的信号。这是一个适合稳健理财的时期，量入为出，积少成多。`,
          reversed: `${name}${rev}提醒你注意${kw}的财务风险。避免冲动消费和高风险投资，稳健为上。`
        }
      },
      health: {
        _default: {
          upright: `${name}${rev}在健康方面带来${kw}的讯息。身体在给你积极的反馈，保持良好的生活习惯，身心都会越来越好。`,
          reversed: `${name}${rev}提醒你关注${kw}的健康信号。身体已经在提醒你了，不要忽视这些小征兆，及时调整作息和心态。`
        }
      },
      study: {
        _default: {
          upright: `${name}${rev}在学业方面意味着${kw}。你的学习状态不错，保持专注和节奏，目标是可以达成的。`,
          reversed: `${name}${rev}提醒你注意${kw}的学习问题。也许你需要调整方法，或者克服内心的拖延和焦虑，找对方向比拼时间更重要。`
        }
      },
      general: {
        "过去": {
          upright: `${name}在过去的位置，说明${kw}的经历深深影响了你现在的处境。理解过去，是为了更好地前行。`,
          reversed: `${name}逆位在过去，暗示${kw}的课题还没有完全被消化。那些未完成的功课，正在以另一种方式回到你的生活中。`
        },
        "现在": {
          upright: `当前的状况中，${name}${rev}带来${kw}的能量。这是一个值得把握的时机，相信自己的判断，大胆行动。`,
          reversed: `当下${name}逆位暗示你正面对${kw}的挑战。先停下来理清思路，比起匆忙行动，找到真正的方向更重要。`
        },
        "未来": {
          upright: `未来的方向上，${name}${rev}带来了${kw}的指引。保持现在的态度和努力，你会看到隧道尽头的光。`,
          reversed: `未来可能出现${kw}的状况。但记住，塔罗提示的是趋势而非定局——提前准备，你完全有能力改变走向。`
        },
        _default: {
          upright: `${name}${rev}在这个位置，意味着${kw}。顺应这份能量的指引，你会找到属于自己的答案。`,
          reversed: `${name}${rev}提醒你注意${kw}的课题。不要回避，这正是你需要面对和成长的领域。`
        }
      }
    };

    const domainData = domainTemplates[domain] || domainTemplates.general;
    const posData = domainData[pos] || domainData._default || domainData.general._default;
    return isRev ? posData.reversed : posData.upright;
  }

  getReading() {
    if (!this.isComplete()) return null;
    const domain = this.detectDomain();

    const cardsWithContext = this.drawnCards.map(card => ({
      ...card,
      contextual_advice: this.getContextualAdvice(card, card.position, domain)
    }));

    return {
      spread: this.currentSpread,
      question: this.question,
      cards: cardsWithContext,
      domain: domain,
      summary: this.generateSummary(domain)
    };
  }

  generateSummary(domain) {
    const majorCount = this.drawnCards.filter(c => c.arcana === "major").length;
    const reversedCount = this.drawnCards.filter(c => c.is_reversed).length;
    const elements = this.drawnCards.reduce((acc, c) => {
      acc[c.element] = (acc[c.element] || 0) + 1;
      return acc;
    }, {});

    const domainLabels = { love: "感情", career: "事业", finance: "财务", health: "健康", study: "学业", general: "生活" };
    const label = domainLabels[domain] || "生活";

    let summary = `针对你关于"${this.question.slice(0, 20)}${this.question.length > 20 ? '...' : ''}"的${label}问题，`;

    if (majorCount > this.drawnCards.length / 2) {
      summary += `大牌居多，说明这不是一个简单的日常抉择，而是涉及你人生深层课题的重要节点。请认真对待这次提示。`;
    } else if (majorCount === 0) {
      summary += `全是小牌，说明当前的情况更多是日常层面的具体事务，用务实的心态一步步推进就好。`;
    }

    if (reversedCount > this.drawnCards.length / 2) {
      summary += `逆位偏多，说明很多能量处于内耗或受阻状态。建议先从调整自身状态开始——运动、冥想、跟信任的人聊聊，把内在的结解开，外在的事才会顺畅。`;
    } else if (reversedCount === 0) {
      summary += `所有牌正位，整体能量是顺畅的。顺势而为就好，不用过度焦虑。`;
    }

    const maxElement = Object.entries(elements).sort((a, b) => b[1] - a[1])[0];
    const elementAdvice = {
      fire: { love: "多主动表达感情，别让热情闷在心里。", career: "现在是行动的时机，别犹豫不前。", finance: "大胆但理性的决策会带来回报。", health: "运动和活力是你最好的药。", study: "集中火力攻克重点，效率最高。", general: "行动和激情是当前的关键词。" },
      water: { love: "倾听内心的声音，你的直觉比理性更懂这段感情。", career: "人际关系的和谐比业绩数字更重要。", finance: "别被情绪左右消费决策。", health: "关注情绪健康，该哭就哭，该释放就释放。", study: "找到让你有感触的学习方式，死记硬背不如用心体会。", general: "情感和直觉正在引导你。" },
      air: { love: "沟通！把话说开比猜来猜去有效一百倍。", career: "清晰的思路和有力的表达是破局的关键。", finance: "做好研究和数据分析再下手。", health: "过度思虑是健康的敌人，试着放下脑中的噪音。", study: "你的理解力很强，把知识串联起来比碎片化记忆更有效。", general: "思维和沟通是当下的突破口。" },
      earth: { love: "踏实的陪伴比甜言蜜语更真实。", career: "一步一个脚印，稳扎稳打才是长久之道。", finance: "储蓄和稳健投资是最明智的选择。", health: "规律作息和健康饮食是基础中的基础。", study: "制定切实可行的学习计划并坚持执行。", general: "务实和稳定是当前最需要的品质。" }
    };
    if (maxElement && maxElement[1] >= 2) {
      const advice = elementAdvice[maxElement[0]];
      if (advice) summary += advice[domain] || advice.general;
    }

    return summary;
  }
}
