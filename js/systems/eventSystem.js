// 事件系统 - 管理游戏中的各种事件和触发器

export class EventSystem {
  constructor() {
    // 事件监听器
    this.eventListeners = {}
    
    // 已触发的事件记录
    this.triggeredEvents = {}
    
    // 事件条件
    this.eventConditions = {}
    
    // 章节事件配置
    this.chapterEvents = {
      'chapter1': [
        {
          id: 'first_meeting',
          title: '初次见面',
          description: '初入宫闱，与皇帝和皇后的第一次见面',
          triggerCondition: 'chapter1_intro_complete',
          choices: [
            { id: 'meet_empress', text: '谨慎行事，拜见皇后' },
            { id: 'meet_emperor', text: '大胆进取，寻求皇帝召见' }
          ]
        },
        {
          id: 'palace_exploration',
          title: '宫廷探索',
          description: '熟悉宫廷环境，结识宫中人物',
          triggerCondition: 'first_meeting_complete',
          choices: [
            { id: 'explore_garden', text: '探索御花园' },
            { id: 'visit_library', text: '前往皇家藏书阁' },
            { id: 'attend_ceremony', text: '参加宫廷仪式' }
          ]
        }
      ]
    }
    
    console.log('事件系统初始化完成')
  }
  
  // 注册事件监听器
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = []
    }
    
    this.eventListeners[eventName].push(callback)
    return this // 支持链式调用
  }
  
  // 移除事件监听器
  off(eventName, callback) {
    if (!this.eventListeners[eventName]) return this
    
    if (callback) {
      // 移除特定回调
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(cb => cb !== callback)
    } else {
      // 移除所有该事件的回调
      delete this.eventListeners[eventName]
    }
    
    return this
  }
  
  // 触发事件
  triggerEvent(eventName, data) {
    // 记录事件已触发
    this.triggeredEvents[eventName] = true
    
    // 检查是否有监听器
    if (!this.eventListeners[eventName]) return false
    
    console.log(`触发事件: ${eventName}`, data)
    
    // 调用所有监听器
    for (const callback of this.eventListeners[eventName]) {
      callback(data)
    }
    
    // 检查是否满足其他事件的触发条件
    this.checkEventConditions(eventName)
    
    return true
  }
  
  // 检查事件是否已触发
  hasTriggered(eventName) {
    return !!this.triggeredEvents[eventName]
  }
  
  // 设置事件触发条件
  setEventCondition(eventName, conditionFn) {
    this.eventConditions[eventName] = conditionFn
    return this
  }
  
  // 检查事件条件
  checkEventConditions(triggeredEventName) {
    for (const [eventName, conditionFn] of Object.entries(this.eventConditions)) {
      // 如果事件已经触发过，跳过
      if (this.triggeredEvents[eventName]) continue
      
      // 检查条件是否满足
      if (conditionFn(triggeredEventName, this.triggeredEvents)) {
        // 触发该事件
        this.triggerEvent(eventName, { triggeredBy: triggeredEventName })
      }
    }
  }
  
  // 加载章节事件
  loadChapterEvents(chapterId) {
    const events = this.chapterEvents[chapterId]
    if (!events) {
      console.error(`章节事件不存在: ${chapterId}`)
      return false
    }
    
    console.log(`加载章节事件: ${chapterId}`, events)
    
    // 设置事件触发条件
    for (const event of events) {
      if (event.triggerCondition) {
        this.setEventCondition(event.id, (triggeredEvent) => {
          return triggeredEvent === event.triggerCondition
        })
      }
    }
    
    return true
  }
  
  // 获取章节事件
  getChapterEvents(chapterId) {
    return this.chapterEvents[chapterId] || []
  }
  
  // 获取事件选项
  getEventChoices(eventId) {
    // 在所有章节中查找事件
    for (const events of Object.values(this.chapterEvents)) {
      const event = events.find(e => e.id === eventId)
      if (event) {
        return event.choices || []
      }
    }
    
    return []
  }
  
  // 选择事件选项
  chooseEventOption(eventId, choiceId) {
    console.log(`选择事件选项: ${eventId} -> ${choiceId}`)
    
    // 触发选择事件
    this.triggerEvent(`${eventId}_choice`, { eventId, choiceId })
    
    // 标记事件完成
    this.triggerEvent(`${eventId}_complete`, { choiceId })
    
    return true
  }
}