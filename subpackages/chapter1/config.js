/**
 * 第一章节配置文件
 * 包含第一章节的对话、事件和晋升条件
 */

// 第一章节对话内容
export const dialogues = {
  'chapter1_intro': [
    { speaker: 'narrator', text: '大清康熙年间，一年一度的选秀开始了。' },
    { speaker: 'narrator', text: '你作为秀女，被选入宫中，成为了一名贵人。' },
    { speaker: 'palace_maid', text: '恭喜小主入宫，奴婢是来接您的。请随我来，皇上和皇后娘娘都在等您呢。', character: 'palace_maid' },
    { speaker: 'player', text: '(内心)：初入宫闱，一切都要小心谨慎...', character: 'player' }
  ],
  'chapter1_empress': [
    { speaker: 'empress', text: '新来的贵人，你很懂规矩嘛，知道先来拜见本宫。', character: 'empress' },
    { speaker: 'player', text: '民女参见皇后娘娘，娘娘万福金安。', character: 'player' },
    { speaker: 'empress', text: '起来吧。既然入了宫，就要谨记宫规。本宫喜欢守规矩的人，你以后好好表现，本宫自然会照拂你。', character: 'empress' },
    { speaker: 'player', text: '谢皇后娘娘。', character: 'player' },
    { speaker: 'narrator', text: '你获得了皇后的初步认可，这对你在后宫的生存很有帮助。' }
  ],
  'chapter1_emperor': [
    { speaker: 'palace_maid', text: '这位贵人想要觐见皇上，不知道...', character: 'palace_maid' },
    { speaker: 'emperor', text: '让她进来吧。', character: 'emperor' },
    { speaker: 'player', text: '民女参见皇上，吾皇万岁万岁万万岁。', character: 'player' },
    { speaker: 'emperor', text: '平身。你就是新入宫的秀女？倒是有几分胆识，刚入宫就敢求见朕。', character: 'emperor' },
    { speaker: 'player', text: '民女只是想早日见到皇上圣颜，不敢有他意。', character: 'player' },
    { speaker: 'narrator', text: '皇帝对你的印象取决于你的表现和运气...' }
  ],
  'chapter1_garden': [
    { speaker: 'narrator', text: '你来到了御花园，这里景色宜人，是后宫嫔妃们经常游玩的地方。' },
    { speaker: 'player', text: '(内心)：这里风景如画，倒是个放松心情的好地方。', character: 'player' },
    { speaker: 'concubine', text: '这位想必就是新入宫的贵人吧？我是丽嫔，很高兴认识你。', character: 'concubine' },
    { speaker: 'player', text: '丽嫔娘娘好，民女初入宫闱，还请多多指教。', character: 'player' },
    { speaker: 'concubine', text: '你很有礼貌，我很欣赏。后宫之中，明枪易躲暗箭难防，你要多加小心。', character: 'concubine' },
    { speaker: 'player', text: '多谢娘娘提醒。', character: 'player' },
    { speaker: 'narrator', text: '你结识了丽嫔，获得了一位潜在的盟友。' }
  ],
  'chapter1_library': [
    { speaker: 'narrator', text: '你来到了皇家藏书阁，这里收藏了大量的书籍。' },
    { speaker: 'player', text: '(内心)：读书明智，或许能从这些书中学到一些为人处世的道理。', character: 'player' },
    { speaker: 'scholar', text: '这位贵人是来看书的吗？', character: 'scholar' },
    { speaker: 'player', text: '是的，不知有什么书籍推荐？', character: 'player' },
    { speaker: 'scholar', text: '既然是初入宫闱，不妨先读读《女则》和《内训》，了解后宫规矩。若是想增长见识，《资治通鉴》也是不错的选择。', character: 'scholar' },
    { speaker: 'player', text: '多谢指点。', character: 'player' },
    { speaker: 'narrator', text: '你在藏书阁学习了宫廷礼仪和历史知识，智慧和政治属性有所提升。' }
  ],
  'chapter1_ceremony': [
    { speaker: 'narrator', text: '你参加了宫中的祭祀仪式，这是展示自己的好机会。' },
    { speaker: 'palace_maid', text: '贵人，仪式马上就要开始了，您需要站在那边。', character: 'palace_maid' },
    { speaker: 'player', text: '知道了，多谢提醒。', character: 'player' },
    { speaker: 'narrator', text: '仪式进行中，你表现得端庄得体，吸引了不少目光。' },
    { speaker: 'emperor', text: '今日的仪式，朕很满意。', character: 'emperor' },
    { speaker: 'player', text: '(内心)：这是个好机会，要好好把握。', character: 'player' },
    { speaker: 'narrator', text: '仪式结束后，你获得了更多人的认可，提升了自己在后宫的地位。' }
  ]
}

