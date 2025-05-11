// 晋升系统 - 管理后宫晋升机制

export class PromotionSystem {
  constructor() {
    // 晋升等级配置
    this.ranks = [
      { name: '贵人', requirements: {} },
      { 
        name: '嫔', 
        requirements: {
          charm: 20,
          etiquette: 15,
          favor: 30
        }
      },
      { 
        name: '贵嫔', 
        requirements: {
          charm: 35,
          etiquette: 25,
          favor: 50,
          politics: 20
        }
      },
      { 
        name: '妃', 
        requirements: {
          charm: 50,
          etiquette: 40,
          favor: 70,
          politics: 35,
          wisdom: 30
        }
      },
      { 
        name: '贵妃', 
        requirements: {
          charm: 70,
          etiquette: 60,
          favor: 85,
          politics: 50,
          wisdom: 45
        }
      }
    ]
    
    // 事件监听器
    this.eventListeners = {}
    
    console.log('晋升系统初始化完成')
  }
  
  // 检查晋升条件
  checkPromotion(character) {
    if (character.type !== 'player') return
    
    const currentRankIndex = this.ranks.findIndex(rank => rank.name === character.rank)
    if (currentRankIndex === -1 || currentRankIndex === this.ranks.length - 1) return
    
    const nextRank = this.ranks[currentRankIndex + 1]
    if (this.meetRequirements(character, nextRank.requirements)) {
      // 触发晋升事件
      this.promote(character, nextRank.name)
    }
  }
  
  // 检查是否满足要求
  meetRequirements(character, requirements) {
    for (const [attribute, required] of Object.entries(requirements)) {
      const current = character.attributes[attribute] || 0
      if (current < required) return false
    }
    return true
  }
  
  // 执行晋升
  promote(character, newRank) {
    const oldRank = character.rank
    character.rank = newRank
    
    // 触发晋升事件
    this.trigger('promotion', character, newRank, oldRank)
  }
  
  // 获取当前等级信息
  getCurrentRankInfo(character) {
    return this.ranks.find(rank => rank.name === character.rank)
  }
  
  // 获取下一等级信息
  getNextRankInfo(character) {
    const currentRankIndex = this.ranks.findIndex(rank => rank.name === character.rank)
    if (currentRankIndex === -1 || currentRankIndex === this.ranks.length - 1) return null
    
    return this.ranks[currentRankIndex + 1]
  }
  
  // 事件监听
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = []
    }
    
    this.eventListeners[event].push(callback)
  }
  
  // 触发事件
  trigger(event, ...args) {
    if (!this.eventListeners[event]) return
    
    for (const callback of this.eventListeners[event]) {
      callback(...args)
    }
  }

  update() {
    // 晋升系统每帧更新逻辑
    // 此处可以添加自动检查晋升条件等
  }
}