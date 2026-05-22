const TAROT_CARDS = [
  // ===== 大阿尔卡那 Major Arcana (22张) =====
  {
    id: 0, name_en: "The Fool", name_zh: "愚者", arcana: "major", suit: null, element: "air",
    upright_keywords: ["新开始", "天真", "自由", "冒险"],
    reversed_keywords: ["鲁莽", "冒失", "缺乏方向", "犹豫不决"],
    upright_description: "愚者代表着新的旅程和无限的可能。此时你正站在人生新篇章的起点，带着纯真和勇气踏上未知的旅途。相信直觉，勇敢迈出第一步，宇宙会为你指引方向。",
    reversed_description: "逆位的愚者提醒你做事需三思。过度的冲动和不顾后果可能带来麻烦。也许你正在回避重要的决定，或在错误的时间做出轻率的选择。"
  },
  {
    id: 1, name_en: "The Magician", name_zh: "魔术师", arcana: "major", suit: null, element: "air",
    upright_keywords: ["创造力", "意志力", "技能", "显化"],
    reversed_keywords: ["操控", "欺骗", "才能浪费", "缺乏行动"],
    upright_description: "魔术师象征着你拥有将想法变为现实的一切工具和才能。天地间的力量汇聚于你，专注你的意志，付诸行动，你就能创造奇迹。",
    reversed_description: "逆位的魔术师暗示你可能没有充分利用自己的天赋，或者有人在用花言巧语操控局面。注意辨别真相，不要被表象迷惑。"
  },
  {
    id: 2, name_en: "The High Priestess", name_zh: "女祭司", arcana: "major", suit: null, element: "water",
    upright_keywords: ["直觉", "神秘", "潜意识", "内在智慧"],
    reversed_keywords: ["忽视直觉", "秘密", "过度理性", "与内在脱节"],
    upright_description: "女祭司代表内在的直觉和潜意识的智慧。此刻需要安静下来，倾听内心的声音，答案不在外部，而在你灵魂深处。信任你的第六感。",
    reversed_description: "逆位的女祭司提醒你可能忽视了内在的指引，过度依赖理性和外在信息。也许有些被隐藏的真相需要浮出水面。"
  },
  {
    id: 3, name_en: "The Empress", name_zh: "女皇", arcana: "major", suit: null, element: "earth",
    upright_keywords: ["丰饶", "滋养", "母性", "创造"],
    reversed_keywords: ["依赖", "过度保护", "匮乏感", "创造力受阻"],
    upright_description: "女皇象征着丰盛和滋养的能量。无论是感情、事业还是创造力，都在蓬勃发展。享受生活的美好，用心培育你所珍视的一切。",
    reversed_description: "逆位的女皇暗示你可能感到匮乏或不安，也许在过度付出后忘记了照顾自己。重新找回内在的丰盈，平衡给予与接受。"
  },
  {
    id: 4, name_en: "The Emperor", name_zh: "皇帝", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["权威", "秩序", "稳定", "领导力"],
    reversed_keywords: ["专制", "控制欲", "僵化", "缺乏纪律"],
    upright_description: "皇帝代表着结构、秩序和权威。此时需要建立稳固的根基，用理性和纪律来管理你的生活。掌控局面，制定清晰的计划。",
    reversed_description: "逆位的皇帝警告你可能过于控制或独断，也可能是在权威面前感到无力。灵活与坚定需要平衡。"
  },
  {
    id: 5, name_en: "The Hierophant", name_zh: "教皇", arcana: "major", suit: null, element: "earth",
    upright_keywords: ["传统", "精神指引", "信仰", "导师"],
    reversed_keywords: ["叛逆", "打破传统", "个人信念", "反体制"],
    upright_description: "教皇代表传统智慧和精神指引。也许你需要一位导师的建议，或者在遵循已有规范中找到前进的方向。信仰和传统可以成为你的支撑。",
    reversed_description: "逆位的教皇鼓励你走出框架，质疑权威，寻找属于自己的信念体系。不盲从，用独立思考来定义你的道路。"
  },
  {
    id: 6, name_en: "The Lovers", name_zh: "恋人", arcana: "major", suit: null, element: "air",
    upright_keywords: ["爱情", "选择", "和谐", "价值观"],
    reversed_keywords: ["失衡", "价值观冲突", "犹豫", "不和谐"],
    upright_description: "恋人牌不仅关于爱情，更关于重要的选择。你需要听从内心，做出与价值观一致的决定。深层的关系和真实的联结正在等待你。",
    reversed_description: "逆位的恋人暗示内在价值观的冲突或关系中的不和谐。也许你正在逃避一个重要的选择，或者在两个方向间摇摆不定。"
  },
  {
    id: 7, name_en: "The Chariot", name_zh: "战车", arcana: "major", suit: null, element: "water",
    upright_keywords: ["意志力", "胜利", "决心", "前进"],
    reversed_keywords: ["失控", "方向迷失", "固执", "缺乏计划"],
    upright_description: "战车象征着凭借坚强意志力冲破障碍、取得胜利。你正驾驭着对立的力量前行，保持专注和决心，胜利就在前方。",
    reversed_description: "逆位的战车暗示你可能失去了方向感，内在的矛盾力量正在互相拉扯。需要重新找到平衡，而不是一味硬冲。"
  },
  {
    id: 8, name_en: "Strength", name_zh: "力量", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["内在力量", "勇气", "耐心", "温柔的力量"],
    reversed_keywords: ["自我怀疑", "软弱", "缺乏自信", "内在冲突"],
    upright_description: "力量牌代表的不是蛮力，而是温柔而坚定的内在力量。用耐心和慈悲来面对挑战，你比你想象的更强大。",
    reversed_description: "逆位的力量暗示你正经历自我怀疑或内在的挣扎。也许是时候停止对抗，用柔软来化解坚硬。"
  },
  {
    id: 9, name_en: "The Hermit", name_zh: "隐者", arcana: "major", suit: null, element: "earth",
    upright_keywords: ["内省", "独处", "智慧", "寻道"],
    reversed_keywords: ["孤立", "逃避", "拒绝指引", "过度封闭"],
    upright_description: "隐者邀请你暂时离开喧嚣，进入内在的静谧。通过独处和反思，你将找到深层的答案和智慧。这是灵魂成长的宝贵时光。",
    reversed_description: "逆位的隐者提醒你可能过度封闭自己，把独处变成了逃避。也许你需要重新与人联结，或接受来自他人的智慧之光。"
  },
  {
    id: 10, name_en: "Wheel of Fortune", name_zh: "命运之轮", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["转变", "机遇", "命运", "循环"],
    reversed_keywords: ["逆境", "抗拒改变", "坏运气", "失控感"],
    upright_description: "命运之轮告诉我们一切都在循环之中。变化即将到来，抓住机遇，顺应命运的节奏。起起落落本就是生命的韵律。",
    reversed_description: "逆位的命运之轮暗示你可能正处于低谷期或抗拒着不可避免的变化。记住，轮子终会再次转起，低谷也是循环的一部分。"
  },
  {
    id: 11, name_en: "Justice", name_zh: "正义", arcana: "major", suit: null, element: "air",
    upright_keywords: ["公正", "真相", "因果", "平衡"],
    reversed_keywords: ["不公", "偏见", "逃避责任", "失衡"],
    upright_description: "正义牌代表着因果法则和公正的力量。你种下的因，必将结出相应的果。诚实面对自己，公正地做出决定，宇宙会回应你的正直。",
    reversed_description: "逆位的正义暗示事情可能不尽公平，或者你在逃避某个必须面对的真相。也许你需要正视自己的偏见或不诚实之处。"
  },
  {
    id: 12, name_en: "The Hanged Man", name_zh: "倒吊人", arcana: "major", suit: null, element: "water",
    upright_keywords: ["放下", "新视角", "牺牲", "等待"],
    reversed_keywords: ["拖延", "无谓牺牲", "固执", "拒绝换个角度"],
    upright_description: "倒吊人代表自愿的暂停和视角的转换。当你放下执念，从不同角度看待问题时，新的领悟会自然浮现。有些事情需要时间去成熟。",
    reversed_description: "逆位的倒吊人暗示你可能在不必要地牺牲自己，或者因为固执而拒绝改变视角。停止无意义的等待，是时候做出行动了。"
  },
  {
    id: 13, name_en: "Death", name_zh: "死神", arcana: "major", suit: null, element: "water",
    upright_keywords: ["结束", "转变", "重生", "放下旧事物"],
    reversed_keywords: ["抗拒改变", "停滞", "无法释怀", "恐惧结束"],
    upright_description: "死神牌并非字面意义的死亡，而是深刻的转变。旧的篇章必须结束，新的才能开始。接受这种自然的蜕变，你会像凤凰般浴火重生。",
    reversed_description: "逆位的死神暗示你正在抗拒不可避免的转变，执着于已经不再服务于你的事物。放下恐惧，允许自己蜕变。"
  },
  {
    id: 14, name_en: "Temperance", name_zh: "节制", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["平衡", "中庸", "调和", "耐心"],
    reversed_keywords: ["失衡", "过度", "缺乏耐心", "极端"],
    upright_description: "节制牌象征着和谐与平衡。用耐心和节制来融合生活中的对立面，不急不躁，找到中间的道路。万物在你心中达到完美的交融。",
    reversed_description: "逆位的节制暗示生活失衡，你可能在某方面过度而在另一方面不足。需要找回节奏，避免极端。"
  },
  {
    id: 15, name_en: "The Devil", name_zh: "恶魔", arcana: "major", suit: null, element: "earth",
    upright_keywords: ["束缚", "诱惑", "物质主义", "阴暗面"],
    reversed_keywords: ["释放", "打破枷锁", "面对阴暗", "觉醒"],
    upright_description: "恶魔牌揭示了那些束缚你的东西——成瘾、执念、恐惧或不健康的关系。这些锁链看似坚固，但你随时可以选择挣脱。认清你的阴影，才能超越它。",
    reversed_description: "逆位的恶魔是一个积极的信号——你正在觉醒，开始挣脱束缚你的枷锁。勇敢面对自己的阴暗面，自由就在眼前。"
  },
  {
    id: 16, name_en: "The Tower", name_zh: "高塔", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["剧变", "崩塌", "觉醒", "真相揭露"],
    reversed_keywords: ["延迟的灾难", "抗拒改变", "逃避危机", "内在转变"],
    upright_description: "高塔代表着突然而剧烈的变化——那些看似稳固的结构可能在一瞬间崩塌。虽然痛苦，但这种摧毁是为了清除虚假，露出真相。废墟之上，将建起更坚固的基石。",
    reversed_description: "逆位的高塔暗示一场变化可能被延迟但无法避免，或者你正在内在经历深刻的转变。无论如何，改变终将到来。"
  },
  {
    id: 17, name_en: "The Star", name_zh: "星星", arcana: "major", suit: null, element: "air",
    upright_keywords: ["希望", "灵感", "宁静", "疗愈"],
    reversed_keywords: ["失去信心", "绝望", "断开联结", "缺乏灵感"],
    upright_description: "星星是黑暗中最温柔的光。经历风暴之后，希望正在重新降临。保持信心，宇宙正在疗愈你的创伤。美好的事物正在流向你的生命。",
    reversed_description: "逆位的星星暗示你可能暂时失去了希望和方向感。记住，星光从未消失，只是暂时被乌云遮住。重新连接你内在的光。"
  },
  {
    id: 18, name_en: "The Moon", name_zh: "月亮", arcana: "major", suit: null, element: "water",
    upright_keywords: ["幻象", "恐惧", "潜意识", "不确定性"],
    reversed_keywords: ["释放恐惧", "真相浮现", "走出迷雾", "清醒"],
    upright_description: "月亮笼罩着神秘和不确定的迷雾。事情并非表面看到的那样，恐惧和幻象可能正在扭曲你的判断。穿越阴影，才能抵达真相的另一岸。",
    reversed_description: "逆位的月亮暗示迷雾正在散去，被隐藏的真相开始浮现。你正在从恐惧和幻象中走出来，看清事物的本来面目。"
  },
  {
    id: 19, name_en: "The Sun", name_zh: "太阳", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["喜悦", "成功", "活力", "光明"],
    reversed_keywords: ["暂时受阻", "内在喜悦", "过度乐观", "需要调整"],
    upright_description: "太阳是最明亮的祝福！喜悦、成功和活力正在照耀你的生活。这是一个充满自信和创造力的时刻，尽情享受生命的光与热。",
    reversed_description: "逆位的太阳暗示光明暂时被遮蔽，但太阳的本质并未改变。也许成功需要更多时间，也许你需要调整方向。内在的喜悦始终存在。"
  },
  {
    id: 20, name_en: "Judgement", name_zh: "审判", arcana: "major", suit: null, element: "fire",
    upright_keywords: ["觉醒", "重生", "审视", "召唤"],
    reversed_keywords: ["自我怀疑", "拒绝反省", "逃避使命", "犹豫不决"],
    upright_description: "审判牌代表灵魂的觉醒和重生的召唤。回顾你的人生，审视过去的选择，原谅自己和他人，然后以全新的姿态响应命运的呼唤。升华的时刻到了。",
    reversed_description: "逆位的审判暗示你可能在逃避一次必要的自我审视，或是对内心的召唤充耳不闻。停止逃避，倾听灵魂深处的声音。"
  },
  {
    id: 21, name_en: "The World", name_zh: "世界", arcana: "major", suit: null, element: "earth",
    upright_keywords: ["完成", "圆满", "整合", "成就"],
    reversed_keywords: ["未完成", "缺少收尾", "延迟", "内在不完整"],
    upright_description: "世界牌象征着一个伟大循环的完成。你已经走过了漫长旅途，获得了深刻的智慧和成长。庆祝你的成就，同时新的循环即将开始。",
    reversed_description: "逆位的世界暗示某件事尚未画上句号，你感到不够圆满或有所欠缺。完成你该完成的事，然后才能迎接新的开始。"
  },

  // ===== 权杖 Wands - 火元素 =====
  {
    id: 22, name_en: "Ace of Wands", name_zh: "权杖王牌", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["灵感", "新项目", "激情", "创造力的火花"],
    reversed_keywords: ["延迟", "缺乏方向", "灵感受阻", "机会错失"],
    upright_description: "权杖王牌带来创造力的闪电！一个充满激情的新机会正在向你招手，抓住这股能量，大胆行动。",
    reversed_description: "逆位时，那股火热的能量受到了阻碍。也许你在等待灵感的降临，或是机会就在眼前却没有把握住。"
  },
  {
    id: 23, name_en: "Two of Wands", name_zh: "权杖二", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["规划", "抉择", "未来视野", "掌控"],
    reversed_keywords: ["犹豫不决", "缺乏规划", "害怕未知", "放弃掌控"],
    upright_description: "权杖二代表站在高地远望的时刻。你已经有了基础，现在需要做出关于未来的重要决定。勇敢选择你的方向。",
    reversed_description: "逆位时，你可能因为害怕未知而不敢迈出下一步。也许你的计划不够完善，需要重新审视方向。"
  },
  {
    id: 24, name_en: "Three of Wands", name_zh: "权杖三", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["远见", "进展", "扩展", "等待成果"],
    reversed_keywords: ["延迟", "缺乏远见", "行动不足", "计划受挫"],
    upright_description: "权杖三象征着你已经迈出了关键一步，现在需要耐心等待你的航船归来。保持远见，你的努力终将开花结果。",
    reversed_description: "逆位暗示进展可能延迟，或是你缺乏长远的眼光。也许你需要更积极的行动，而不是等待。"
  },
  {
    id: 25, name_en: "Four of Wands", name_zh: "权杖四", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["庆祝", "归属", "稳定", "家庭"],
    reversed_keywords: ["不稳定", "缺乏归属", "过渡期", "暂时的不安"],
    upright_description: "权杖四是一张欢乐的牌！庆祝你的成就，享受温馨的归属感。稳固的根基已经建立，值得欢聚一堂。",
    reversed_description: "逆位暗示你可能暂时感到不安定或缺乏归属感。也许你正处于过渡期，但请相信稳定终会到来。"
  },
  {
    id: 26, name_en: "Five of Wands", name_zh: "权杖五", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["竞争", "冲突", "挑战", "混乱"],
    reversed_keywords: ["避免冲突", "内在斗争", "寻找共识", "竞争减少"],
    upright_description: "权杖五描绘了一场混战。你正面临竞争和意见分歧，虽然混乱，但这也是磨炼能力的机会。找到建设性的方式来处理分歧。",
    reversed_description: "逆位时冲突正在缓和，或是你选择避免正面对抗。也许你更关注内在的斗争而非外在的纷争。"
  },
  {
    id: 27, name_en: "Six of Wands", name_zh: "权杖六", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["胜利", "认可", "荣耀", "领导力"],
    reversed_keywords: ["失败", "缺乏认可", "自我怀疑", "不被赏识"],
    upright_description: "权杖六是凯旋归来的画面！你的努力得到了认可，胜利属于你。享受这份荣耀，你值得被赞美。",
    reversed_description: "逆位暗示你可能感到努力未获认可，或者正在经历一次挫折。不要让自我怀疑吞噬你，你的价值不取决于他人的掌声。"
  },
  {
    id: 28, name_en: "Seven of Wands", name_zh: "权杖七", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["防守", "坚持", "勇气", "孤军奋战"],
    reversed_keywords: ["退让", "精疲力竭", "放弃立场", "不堪重负"],
    upright_description: "权杖七显示你正在高处坚守自己的立场。面对各方压力，你需要勇气和决心来捍卫你的信念。坚持住，你比想象中更强大。",
    reversed_description: "逆位暗示你可能因为疲惫而想要放弃坚守的立场。也许你需要重新评估这个立场是否还值得你付出。"
  },
  {
    id: 29, name_en: "Eight of Wands", name_zh: "权杖八", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["快速进展", "行动", "旅行", "消息"],
    reversed_keywords: ["延迟", "阻碍", "急躁", "方向混乱"],
    upright_description: "权杖八代表事情正在飞速发展！能量在快速流动，抓住这个势头，迅速行动。好消息或旅行也在路上。",
    reversed_description: "逆位暗示事情进展不如预期，各种延迟和阻碍让你感到沮丧。也许你需要慢下来，理清方向。"
  },
  {
    id: 30, name_en: "Nine of Wands", name_zh: "权杖九", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["韧性", "坚持", "接近胜利", "警惕"],
    reversed_keywords: ["疲惫", "放弃", "固执", "不必要的防御"],
    upright_description: "权杖九显示你已经经历了许多考验，虽然疲惫，但你依然坚守阵地。胜利近在咫尺，再坚持一下，你已经走了这么远。",
    reversed_description: "逆位暗示你可能已经精疲力竭，不再有战斗的意志。也许你需要休息和疗愈，而不是硬撑下去。"
  },
  {
    id: 31, name_en: "Ten of Wands", name_zh: "权杖十", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["重担", "过度承担", "负担", "责任"],
    reversed_keywords: ["释放负担", "委托", "不堪重负", "学会放下"],
    upright_description: "权杖十描绘了被重担压弯腰的身影。你承担了太多，几乎无法前行。是时候学会分担或放下一些不必要的东西了。",
    reversed_description: "逆位是一个积极的信号——你正在学会放下过重的负担，或者开始把责任委托给他人。释放自己，轻装前行。"
  },
  {
    id: 32, name_en: "Page of Wands", name_zh: "权杖侍从", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["探索", "热情", "好奇心", "新消息"],
    reversed_keywords: ["缺乏方向", "拖延", "三分钟热度", "消息延迟"],
    upright_description: "权杖侍从带着热情和好奇心而来！一个令人兴奋的消息或机会即将到来，保持开放和探索的心态。",
    reversed_description: "逆位暗示你的热情可能是短暂的，或者期待的消息被延迟。需要更持续的行动力，而不是只有冲动。"
  },
  {
    id: 33, name_en: "Knight of Wands", name_zh: "权杖骑士", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["行动", "冒险", "冲动", "能量"],
    reversed_keywords: ["鲁莽", "延迟", "暴躁", "方向错误"],
    upright_description: "权杖骑士带着势不可挡的能量冲锋！是时候大胆行动了，全力以赴追求你想要的东西。但注意不要太过冲动。",
    reversed_description: "逆位暗示行动的方向可能有问题，或者冲动带来了负面后果。慢下来，三思而后行。"
  },
  {
    id: 34, name_en: "Queen of Wands", name_zh: "权杖王后", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["自信", "魅力", "独立", "温暖"],
    reversed_keywords: ["嫉妒", "不安全感", "操控", "过度自我"],
    upright_description: "权杖王后散发着自信和魅力！你是充满活力的领导者，既有力量又温暖。相信自己的魅力，用热情感染身边的人。",
    reversed_description: "逆位暗示你可能被不安全感或嫉妒所困扰。也许你过于在意外界的看法，需要找回内在的力量和自信。"
  },
  {
    id: 35, name_en: "King of Wands", name_zh: "权杖国王", arcana: "minor", suit: "wands", element: "fire",
    upright_keywords: ["领导力", "远见", "魄力", "企业家精神"],
    reversed_keywords: ["专制", "冲动", "缺乏远见", "滥用权力"],
    upright_description: "权杖国王是天生领袖！你有远见和魄力，能够引领他人共同实现宏伟目标。果断决策，以身作则。",
    reversed_description: "逆位暗示领导力可能变得专制或冲动。也许你在滥用权力，或缺乏长远规划。真正的领袖需要智慧而不仅仅是力量。"
  },

  // ===== 圣杯 Cups - 水元素 =====
  {
    id: 36, name_en: "Ace of Cups", name_zh: "圣杯王牌", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["新感情", "爱", "直觉", "情感涌动"],
    reversed_keywords: ["情感封闭", "压抑感情", "关系问题", "缺乏爱"],
    upright_description: "圣杯王牌象征着爱的开始！一段新的感情、友情或创意灵感正从心底涌出，敞开你的心扉，迎接爱的降临。",
    reversed_description: "逆位时，你可能正在封闭自己的情感，不愿让爱流入或流出。也许是过去的伤痛让你不敢再次敞开心扉。"
  },
  {
    id: 37, name_en: "Two of Cups", name_zh: "圣杯二", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["联结", " partnership", "互惠", "灵魂伴侣"],
    reversed_keywords: ["关系失衡", "分离", "缺乏信任", "沟通问题"],
    upright_description: "圣杯二描绘了两个灵魂的美好联结。无论是爱情、友情还是合作，这都是一段互惠互爱的关系。珍惜这份难得的缘分。",
    reversed_description: "逆位暗示关系可能出现了失衡或裂痕。沟通不畅或信任缺失正在影响你们的联结。"
  },
  {
    id: 38, name_en: "Three of Cups", name_zh: "圣杯三", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["友谊", "庆祝", "欢乐", "团聚"],
    reversed_keywords: ["友谊问题", "孤立", "过度社交", "小团体"],
    upright_description: "圣杯三是欢聚的喜悦！和挚友一起庆祝，享受温暖友情的滋润。快乐就在身边，与值得的人分享。",
    reversed_description: "逆位暗示友谊中可能出现了问题，或者你感到被社交圈排斥。也许你需要审视某些关系的真实性。"
  },
  {
    id: 39, name_en: "Four of Cups", name_zh: "圣杯四", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["冷漠", "不满足", "忽视机会", "冥想"],
    reversed_keywords: ["觉醒", "抓住机会", "走出冷漠", "新兴趣"],
    upright_description: "圣杯四显示你对眼前的一切感到无聊和不满足，以至于忽略了正在递给你的新机会。是时候从消沉中醒来，看看那些被忽视的可能性。",
    reversed_description: "逆位是一个转机——你正在从冷漠中苏醒，重新找到生活的热情。那些曾经忽视的机会开始变得有吸引力。"
  },
  {
    id: 40, name_en: "Five of Cups", name_zh: "圣杯五", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["悲伤", "失去", "遗憾", "关注消极面"],
    reversed_keywords: ["接受", "走出悲伤", "找到希望", "放下过去"],
    upright_description: "圣杯五描绘了悲伤和失落的画面。你专注于已经倾覆的杯，却没有注意到身后还有两杯满盈。允许自己悲伤，但别忘了那些仍在的美好。",
    reversed_description: "逆位暗示你正在走出悲伤的阴影，开始接受失去并寻找新的希望。治愈正在发生，生活正在重新流动。"
  },
  {
    id: 41, name_en: "Six of Cups", name_zh: "圣杯六", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["怀旧", "童年", "纯真", "回忆"],
    reversed_keywords: ["活在当下", "放下过去", "理想化回忆", "成长"],
    upright_description: "圣杯六带你回到美好的旧时光。一段温馨的回忆或来自过去的人正在温暖你的心。享受这份甜蜜，但也要记得拥抱现在。",
    reversed_description: "逆位提醒你不要过度沉溺于过去。也许你在用玫瑰色眼镜回忆往事，是时候把目光转向现在和未来了。"
  },
  {
    id: 42, name_en: "Seven of Cups", name_zh: "圣杯七", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["幻象", "选择", "想象", "白日梦"],
    reversed_keywords: ["清醒", "做出选择", "面对现实", "走出幻境"],
    upright_description: "圣杯七展示了众多可能性，但也充满了幻象和幻想。你需要从白日梦中回到现实，做出切实可行的选择。不是每个闪光的都是金子。",
    reversed_description: "逆位是一个积极的信号——你正在从迷雾中清醒，做出清晰的决定，面对现实而非幻想。"
  },
  {
    id: 43, name_en: "Eight of Cups", name_zh: "圣杯八", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["离开", "放弃", "寻找更深的意义", "转变"],
    reversed_keywords: ["犹豫", "不愿放手", "原地停留", "害怕改变"],
    upright_description: "圣杯八代表主动选择离开。即使现有的看似圆满，你内心知道这里已无法满足你灵魂的渴望。勇敢踏上寻找更深意义的旅途。",
    reversed_description: "逆位暗示你想离开却迈不出那一步，或者在纠结是否该放弃现状。内心的声音在催促你，但恐惧让你止步不前。"
  },
  {
    id: 44, name_en: "Nine of Cups", name_zh: "圣杯九", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["满足", "愿望成真", "享受", "情感满足"],
    reversed_keywords: ["不满足", "物质主义", "内在空虚", "期望过高"],
    upright_description: "圣杯九是愿望成真的牌！你的心愿即将实现，深层的满足和幸福正在到来。享受这份来自内心的丰盛。",
    reversed_description: "逆位暗示即使外在得到了想要的，内心仍感到空虚。也许你需要追求更深层的满足，而非表面的享乐。"
  },
  {
    id: 45, name_en: "Ten of Cups", name_zh: "圣杯十", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["幸福家庭", "和谐", "圆满", "情感丰盈"],
    reversed_keywords: ["家庭矛盾", "不和谐", "关系破裂", "完美幻象"],
    upright_description: "圣杯十代表着情感世界的圆满彩虹！家庭幸福、关系和谐、内心丰盈。这是爱的最高境界，珍惜你所拥有的一切。",
    reversed_description: "逆位暗示家庭或关系中的和谐被打破，或者表面的完美下藏着隐忧。正视问题，真实的关系胜过虚假的和谐。"
  },
  {
    id: 46, name_en: "Page of Cups", name_zh: "圣杯侍从", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["直觉", "创意信息", "敏感", "新感情"],
    reversed_keywords: ["情感不成熟", "缺乏直觉", "忽视内心", "情绪波动"],
    upright_description: "圣杯侍从带来来自内心深处的信息。也许是一个创意灵感、一段新的感情萌芽，或是需要用直觉去感知的信号。保持敏感和开放。",
    reversed_description: "逆位暗示你可能在忽视自己的感受，或情绪上还不够成熟。学会倾听自己的心声，而不是压抑它。"
  },
  {
    id: 47, name_en: "Knight of Cups", name_zh: "圣杯骑士", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["浪漫", "追求", "情感邀请", "理想主义"],
    reversed_keywords: ["不切实际", "情绪化", "逃避现实", "虚情假意"],
    upright_description: "圣杯骑士骑着白马带来爱的邀请！一段浪漫的追求或感性的机会正在靠近。跟随你的心，但也要保持清醒。",
    reversed_description: "逆位暗示浪漫可能是虚幻的，或你正被情绪牵着走。也许有人口惠而实不至，看清真心再投入。"
  },
  {
    id: 48, name_en: "Queen of Cups", name_zh: "圣杯王后", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["同情心", "直觉", "温柔", "情感智慧"],
    reversed_keywords: ["情感依赖", "过度敏感", "自我牺牲", "情绪不稳"],
    upright_description: "圣杯王后是情感智慧的化身！她用无限的温柔和直觉感知世界。信任你的感受，用爱来滋养自己和他人。",
    reversed_description: "逆位暗示你可能过于依赖他人的情感，或过度牺牲自己来照顾别人。先爱自己，才能更好地爱他人。"
  },
  {
    id: 49, name_en: "King of Cups", name_zh: "圣杯国王", arcana: "minor", suit: "cups", element: "water",
    upright_keywords: ["情感平衡", "外交", "智慧", "宽容"],
    reversed_keywords: ["情绪失控", "操控", "逃避", "情感冷漠"],
    upright_description: "圣杯国王在情感世界中达到了完美的平衡。他既有深沉的感受力，又能保持冷静和理性。用智慧和慈悲来引导你的人际关系。",
    reversed_description: "逆位暗示情感可能失控，或者你用情感来操控他人。也许你在压抑自己的感受，导致内在的暗流涌动。"
  },

  // ===== 宝剑 Swords - 风元素 =====
  {
    id: 50, name_en: "Ace of Swords", name_zh: "宝剑王牌", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["突破", "清晰", "真理", "新想法"],
    reversed_keywords: ["混乱", "缺乏清晰", "想法受阻", "不公正"],
    upright_description: "宝剑王牌斩开迷雾！一次思想的突破或胜利正在到来。用清晰的头脑和坚定的决心，你能攻克任何难关。",
    reversed_description: "逆位暗示思路混乱，或是你的想法无法突破某些障碍。也许你需要换个角度看问题，或等待更好的时机。"
  },
  {
    id: 51, name_en: "Two of Swords", name_zh: "宝剑二", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["僵局", "艰难抉择", "逃避", "平衡"],
    reversed_keywords: ["做出决定", "信息暴露", "打破僵局", "不再逃避"],
    upright_description: "宝剑二代表一个艰难的抉择。你蒙上双眼，试图逃避必须做的决定。但回避不会让问题消失，勇敢面对才能打破僵局。",
    reversed_description: "逆位暗示僵局终于被打破，你不得不做出选择。也许隐藏的信息浮出水面，帮助你看清方向。"
  },
  {
    id: 52, name_en: "Three of Swords", name_zh: "宝剑三", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["心碎", "悲伤", "分离", "痛苦"],
    reversed_keywords: ["疗愈", "释放痛苦", "恢复", "走出阴影"],
    upright_description: "宝剑三是塔罗中最痛的牌之一。心碎、分离或深深的失望正刺痛你的心。允许自己感受这份痛，因为只有穿越悲伤才能迎来治愈。",
    reversed_description: "逆位是一个希望的信号——你正在从心碎中慢慢愈合。痛苦不会一夜消失，但你已经走在治愈的路上了。"
  },
  {
    id: 53, name_en: "Four of Swords", name_zh: "宝剑四", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["休息", "恢复", "冥想", "暂停"],
    reversed_keywords: ["焦躁", "过早行动", "无法休息", "内心不安"],
    upright_description: "宝剑四邀请你进入深度的休息和恢复。无论是身体还是心灵，都需要暂停来蓄积力量。这不是放弃，而是明智的自我修复。",
    reversed_description: "逆位暗示你可能无法安下心来休息，或是在还未恢复时就匆忙行动。给自己足够的恢复时间。"
  },
  {
    id: 54, name_en: "Five of Swords", name_zh: "宝剑五", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["失败", "冲突", "空洞的胜利", "背叛"],
    reversed_keywords: ["和解", "弥补", "放下怨恨", "从失败中学习"],
    upright_description: "宝剑五描绘了争斗后的荒凉。也许你赢了，但代价是什么？空洞的胜利不如有意义的和解。有时候放下武器才是真正的力量。",
    reversed_description: "逆位暗示冲突正在缓和，你开始愿意和解或放下怨恨。也许你从失败中学到了宝贵的教训。"
  },
  {
    id: 55, name_en: "Six of Swords", name_zh: "宝剑六", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["过渡", "离开", "前往更好的地方", "平静之旅"],
    reversed_keywords: ["停滞", "不愿离开", "反复", "旅途受阻"],
    upright_description: "宝剑六象征一段平静的过渡。你正从动荡之地驶向更安宁的彼岸。虽然离开令人伤感，但前方有更好的生活在等待你。",
    reversed_description: "逆位暗示你可能不愿离开当前的处境，或过渡被延迟了。也许你还在来回纠结，无法坚定方向。"
  },
  {
    id: 56, name_en: "Seven of Swords", name_zh: "宝剑七", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["欺骗", "策略", "回避", "半真半假"],
    reversed_keywords: ["坦白", "暴露", "停止欺骗", "面对真相"],
    upright_description: "宝剑七暗示有人在隐瞒真相或使用策略。也许是你自己，也许是他人在对你不诚实。小心行事，不要被表象所蒙蔽。",
    reversed_description: "逆位暗示真相正在被揭露，或是你决定不再隐瞒。也许你终于愿意面对一直回避的现实。"
  },
  {
    id: 57, name_en: "Eight of Swords", name_zh: "宝剑八", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["束缚", "受害者心态", "自我限制", "困境"],
    reversed_keywords: ["释放", "打破限制", "换位思考", "走出困境"],
    upright_description: "宝剑八描绘了被自我限制困住的状态。蒙眼的你觉得自己无法动弹，但仔细看——那些束缚你的宝剑，也许只是你的恐惧所编织的幻象。",
    reversed_description: "逆位是一个解放的信号——你开始意识到那些限制多半是自己设下的。移开蒙眼布，你就能找到出路。"
  },
  {
    id: 58, name_en: "Nine of Swords", name_zh: "宝剑九", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["焦虑", "噩梦", "担忧", "过度思考"],
    reversed_keywords: ["释放焦虑", "走出阴霾", "恢复睡眠", "面对恐惧"],
    upright_description: "宝剑九是深夜焦虑的画面。你的担忧和恐惧在黑暗中被放大，但醒来后你会发现，现实远没有你想象的那样可怕。停止让恐惧掌控你的夜晚。",
    reversed_description: "逆位暗示你正在走出焦虑的阴影，夜晚不再那么可怕。也许你终于愿意面对那些让你辗转难眠的问题。"
  },
  {
    id: 59, name_en: "Ten of Swords", name_zh: "宝剑十", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["结束", "低谷", "背叛", "痛苦的终结"],
    reversed_keywords: ["拒绝接受", "缓慢恢复", "最坏已过去", "转变中"],
    upright_description: "宝剑十代表一次彻底的结束——也许很痛，但已经到底了。黎明前的黑暗最为深沉，而最黑暗的时刻过后，就是重生。从废墟中站起来，新的开始正在等待你。",
    reversed_description: "逆位暗示最坏的已经过去，虽然恢复缓慢，但你在慢慢走出深渊。也许你还在抗拒这个结束，但接受它才能让你真正重生。"
  },
  {
    id: 60, name_en: "Page of Swords", name_zh: "宝剑侍从", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["好奇", "警觉", "沟通", "新想法"],
    reversed_keywords: ["沟通问题", "散布谣言", "缺乏计划", "心不在焉"],
    upright_description: "宝剑侍从带着敏锐的观察力而来。新的信息或想法正在引起你的注意。保持好奇心和警觉，用智慧的眼光审视周围。",
    reversed_description: "逆位暗示沟通中可能有问题，或有人在背后议论。也许你的想法缺乏实际的支撑，需要更深入地思考。"
  },
  {
    id: 61, name_en: "Knight of Swords", name_zh: "宝剑骑士", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["快速行动", "锐利", "直率", "思维敏捷"],
    reversed_keywords: ["冒进", "言辞伤人", "缺乏计划", "混乱"],
    upright_description: "宝剑骑士如风般迅捷！现在是快速行动和果断决策的时候。用你的智慧和口才，直奔目标。但小心不要因为太快而忽视了细节。",
    reversed_description: "逆位暗示你的行动可能太冒进，或你的言辞正在伤害他人。也许你冲得太多却没有方向，需要停下来重新规划。"
  },
  {
    id: 62, name_en: "Queen of Swords", name_zh: "宝剑王后", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["独立", "客观", "清晰", "边界感"],
    reversed_keywords: ["冷漠", "苛刻", "过度批判", "缺乏同情"],
    upright_description: "宝剑王后用清晰的目光看待世界。她独立而公正，不让自己被情感左右。在需要客观判断的时刻，效仿她的冷静和智慧。",
    reversed_description: "逆位暗示你可能变得过于冷漠或苛刻，用批判的眼光对待一切却缺乏同理心。理性和感性需要平衡。"
  },
  {
    id: 63, name_en: "King of Swords", name_zh: "宝剑国王", arcana: "minor", suit: "swords", element: "air",
    upright_keywords: ["权威", "理性", "决断力", "真理"],
    reversed_keywords: ["独断", "不讲情面", "滥用权威", "僵化思维"],
    upright_description: "宝剑国王是理性与权威的象征。他的判断精准而公正，决策果断而清晰。在需要坚定立场和清晰思维的时刻，相信你的判断力。",
    reversed_description: "逆位暗示权力可能被滥用，或理性变成了冷酷。也许你需要放下控制，让心与脑共同做决定。"
  },

  // ===== 星币 Pentacles - 土元素 =====
  {
    id: 64, name_en: "Ace of Pentacles", name_zh: "星币王牌", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["新财务机会", "丰盛", "稳固基础", "新开始"],
    reversed_keywords: ["财务损失", "计划失败", "缺乏规划", "错失机会"],
    upright_description: "星币王牌带来物质层面的新机遇！一个有利可图的新项目、工作或投资正在向你招手。脚踏实地，把握这个黄金机会。",
    reversed_description: "逆位暗示财务上可能有所损失，或一个看似不错的机会并没有实质内容。也许你需要更务实的规划。"
  },
  {
    id: 65, name_en: "Two of Pentacles", name_zh: "星币二", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["平衡", "多任务", "灵活", "调整"],
    reversed_keywords: ["失衡", "过度承诺", "混乱", "需要简化"],
    upright_description: "星币二显示你正在多件事之间寻求平衡。像杂耍者一样，灵活调整你的节奏和资源是关键。保持弹性，你能应对一切。",
    reversed_description: "逆位暗示你可能同时承担了太多事情，导致每件都做不好。也许是时候简化生活，专注于最重要的事。"
  },
  {
    id: 66, name_en: "Three of Pentacles", name_zh: "星币三", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["团队合作", "精通", "学习", "建设"],
    reversed_keywords: ["缺乏合作", "质量不佳", "独自工作", "技能不足"],
    upright_description: "星币三赞美协作的力量！团队中每个人各展所长，共同打造出色的成果。你的专业能力正在被认可和需要。",
    reversed_description: "逆位暗示团队中可能存在合作问题，或你的技能水平还需要提升。也许你需要更多学习或更好的配合。"
  },
  {
    id: 67, name_en: "Four of Pentacles", name_zh: "星币四", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["守财", "控制", "安全", "固执"],
    reversed_keywords: ["放手", "慷慨", "过度消费", "物质松绑"],
    upright_description: "星币四显示你可能过于紧握已有的东西——金钱、安全感或控制权。适度的储蓄是好的，但过度执着会阻碍新的能量流入你的生活。",
    reversed_description: "逆位暗示你开始学会放手，不再被物质安全感所束缚。也许你变得更慷慨，或开始享受而非囤积。"
  },
  {
    id: 68, name_en: "Five of Pentacles", name_zh: "星币五", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["匮乏", "困境", "被排斥", "物质困难"],
    reversed_keywords: ["恢复", "帮助到来", "走出困境", "精神富足"],
    upright_description: "星币五描绘了物质和精神上的匮乏。也许你正经历经济困境或感到被社会排斥。但请注意——身后那扇发光的窗户，援助近在咫尺，只等你伸出手。",
    reversed_description: "逆位是一个好转的信号——困境正在缓解，帮助正在到来。你开始从匮乏中走出，重新找到物质和精神上的安全感。"
  },
  {
    id: 69, name_en: "Six of Pentacles", name_zh: "星币六", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["慷慨", "给予与接受", "分享", "慈善"],
    reversed_keywords: ["自私", "债务", "一方付出", "不平等"],
    upright_description: "星币六代表给予与接受的和谐流动。无论你是给予者还是接受者，宇宙的能量在流通中变得更加丰盛。慷慨地分享你的富足。",
    reversed_description: "逆位暗示给予与接受的关系失衡了。也许你总是在付出却得不到回报，或反过来只索取而不给予。重建平衡是关键。"
  },
  {
    id: 70, name_en: "Seven of Pentacles", name_zh: "星币七", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["耐心", "评估", "等待收获", "投入"],
    reversed_keywords: ["急躁", "无回报", "缺乏坚持", "错误投资"],
    upright_description: "星币七让你停下来审视你的耕耘。你已经投入了大量心血，现在需要耐心等待收获。如果方向正确，坚持就是答案；如果不对，及时调整。",
    reversed_description: "逆位暗示你的投入可能没有得到预期的回报，或你变得不耐烦了。也许你需要重新评估是否继续投入，或考虑换一个方向。"
  },
  {
    id: 71, name_en: "Eight of Pentacles", name_zh: "星币八", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["精进", "专注", "工艺", "勤奋"],
    reversed_keywords: ["完美主义", "缺乏进步", "厌倦", "草率"],
    upright_description: "星币八赞美匠人精神！通过持续的专注和练习，你正在成为某个领域的专家。享受精进的过程，每一份努力都在锻造你的卓越。",
    reversed_description: "逆位暗示你可能陷入了完美主义的陷阱，或对重复的工作感到厌倦。也许你需要找到新的学习动力，或接受足够好也是一种智慧。"
  },
  {
    id: 72, name_en: "Nine of Pentacles", name_zh: "星币九", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["独立富足", "优雅", "自给自足", "享受生活"],
    reversed_keywords: ["过度依赖", "虚荣", "财务不稳", "缺乏自律"],
    upright_description: "星币九展现了一种令人向往的状态——独立、优雅且物质充裕。你通过自己的努力创造了美好的生活，享受这份自在和富足吧。",
    reversed_description: "逆位暗示你可能在财务上还不够独立，或过于依赖他人。也许你需要重新审视自己的消费习惯和理财方式。"
  },
  {
    id: 73, name_en: "Ten of Pentacles", name_zh: "星币十", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["家族财富", "传承", "长期稳定", "传统"],
    reversed_keywords: ["遗产纠纷", "财务问题", "家庭不和", "失去传统"],
    upright_description: "星币十代表物质世界的巅峰——世代积累的财富与稳固的根基。家族的支持、传统的力量和长期的安全感正在庇佑着你。",
    reversed_description: "逆位暗示家族或财务上可能出现问题。也许遗产分配有争议，或家庭的稳定正受到挑战。守护好你珍视的根基。"
  },
  {
    id: 74, name_en: "Page of Pentacles", name_zh: "星币侍从", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["学习", "新技能", "目标", "务实"],
    reversed_keywords: ["缺乏方向", "学业问题", "拖延", "不切实际"],
    upright_description: "星币侍从带着学习的渴望而来！你正踏上掌握新技能或开始新事业的旅程。脚踏实地，一步一个脚印，你的目标终将实现。",
    reversed_description: "逆位暗示你可能在学业或职业方向上感到迷茫，或拖延了重要的学习计划。找回你的目标感，务实地行动。"
  },
  {
    id: 75, name_en: "Knight of Pentacles", name_zh: "星币骑士", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["可靠", "勤奋", "常规", "坚持"],
    reversed_keywords: ["固执", "懒惰", "缺乏变化", "停滞"],
    upright_description: "星币骑士是最可靠的伙伴！他一步一个脚印，稳定而踏实。也许现在不是追求刺激的时候，而是需要你坚守岗位、持续耕耘的时刻。",
    reversed_description: "逆位暗示你可能变得过于固执或陷入了停滞。也许你需要打破常规，尝试新的方法，而不是一味地按部就班。"
  },
  {
    id: 76, name_en: "Queen of Pentacles", name_zh: "星币王后", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["务实", "丰饶", "工作与生活平衡", "关怀"],
    reversed_keywords: ["工作狂", "忽略自我", "财务混乱", "过度操劳"],
    upright_description: "星币王后将务实与温柔完美结合！她既善于理财持家，又懂得享受生活。在事业与家庭之间找到平衡，你就是自己生活的女王。",
    reversed_description: "逆位暗示你可能过度专注于工作而忽略了生活的其他方面，或财务状况变得混乱。找回你的平衡感。"
  },
  {
    id: 77, name_en: "King of Pentacles", name_zh: "星币国王", arcana: "minor", suit: "pentacles", element: "earth",
    upright_keywords: ["财富", "商业成功", "安全", "奢华"],
    reversed_keywords: ["贪婪", "财务失误", "放纵", "缺乏节制"],
    upright_description: "星币国王是物质世界的王者！他拥有财富、权力和安全感，但更重要的是他知道如何管理和享受这一切。用智慧和节制来守护你的成果。",
    reversed_description: "逆位暗示你可能变得过于贪婪或放纵，或财务上出现了失误。也许你需要更负责任地对待你的资源。"
  }
];
