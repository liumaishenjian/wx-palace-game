// UI管理器 - 负责游戏界面的显示和交互

export class UIManager {
  constructor() {
    // 画布和上下文
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext('2d')
    
    // 屏幕尺寸
    this.screenWidth = this.canvas.width
    this.screenHeight = this.canvas.height
    
    // UI元素
    this.elements = {}
    
    // 当前显示的UI
    this.currentUI = null
    
    // 对话框配置
    this.dialogueConfig = {
      width: this.screenWidth * 0.9,
      height: this.screenHeight * 0.25,
      x: this.screenWidth * 0.05,
      y: this.screenHeight * 0.7,
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      textColor: '#ffffff',
      nameColor: '#ffcc00',
      fontSize: 18,
      nameFontSize: 20,
      lineHeight: 30
    }
    
    // 选择框配置
    this.choiceConfig = {
      width: this.screenWidth * 0.8,
      itemHeight: 50,
      x: this.screenWidth * 0.1,
      y: this.screenHeight * 0.4,
      padding: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      textColor: '#ffffff',
      hoverColor: '#ffcc00',
      fontSize: 18
    }
    
    // 章节标题配置
    this.chapterTitleConfig = {
      x: this.screenWidth / 2,
      y: this.screenHeight / 3,
      color: '#ffcc00',
      fontSize: 36,
      fadeInDuration: 1000,
      stayDuration: 2000,
      fadeOutDuration: 1000
    }
    
    // 晋升动画配置
    this.promotionConfig = {
      duration: 3000,
      textColor: '#ffcc00',
      bgColor: 'rgba(0, 0, 0, 0.8)',
      fontSize: 40
    }
    
    // 初始化触摸事件
    this.initTouchEvents()
    
    console.log('UI管理器初始化完成')
  }
  
