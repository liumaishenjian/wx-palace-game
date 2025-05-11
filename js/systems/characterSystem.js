// 角色系统 - 管理游戏中的角色属性和状态

export class CharacterSystem {
  constructor() {
    // 玩家角色
    this.player = null
    
    // NPC角色列表
    this.npcs = {}
    
    // 妃位等级（从低到高）
    this.ranks = [
      '贵人',
      '嫔',
      '妃',
      '贵妃',
      '皇贵妃'
    ]
    
    // 事件监听器
    this.eventListeners = {}
    
    console.log('角色系统初始化完成')
  }
  
  // 创建玩家角色
  createPlayer(data) {
    this.player = {
      name: data.name || '玩家',
      attributes: {
        // 基础属性
        charm: data.attributes?.charm || 10,      // 魅力
        wisdom: data.attributes?.wisdom || 10,     // 智慧
        politics: data.attributes?.politics || 10,  // 政治
        etiquette: data.attributes?.etiquette || 10, // 礼仪
        
        // 资源
        gold: data.attributes?.gold || 100,        // 金钱
        power: data.attributes?.power || 0,        // 权力
        
        // 关系网络
        relationships: data.attributes?.relationships || {}
      },
      rank: data.rank || '贵人',  // 妃位等级
      items: data.items || [],    // 拥有的物品
      skills: data.skills || [],  // 习得的技能
      tasks: data.tasks || []     // 当前任务
    }
    
    console.log(`创建玩家角色: ${this.player.name}, 等级: ${this.player.rank}`)
    return this.player
  }
  
  // 创建NPC角色
  createNPC(data) {
    if (!data.id) {
      console.error('NPC必须有ID')
      return null
    }
    
    const npc = {
      id: data.id,
      name: data.name || data.id,
      attributes: {
        // NPC特有属性
        favor: data.attributes?.favor || 0,        // 好感度
        hostility: data.attributes?.hostility || 0, // 敌意
        influence: data.attributes?.influence || 0, // 影响力
        ...data.attributes
      },
      rank: data.rank || '',      // 身份等级
      faction: data.faction || '', // 所属派系
      relationship: data.relationship || 'neutral' // 与玩家的关系
    }
    
    this.npcs[data.id] = npc
    console.log(`创建NPC: ${npc.name}`)
    return npc
  }
  
  // 获取玩家角色
  getPlayer() {
    return this.player
  }
  
  // 获取NPC角色
  getNPC(id) {
    return this.npcs[id] || null
  }
  
  // 获取所有NPC
  getAllNPCs() {
    return Object.values(this.npcs)
  }
  
  // 更新玩家属性
  updatePlayerAttribute(attribute, value) {
    if (!this.player) return false
    
    // 检查属性是否存在
    if (typeof this.player.attributes[attribute] === 'undefined') {
      // 如果属性不存在，创建它
      this.player.attributes[attribute] = 0
    }
    
    // 更新属性值
    const oldValue = this.player.attributes[attribute]
    this.player.attributes[attribute] += value
    
    console.log(`玩家属性变化: ${attribute} ${oldValue} -> ${this.player.attributes[attribute]} (${value > 0 ? '+' : ''}${value})`)
    
    // 触发属性变化事件
    this.trigger('attributeChanged', this.player, attribute, value)
    
    return true
  }
  
  // 更新NPC属性
  updateNPCAttribute(npcId, attribute, value) {
    const npc = this.npcs[npcId]
    if (!npc) return false
    
    // 检查属性是否存在
    if (typeof npc.attributes[attribute] === 'undefined') {
      // 如果属性不存在，创建它
      npc.attributes[attribute] = 0
    }
    
    // 更新属性值
    const oldValue = npc.attributes[attribute]
    npc.attributes[attribute] += value
    
    console.log(`NPC ${npc.name} 属性变化: ${attribute} ${oldValue} -> ${npc.attributes[attribute]} (${value > 0 ? '+' : ''}${value})`)
    
    // 触发属性变化事件
    this.trigger('npcAttributeChanged', npc, attribute, value)
    
    return true
  }
  
  // 提升玩家妃位等级
  promotePlayer(newRank) {
    if (!this.player) return false
    
    // 检查新等级是否有效
    if (!this.ranks.includes(newRank)) {
      console.error(`无效的妃位等级: ${newRank}`)
      return false
    }
    
    // 检查是否是晋升（不能降级）
    const currentRankIndex = this.ranks.indexOf(this.player.rank)
    const newRankIndex = this.ranks.indexOf(newRank)
    
    if (newRankIndex <= currentRankIndex) {
      console.error(`无法晋升: 当前等级 ${this.player.rank} 已经高于或等于 ${newRank}`)
      return false
    }
    
    // 更新等级
    const oldRank = this.player.rank
    this.player.rank = newRank
    
    console.log(`玩家晋升: ${oldRank} -> ${newRank}`)
    
    // 触发晋升事件
    this.trigger('promotion', this.player, newRank, oldRank)
    
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
  trigger(event, ...args) {
    if (!this.eventListeners[event]) return
    
    for (const callback of this.eventListeners[event]) {
      callback(...args)
    }
  }
}