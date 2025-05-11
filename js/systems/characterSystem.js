// 角色系统 - 管理游戏中的角色属性和状态

export class CharacterSystem {
  constructor() {
    // 角色数据
    this.characters = {
      player: null,
      npcs: {}
    }
    
    // 事件监听器
    this.eventListeners = {}
    
    console.log('角色系统初始化完成')
  }
  
  // 创建玩家角色
  createPlayer(data) {
    this.characters.player = {
      ...data,
      type: 'player'
    }
    return this.characters.player
  }
  
  // 创建NPC角色
  createNPC(data) {
    this.characters.npcs[data.id] = {
      ...data,
      type: 'npc'
    }
    return this.characters.npcs[data.id]
  }
  
  // 更新玩家属性
  updatePlayerAttribute(attribute, value) {
    if (!this.characters.player) return
    
    const oldValue = this.characters.player.attributes[attribute] || 0
    this.characters.player.attributes[attribute] = oldValue + value
    
    // 触发属性变化事件
    this.trigger('attributeChanged', this.characters.player, attribute, value)
  }
  
  // 更新NPC属性
  updateNPCAttribute(npcId, attribute, value) {
    const npc = this.characters.npcs[npcId]
    if (!npc) return
    
    const oldValue = npc.attributes[attribute] || 0
    npc.attributes[attribute] = oldValue + value
    
    // 触发属性变化事件
    this.trigger('attributeChanged', npc, attribute, value)
  }
  
  // 获取玩家属性
  getPlayerAttribute(attribute) {
    if (!this.characters.player) return 0
    return this.characters.player.attributes[attribute] || 0
  }
  
  // 获取NPC属性
  getNPCAttribute(npcId, attribute) {
    const npc = this.characters.npcs[npcId]
    if (!npc) return 0
    return npc.attributes[attribute] || 0
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
    // 角色系统每帧更新逻辑
    // 此处可以添加角色状态更新、buff效果计算等
  }

  render() {
    // 渲染角色
    // 此处应该调用渲染系统来绘制角色
  }
}