// 第一章节事件配置
export const events = [
  {
    id: 'first_meeting',
    title: '初次见面',
    description: '初入宫闱，与皇帝和皇后的第一次见面',
    triggerCondition: 'chapter1_intro_complete',
    choices: [
      { id: 'meet_empress', text: '谨慎行事，拜见皇后', value: 'meet_empress' },
      { id: 'meet_emperor', text: '大胆进取，寻求皇帝召见', value: 'meet_emperor' }
    ],
    outcomes: {
      'meet_empress': {
        dialogue: 'chapter1_empress',
        attributes: {
          etiquette: 5,
          'empress.favor': 10
        }
      },
      'meet_emperor': {
        dialogue: 'chapter1_emperor',
        attributes: {
          politics: 5,
          'emperor.favor': 'random(-10,15)'
        }
      }
    }
  },
  {
    id: 'palace_exploration',
    title: '宫廷探索',
    description: '熟悉宫廷环境，结识宫中人物',
    triggerCondition: 'first_meeting_complete',
    choices: [
      { id: 'explore_garden', text: '探索御花园', value: 'explore_garden' },
      { id: 'visit_library', text: '前往皇家藏书阁', value: 'visit_library' },
      { id: 'attend_ceremony', text: '参加宫廷仪式', value: 'attend_ceremony' }
    ],
    outcomes: {
      'explore_garden': {
        dialogue: 'chapter1_garden',
        attributes: {
          charm: 5,
          'concubine.favor': 10
        },
        unlockLocation: ['garden']
      },
      'visit_library': {
        dialogue: 'chapter1_library',
        attributes: {
          wisdom: 8,
          politics: 5
        },
        unlockLocation: ['imperial_study']
      },
      'attend_ceremony': {
        dialogue: 'chapter1_ceremony',
        attributes: {
          etiquette: 10,
          'emperor.favor': 5,
          'empress.favor': 5
        }
      }
    }
  }
]

// 第一章节晋升条件
export const promotionRequirements = {
  // 从贵人晋升到嫔的条件
  '贵人': {
    targetRank: '嫔',
    requirements: {
      charm: 20,      // 需要魅力达到20
      etiquette: 15,  // 需要礼仪达到15
      emperor_favor: 30 // 需要皇帝好感度达到30
    }
  }
}

// 第一章节NPC配置
export const npcs = [
  {
    id: 'emperor',
    name: '皇帝',
    description: '当朝天子，后宫之主',
    attributes: {
      favor: 50,
      influence: 100
    },
    faction: 'imperial'
  },
  {
    id: 'empress',
    name: '皇后',
    description: '后宫之主，地位尊贵',
    attributes: {
      favor: 20,
      hostility: 10,
      influence: 80
    },
    faction: 'empress_faction'
  },
  {
    id: 'concubine',
    name: '丽嫔',
    description: '性格温和的嫔妃，可能成为盟友',
    attributes: {
      favor: 0,
      hostility: 0,
      influence: 30
    },
    faction: 'neutral'
  },
  {
    id: 'palace_maid',
    name: '宫女',
    description: '服侍主子的宫女，可以打探消息',
    attributes: {
      favor: 50,
      influence: 10
    },
    faction: 'servants'
  },
  {
    id: 'scholar',
    name: '太傅',
    description: '皇家学者，知识渊博',
    attributes: {
      favor: 0,
      influence: 40
    },
    faction: 'scholars'
  }
]

// 第一章节物品配置
export const items = [
  {
    id: 'hairpin',
    name: '金步摇',
    description: '精美的金步摇，可以提升魅力',
    effects: {
      charm: 5
    },
    price: 100
  },
  {
    id: 'book',
    name: '《女则》',
    description: '记载宫廷礼仪的书籍，可以提升礼仪',
    effects: {
      etiquette: 5
    },
    price: 80
  },
  {
    id: 'tea',
    name: '珍贵茶叶',
    description: '可以用来送礼，提升好感度',
    effects: {
      'target.favor': 10
    },
    price: 50,
    consumable: true
  }
]