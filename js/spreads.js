const TAROT_SPREADS = [
  {
    id: "single",
    name: "单牌阵",
    name_en: "Single Card",
    description: "简单直接的指引，适合每日灵感或快速是/否问题",
    card_count: 1,
    icon: "☀",
    positions: [
      { index: 0, name: "指引", name_en: "Guidance", description: "宇宙给你的讯息" }
    ]
  },
  {
    id: "three",
    name: "三牌阵",
    name_en: "Three Card",
    description: "经典占卜牌阵，了解过去、现在与未来的脉络",
    card_count: 3,
    icon: "◐",
    positions: [
      { index: 0, name: "过去", name_en: "Past", description: "影响当下的过去因素" },
      { index: 1, name: "现在", name_en: "Present", description: "当前的状况与挑战" },
      { index: 2, name: "未来", name_en: "Future", description: "事态发展的方向" }
    ]
  },
  {
    id: "relationship",
    name: "关系牌阵",
    name_en: "Relationship",
    description: "探索你与对方之间的能量流动，适合感情与人际问题",
    card_count: 5,
    icon: "♥",
    positions: [
      { index: 0, name: "你", name_en: "You", description: "你在关系中的状态" },
      { index: 1, name: "对方", name_en: "The Other", description: "对方在关系中的状态" },
      { index: 2, name: "你的感受", name_en: "Your View", description: "你如何看待这段关系" },
      { index: 3, name: "对方的感受", name_en: "Their View", description: "对方如何看待这段关系" },
      { index: 4, name: "关系结果", name_en: "Outcome", description: "关系的发展走向" }
    ]
  },
  {
    id: "horseshoe",
    name: "马蹄牌阵",
    name_en: "Horseshoe",
    description: "七张牌的深度解读，比三牌阵更全面，又不至于太复杂",
    card_count: 7,
    icon: "༉",
    positions: [
      { index: 0, name: "过去", name_en: "Past", description: "已经发生的影响" },
      { index: 1, name: "现在", name_en: "Present", description: "当前所处的位置" },
      { index: 2, name: "未来", name_en: "Future", description: "即将到来的趋势" },
      { index: 3, name: "隐藏因素", name_en: "Hidden", description: "你可能忽略的影响" },
      { index: 4, name: "外部影响", name_en: "External", description: "周围环境的作用" },
      { index: 5, name: "建议", name_en: "Advice", description: "塔罗给你的指引" },
      { index: 6, name: "结果", name_en: "Outcome", description: "最终的走向" }
    ]
  },
  {
    id: "decision",
    name: "决策牌阵",
    name_en: "Decision Making",
    description: "面对二选一的抉择？这个牌阵帮你分析两条路的利弊",
    card_count: 7,
    icon: "⇔",
    positions: [
      { index: 0, name: "当前状况", name_en: "Current", description: "你此刻面临的局面" },
      { index: 1, name: "选择A优势", name_en: "Option A Pro", description: "选择A带来的好处" },
      { index: 2, name: "选择A劣势", name_en: "Option A Con", description: "选择A的风险与代价" },
      { index: 3, name: "选择B优势", name_en: "Option B Pro", description: "选择B带来的好处" },
      { index: 4, name: "选择B劣势", name_en: "Option B Con", description: "选择B的风险与代价" },
      { index: 5, name: "关键因素", name_en: "Key Factor", description: "做决定时最重要的考量" },
      { index: 6, name: "建议结果", name_en: "Suggested Path", description: "综合建议的方向" }
    ]
  },
  {
    id: "celtic",
    name: "凯尔特十字",
    name_en: "Celtic Cross",
    description: "最经典的深度牌阵，全面解读你的人生各个维度",
    card_count: 10,
    icon: "✚",
    positions: [
      { index: 0, name: "当前状况", name_en: "Present", description: "你目前的核心处境" },
      { index: 1, name: "挑战", name_en: "Challenge", description: "你面对的主要障碍" },
      { index: 2, name: "过去根基", name_en: "Past Foundation", description: "塑造现状的过去因素" },
      { index: 3, name: "近期未来", name_en: "Near Future", description: "即将发生的事情" },
      { index: 4, name: "最高目标", name_en: "Best Outcome", description: "事情最好的发展方向" },
      { index: 5, name: "潜意识", name_en: "Subconscious", description: "内心深处的真实感受" },
      { index: 6, name: "你的态度", name_en: "Your Approach", description: "你对事情的态度和方式" },
      { index: 7, name: "外部影响", name_en: "External", description: "他人和环境的影响" },
      { index: 8, name: "希望与恐惧", name_en: "Hopes & Fears", description: "你内心期盼和担忧的" },
      { index: 9, name: "最终结果", name_en: "Final Outcome", description: "一切因缘汇聚的终点" }
    ]
  }
];
