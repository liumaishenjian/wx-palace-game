// 对话系统 - 管理游戏中的对话和剧情

export class DialogueSystem {
  constructor() {
    // 对话数据
    this.dialogues = {}
    
    // 当前对话ID
    this.currentDialogueId = null
    
    // 当前对话索引
    this.currentDialogueIndex = 0
    
    // 事件监听器
    this.eventListeners = {}
    
    console.log('对话系统初始化完成')
  }
  
  // 加载对话数据
  loadDialogues(chapterId) {
    // 在实际项目中，这里应该从服务器或本地文件加载对话数据
    // 这里为了演示，直接硬编码第一章的对话
    if (chapterId === 'chapter1') {
      this.dialogues = {
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
          { speaker: 'emperor', text: '平身。就是新入宫的秀女？倒是有几分胆识，刚入宫就敢求见朕。', character: 'emperor' },
          { speaker: 'player', text: '民女只是想早日见到皇上圣颜，不敢有他意。', character: 'player' },
          { speaker: 'narrator', text: '皇帝对你的印象取决于你的表现和运气...' }
        ]
      }
      console.log('加载第一章对话数据完成')
    }
  }
  
  // 开始对话
  startDialogue(dialogueId) {
    if (!this.dialogues[dialogueId]) {
      console.error(`对话不存在: ${dialogueId}`)
      return false
    }
    
    this.currentDialogueId = dialogueId
    this.currentDialogueIndex = 0
    
    // 显示第一句对话
    this.showCurrentDialogue()
    
    return true
  }
  
  // 显示当前对话
  showCurrentDialogue() {
    const dialogue = this.getCurrentDialogue()
    if (!dialogue) return false
    
    // 在实际项目中，这里应该将对话显示到UI上
    console.log(`[${dialogue.speaker}]: ${dialogue.text}`)
    
    return true
  }
  
  // 获取当前对话
  getCurrentDialogue() {
    if (!this.currentDialogueId) return null
    
    const dialogues = this.dialogues[this.currentDialogueId]
    if (!dialogues || this.currentDialogueIndex >= dialogues.length) return null
    
    return dialogues[this.currentDialogueIndex]
  }
  
  // 下一句对话
  nextDialogue() {
    if (!this.currentDialogueId) return false
    
    const dialogues = this.dialogues[this.currentDialogueId]
    if (!dialogues) return false
    
    this.currentDialogueIndex++
    
    // 如果对话结束
    if (this.currentDialogueIndex >= dialogues.length) {
      // 触发对话完成事件
      this.trigger('dialogueComplete', this.currentDialogueId)
      
      // 重置当前对话
      this.currentDialogueId = null
      this.currentDialogueIndex = 0
      
      return false
    }
    
    // 显示下一句对话
    this.showCurrentDialogue()
    
    return true
  }
  
  // 事件监听
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = []
    }
    
    this.eventListeners[event].push(callback)
  }
  
  // 触发事件
  trigger(event, data) {
    if (!this.eventListeners[event]) return
    
    for (const callback of this.eventListeners[event]) {
      callback(data)
    }
  }

  update() {
    // 对话系统每帧更新逻辑
    // 此处可添加自动对话推进或选项超时逻辑
  }
}