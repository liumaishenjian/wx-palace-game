// 晋升系统 - 管理妃位晋升的条件和效果

export class PromotionSystem {
  constructor() {
    // 晋升条件配置
    this.promotionRequirements = {
      // 从贵人晋升到嫔的条件
      '贵人': {
        targetRank: '嫔',
        requirements: {
          charm: 20,      // 需要魅力达到20
          etiquette: 15,  // 需要礼仪达到15
          emperor_favor: 30 // 需要皇帝好感度达到30
        }
      },
      // 从嫔晋升到妃的条件
      '嫔': {
        targetRank: '妃',
        requirements: {
          charm: 40,      // 需要魅力达到40
          wisdom: 30,     // 需要智慧达到30
          politics: 20,   // 需要政治达到20
          emperor_favor: 60 // 需要皇帝好感度达到60
        }
      },
      // 从妃晋升到贵妃的条件
      '妃': {
        targetRank: '贵妃',
        requirements: {
          charm: 60,      // 需要魅力达到60
          wisdom: 50,     // 需要智慧达到50
          politics: 40,   // 需要政治达到40
          etiquette: 40,  // 需要礼仪达到40
          emperor_favor: 80 // 需要皇帝好感度达到80
        }
      },
      // 从贵妃晋升到皇贵妃的条件
      '贵妃': {
        targetRank: '皇贵妃',
        requirements: {
          charm: 80,      // 需要魅力达到80
          wisdom: 70,     // 需要智慧达到70
          politics: 60,   // 需要政治达到60
          etiquette: 60,  // 需要礼仪达到60
          emperor_favor: 95 // 需要皇帝好感度达到95
        }
      }
    }
    
    // 晋升奖励配置
    this.promotionRewards = {
      '嫔': {
        gold: 200,       // 获得200金钱
        power: 10,       // 获得10权力
        attributes: {
          charm: 5,       // 魅力+5
          etiquette: 5    // 礼仪+5
        }
      },
      '妃': {
        gold: 500,       // 获得500金钱
        power: 30,       // 获得30权力
        attributes: {
          charm: 10,      // 魅力+10
          wisdom: 10,     // 智慧+10
          politics: 5     // 政治+5
        }
      },
      '贵妃': {
        gold: 1000,      // 获得1000金钱
        power: 60,       // 获得60权力
        attributes: {
          charm: 15,      // 魅力+15
          wisdom: 15,     // 智慧+15
          politics: 10,   // 政治+10
          etiquette: 10   // 礼仪+10
        }
      },
      '皇贵妃': {
        gold: 2000,      // 获得2000金钱
        power: 100,      // 获得100权力
        attributes: {
          charm: 20,      // 魅力+20
          wisdom: 20,     // 智慧+20
          politics: 20,   // 政治+20
          etiquette: 20   // 礼仪+20
        }
      }
    }
    
    // 事件监听器
    this.eventListeners = {}
    
    console.log('晋升系统初始化完成')
  }
  
  // 检查晋升条件
  checkPromotion(character) {
    if (!character) return false
    
    // 获取当前等级的晋升条件
    const currentRank = character.rank
    const promotionConfig = this.promotionRequirements[currentRank]
    
    if (!promotionConfig) {
      // 已经是最高等级或无法晋升
      return false
    }
    
    // 检查是否满足所有晋升条件
    const requirements = promotionConfig.requirements
    let allRequirementsMet = true
    
    for (const [attribute, requiredValue] of Object.entries(requirements)) {
      // 特殊处理皇帝好感度
      if (attribute === 'emperor_favor') {
        // 假设皇帝的ID是'emperor'
        const emperor = this.getNPC('emperor')
        if (!emperor || emperor.attributes.favor < requiredValue) {
          allRequirementsMet = false
          break
        }
        continue
      }
      
      // 检查角色属性
      if (!character.attributes[attribute] || character.attributes[attribute] < requiredValue) {
        allRequirementsMet = false
        break
      }
    }
    
    // 如果满足所有条件，执行晋升
    if (allRequirementsMet) {
      this.promoteCharacter(character, promotionConfig.targetRank)
      return true
    }
    
    return false
  }
  
  // 执行晋升
  promoteCharacter(character, newRank) {
    if (!character || !newRank) return false
    
    // 更新角色等级
    const oldRank = character.rank
    character.rank = newRank
    
    console.log(`角色晋升: ${character.name} ${oldRank} -> ${newRank}`)
    
    // 给予晋升奖励
    this.givePromotionRewards(character, newRank)
    
    // 触发晋升事件
    this.trigger('promotion', character, newRank, oldRank)
    
    return true
  }
  
  // 给予晋升奖励
  givePromotionRewards(character, rank) {
    const rewards = this.promotionRewards[rank]
    if (!rewards) return false
    
    // 给予金钱奖励
    if (rewards.gold) {
      character.attributes.gold = (character.attributes.gold || 0) + rewards.gold
      console.log(`晋升奖励: ${character.name} 获得 ${rewards.gold} 金钱`)
    }
    
    // 给予权力奖励
    if (rewards.power) {
      character.attributes.power = (character.attributes.power || 0) + rewards.power
      console.log(`晋升奖励: ${character.name} 获得 ${rewards.power} 权力`)
    }
    
    // 给予属性奖励
    if (rewards.attributes) {
      for (const [attribute, value] of Object.entries(rewards.attributes)) {
        character.attributes[attribute] = (character.attributes[attribute] || 0) + value
        console.log(`晋升奖励: ${character.name} ${attribute} +${value}`)
      }
    }
    
    return true
  }
  
  // 获取NPC角色（辅助方法）
  getNPC(id) {
    // 这里需要从角色系统获取NPC
    // 在实际项目中，应该通过依赖注入或其他方式获取角色系统
    // 这里简化处理，假设已经有一个全局的角色系统实例
    if (window.game && window.game.characterSystem) {
      return window.game.characterSystem.getNPC(id)
    }
    return null
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
}