// 游戏主入口

class Game {
  constructor() {
    console.log('宫斗小游戏初始化')
    
    // 初始化游戏系统
    this.initSystems()
    
    // 初始化UI
    this.initUI()
    
    // 加载第一章节
    this.loadChapter1()
    
    // 开始游戏循环
    this.gameLoop()
  }
  
  initSystems() {
    // 初始化宫殿
    this.palace = new Palace()
    
    // 初始化对话系统
    this.dialogueSystem = new DialogueSystem()
    
    // 初始化角色系统
    this.characterSystem = new CharacterSystem()
    
    // 初始化晋升系统
    this.promotionSystem = new PromotionSystem()
    
    // 初始化事件系统
    this.eventSystem = new EventSystem()
    
    // 注册系统间的事件监听
    this.registerEvents()
  }
  
  initUI() {
    // 初始化UI管理器
    this.uiManager = new UIManager()
    
    // 创建主界面
    this.uiManager.createMainUI()
  }
  
  registerEvents() {
    // 注册对话完成事件
    this.dialogueSystem.on('dialogueComplete', (dialogueId) => {
      this.eventSystem.triggerEvent('dialogueComplete', dialogueId)
    })
    
    // 注册角色属性变化事件
    this.characterSystem.on('attributeChanged', (character, attribute, value) => {
      this.eventSystem.triggerEvent('attributeChanged', { character, attribute, value })
      
      // 检查晋升条件
      this.promotionSystem.checkPromotion(character)
    })
    
    // 注册晋升事件
    this.promotionSystem.on('promotion', (character, newRank) => {
      this.eventSystem.triggerEvent('promotion', { character, newRank })
      this.uiManager.showPromotionAnimation(character, newRank)
    })
  }
  
  loadChapter1() {
    console.log('加载第一章节')
    
    // 加载第一章节的资源包
    wx.loadSubpackage({
      name: 'chapter1',
      success: (res) => {
        console.log('第一章节加载成功')
        
        // 初始化第一章节
        this.initChapter1()
      },
      fail: (err) => {
        console.error('第一章节加载失败', err)
      }
    })
  }
  
  initChapter1() {
    // 创建主角
    const player = this.characterSystem.createPlayer({
      name: '玩家',
      attributes: {
        charm: 10,
        wisdom: 10,
        politics: 10,
        etiquette: 10
      },
      rank: '贵人'
    })
    
    // 创建第一章节的NPC
    this.characterSystem.createNPC({
      id: 'emperor',
      name: '皇帝',
      attributes: {
        favor: 50
      }
    })
    
    this.characterSystem.createNPC({
      id: 'empress',
      name: '皇后',
      attributes: {
        favor: 20,
        hostility: 10
      }
    })
    
    // 设置第一章节的对话
    this.dialogueSystem.loadDialogues('chapter1')
    
    // 开始第一章节的剧情
    this.startChapter1Story()
  }
  
  startChapter1Story() {
    // 显示章节标题
    this.uiManager.showChapterTitle('第一章：初入宫闱')
    
    // 开始第一段对话
    this.dialogueSystem.startDialogue('chapter1_intro')
    
    // 注册第一章节的事件
    this.eventSystem.on('dialogueComplete', (dialogueId) => {
      if (dialogueId === 'chapter1_intro') {
        // 第一段对话完成后，显示选择界面
        this.uiManager.showChoiceUI([
          { text: '谨慎行事，拜见皇后', value: 'meet_empress' },
          { text: '大胆进取，寻求皇帝召见', value: 'meet_emperor' }
        ], this.handleChapter1Choice.bind(this))
      }
    })
  }
  
  handleChapter1Choice(choice) {
    switch(choice) {
      case 'meet_empress':
        // 增加礼仪属性
        this.characterSystem.updatePlayerAttribute('etiquette', 5)
        // 增加皇后好感
        this.characterSystem.updateNPCAttribute('empress', 'favor', 10)
        // 开始拜见皇后的对话
        this.dialogueSystem.startDialogue('chapter1_empress')
        break
        
      case 'meet_emperor':
        // 增加政治属性
        this.characterSystem.updatePlayerAttribute('politics', 5)
        // 有几率增加或减少皇帝好感
        const randomFavor = Math.random() > 0.5 ? 15 : -10
        this.characterSystem.updateNPCAttribute('emperor', 'favor', randomFavor)
        // 开始觐见皇帝的对话
        this.dialogueSystem.startDialogue('chapter1_emperor')
        break
    }
  }
  
  gameLoop() {
    // 游戏主循环
    requestAnimationFrame(() => {
      // 更新游戏逻辑
      this.update()
      
      // 渲染游戏画面
      this.render()
      
      // 继续下一帧
      this.gameLoop()
    })
  }
  
  update() {
    // 更新游戏系统状态
    this.dialogueSystem.update()
    this.characterSystem.update()
    this.eventSystem.update()
    this.promotionSystem.update()
    
    // 更新宫殿场景
    this.palace.update()
  }
  
  render() {
    // 清空画布
    this.uiManager.clearCanvas()
    
    // 渲染宫殿背景
    this.palace.render()
    
    // 渲染角色
    this.characterSystem.render()
    
    // 渲染对话框和UI
    this.dialogueSystem.render()
    this.uiManager.render()
  }
  
// 在 main.js 中修改
async initGame() {
    try {
      // 先加载必要资源
      const resourcesLoaded = await this.uiManager.preloadResources()
      if (!resourcesLoaded) {
        throw new Error('资源加载失败')
      }
      
      // 初始化系统
      this.initSystems()
      
      // 加载对话数据
      await this.dialogueSystem.loadDialogues('chapter1')
      
      // 开始游戏循环
      this.startGameLoop()
    } catch (err) {
      console.error('游戏初始化失败:', err)
      this.uiManager.showErrorMessage('游戏启动失败，请重试')
    }
  }

}