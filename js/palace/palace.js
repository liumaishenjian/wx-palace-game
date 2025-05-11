// 宫殿系统 - 管理宫殿场景和位置

export class Palace {
  constructor() {
    // 初始化宫殿场所
    this.locations = {
      // 主要场所
      'imperial_palace': { name: '紫禁城', description: '皇帝居住的地方，权力的中心' },
      'empress_palace': { name: '坤宁宫', description: '皇后的寝宫，后宫权力的中心' },
      'concubine_residence': { name: '妃嫔居所', description: '各位妃嫔的居住地，按照品级分配' },
      'garden': { name: '御花园', description: '后宫嫔妃游玩的地方，也是偶遇的好地方' },
      'imperial_study': { name: '御书房', description: '皇帝处理政务的地方' },
      
      // 第一章节特有场所
      'entrance_hall': { name: '大殿', description: '初入宫闱的第一站，在这里见到皇帝和皇后' },
      'waiting_room': { name: '偏殿', description: '等待召见的地方' },
      'ceremony_hall': { name: '礼仪大殿', description: '举行重要仪式的地方' }
    }
    
    // 当前位置
    this.currentLocation = 'entrance_hall'
    
    // 可访问位置（随剧情和身份开放）
    this.accessibleLocations = ['entrance_hall', 'waiting_room']
    
    console.log('宫殿系统初始化完成')
  }
  
  // 获取当前位置信息
  getCurrentLocation() {
    return this.locations[this.currentLocation]
  }
  
  // 移动到新位置
  moveToLocation(locationId) {
    if (!this.locations[locationId]) {
      console.error(`位置不存在: ${locationId}`)
      return false
    }
    
    if (!this.accessibleLocations.includes(locationId)) {
      console.error(`无法访问该位置: ${locationId}`)
      return false
    }
    
    this.currentLocation = locationId
    console.log(`移动到: ${this.locations[locationId].name}`)
    return true
  }
  
  // 解锁新的位置
  unlockLocation(locationId) {
    if (!this.locations[locationId]) {
      console.error(`位置不存在: ${locationId}`)
      return false
    }
    
    if (!this.accessibleLocations.includes(locationId)) {
      this.accessibleLocations.push(locationId)
      console.log(`解锁新位置: ${this.locations[locationId].name}`)
    }
    
    return true
  }
  
  // 获取所有可访问的位置
  getAccessibleLocations() {
    return this.accessibleLocations.map(id => ({
      id,
      ...this.locations[id]
    }))
  }
  
  // 第一章节特定方法 - 初始化入宫场景
  initEntranceScene() {
    // 重置当前位置到入宫场景
    this.currentLocation = 'entrance_hall'
    
    // 第一章只开放有限的几个地点
    this.accessibleLocations = ['entrance_hall', 'waiting_room', 'ceremony_hall']
    
    console.log('初始化入宫场景完成')
    return true
  }
}