  // 初始化触摸事件
  initTouchEvents() {
    this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this))
    this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
    this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this))
  }
  
  // 触摸开始事件
  onTouchStart(e) {
    const touch = e.touches[0]
    const x = touch.clientX
    const y = touch.clientY
    
    // 处理UI元素的点击
    this.handleUIElementClick(x, y)
  }
  
  // 触摸移动事件
  onTouchMove(e) {
    // 处理拖动等操作
  }
  
  // 触摸结束事件
  onTouchEnd(e) {
    // 处理触摸结束操作
  }
  
  // 处理UI元素点击
  handleUIElementClick(x, y) {
    // 如果当前显示对话框，点击任意位置继续对话
    if (this.currentUI === 'dialogue') {
      // 通知对话系统显示下一句对话
      if (window.game && window.game.dialogueSystem) {
        window.game.dialogueSystem.nextDialogue()
      }
      return
    }
    
    // 如果当前显示选择框，检查点击了哪个选项
    if (this.currentUI === 'choice' && this.elements.choices) {
      for (let i = 0; i < this.elements.choices.length; i++) {
        const choice = this.elements.choices[i]
        const choiceY = this.choiceConfig.y + i * this.choiceConfig.itemHeight
        
        if (x >= this.choiceConfig.x && 
            x <= this.choiceConfig.x + this.choiceConfig.width &&
            y >= choiceY && 
            y <= choiceY + this.choiceConfig.itemHeight) {
          // 选择了这个选项
          if (this.elements.choiceCallback) {
            this.elements.choiceCallback(choice.value)
          }
          
          // 隐藏选择框
          this.hideChoiceUI()
          return
        }
      }
    }
  }
  
  // 创建主界面
  createMainUI() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
    
    // 绘制背景
    this.ctx.fillStyle = '#000000'
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
    
    // 绘制标题
    this.ctx.fillStyle = '#ffcc00'
    this.ctx.font = '36px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('宫斗小游戏', this.screenWidth / 2, this.screenHeight / 3)
    
    // 绘制开始按钮
    this.ctx.fillStyle = 'rgba(255, 204, 0, 0.8)'
    this.ctx.fillRect(this.screenWidth / 4, this.screenHeight * 2 / 3, this.screenWidth / 2, 60)
    
    this.ctx.fillStyle = '#000000'
    this.ctx.font = '24px Arial'
    this.ctx.fillText('开始游戏', this.screenWidth / 2, this.screenHeight * 2 / 3 + 30)
    
    // 设置当前UI
    this.currentUI = 'main'
    
    // 添加开始按钮点击区域
    this.elements.startButton = {
      x: this.screenWidth / 4,
      y: this.screenHeight * 2 / 3,
      width: this.screenWidth / 2,
      height: 60,
      onClick: () => {
        // 开始游戏
        if (window.game) {
          window.game.startChapter1Story()
        }
      }
    }
  }
  
  // 显示对话框
  showDialogueUI(dialogue) {
    if (!dialogue) return
    
    // 清除之前的UI
    this.clearUI()
    
    // 绘制对话框背景
    this.ctx.fillStyle = this.dialogueConfig.backgroundColor
    this.ctx.fillRect(
      this.dialogueConfig.x,
      this.dialogueConfig.y,
      this.dialogueConfig.width,
      this.dialogueConfig.height
    )
    
    // 绘制说话者名称
    if (dialogue.speaker && dialogue.speaker !== 'narrator') {
      this.ctx.fillStyle = this.dialogueConfig.nameColor
      this.ctx.font = `${this.dialogueConfig.nameFontSize}px Arial`
      this.ctx.textAlign = 'left'
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(
        dialogue.speaker,
        this.dialogueConfig.x + this.dialogueConfig.padding,
        this.dialogueConfig.y + this.dialogueConfig.padding
      )
    }
    
    // 绘制对话文本
    this.ctx.fillStyle = this.dialogueConfig.textColor
    this.ctx.font = `${this.dialogueConfig.fontSize}px Arial`
    
    // 文本换行处理
    const maxWidth = this.dialogueConfig.width - this.dialogueConfig.padding * 2
    const words = dialogue.text.split('')
    let line = ''
    let lines = []
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = this.ctx.measureText(testLine)
      
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line)
        line = words[i]
      } else {
        line = testLine
      }
    }
    lines.push(line)
    
    // 绘制文本行
    const startY = dialogue.speaker && dialogue.speaker !== 'narrator'
      ? this.dialogueConfig.y + this.dialogueConfig.padding * 2 + this.dialogueConfig.nameFontSize
      : this.dialogueConfig.y + this.dialogueConfig.padding
    
    for (let i = 0; i < lines.length; i++) {
      this.ctx.fillText(
        lines[i],
        this.dialogueConfig.x + this.dialogueConfig.padding,
        startY + i * this.dialogueConfig.lineHeight
      )
    }
    
    // 设置当前UI
    this.currentUI = 'dialogue'
  }
  
  // 显示选择界面
  showChoiceUI(choices, callback) {
    if (!choices || !choices.length) return
    
    // 清除之前的UI
    this.clearUI()
    
    // 计算选择框总高度
    const totalHeight = choices.length * this.choiceConfig.itemHeight
    
    // 绘制选择框背景
    this.ctx.fillStyle = this.choiceConfig.backgroundColor
    this.ctx.fillRect(
      this.choiceConfig.x,
      this.choiceConfig.y,
      this.choiceConfig.width,
      totalHeight
    )
    
    // 绘制选项
    this.ctx.font = `${this.choiceConfig.fontSize}px Arial`
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'middle'
    
    for (let i = 0; i < choices.length; i++) {
      const y = this.choiceConfig.y + i * this.choiceConfig.itemHeight
      
      // 绘制选项文本
      this.ctx.fillStyle = this.choiceConfig.textColor
      this.ctx.fillText(
        choices[i].text,
        this.choiceConfig.x + this.choiceConfig.padding,
        y + this.choiceConfig.itemHeight / 2
      )
    }
    
    // 保存选项和回调
    this.elements.choices = choices
    this.elements.choiceCallback = callback
    
    // 设置当前UI
    this.currentUI = 'choice'
  }
  
  // 隐藏选择界面
  hideChoiceUI() {
    // 清除选择框
    this.clearUI()
    
    // 清除选项数据
    delete this.elements.choices
    delete this.elements.choiceCallback
    
    // 重置当前UI
    this.currentUI = null
  }
  
  // 显示章节标题
  showChapterTitle(title) {
    // 清除之前的UI
    this.clearUI()
    
    // 设置文本样式
    this.ctx.font = `${this.chapterTitleConfig.fontSize}px Arial`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    // 淡入动画
    let opacity = 0
    const fadeIn = setInterval(() => {
      // 清空画布
      this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
      
      // 绘制背景
      this.ctx.fillStyle = '#000000'
      this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
      
      // 绘制标题
      opacity += 0.05
      this.ctx.fillStyle = `rgba(255, 204, 0, ${opacity})`
      this.ctx.fillText(title, this.chapterTitleConfig.x, this.chapterTitleConfig.y)
      
      if (opacity >= 1) {
        clearInterval(fadeIn)
        
        // 保持显示一段时间
        setTimeout(() => {
          // 淡出动画
          let fadeOpacity = 1
          const fadeOut = setInterval(() => {
            // 清空画布
            this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
            
            // 绘制背景
            this.ctx.fillStyle = '#000000'
            this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
            
            // 绘制标题
            fadeOpacity -= 0.05
            this.ctx.fillStyle = `rgba(255, 204, 0, ${fadeOpacity})`
            this.ctx.fillText(title, this.chapterTitleConfig.x, this.chapterTitleConfig.y)
            
            if (fadeOpacity <= 0) {
              clearInterval(fadeOut)
              this.currentUI = null
            }
          }, this.chapterTitleConfig.fadeOutDuration / 20)
        }, this.chapterTitleConfig.stayDuration)
      }
    }, this.chapterTitleConfig.fadeInDuration / 20)
    
    // 设置当前UI
    this.currentUI = 'chapterTitle'
  }
  
  // 显示晋升动画
  showPromotionAnimation(character, newRank) {
    // 清除之前的UI
    this.clearUI()
    
    // 设置文本样式
    this.ctx.font = `${this.promotionConfig.fontSize}px Arial`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    // 创建动画
    let progress = 0
    const interval = setInterval(() => {
      // 清空画布
      this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
      
      // 绘制背景
      this.ctx.fillStyle = this.promotionConfig.bgColor
      this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
      
      // 计算动画进度
      progress += 0.02
      
      // 绘制晋升文本
      this.ctx.fillStyle = this.promotionConfig.textColor
      this.ctx.fillText(
        `晋升: ${newRank}`,
        this.screenWidth / 2,
        this.screenHeight / 2
      )
      
      // 绘制装饰效果
      const radius = this.screenWidth * 0.4 * progress
      this.ctx.strokeStyle = this.promotionConfig.textColor
      this.ctx.lineWidth = 3
      this.ctx.beginPath()
      this.ctx.arc(this.screenWidth / 2, this.screenHeight / 2, radius, 0, Math.PI * 2)
      this.ctx.stroke()
      
      if (progress >= 1) {
        clearInterval(interval)
        
        // 动画结束后清除
        setTimeout(() => {
          this.clearUI()
          this.currentUI = null
        }, 1000)
      }
    }, this.promotionConfig.duration / 50)
    
    // 设置当前UI
    this.currentUI = 'promotion'
  }
  
  // 清除UI
  clearUI() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
    
    // 绘制背景
    this.ctx.fillStyle = '#000000'
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
  }
}