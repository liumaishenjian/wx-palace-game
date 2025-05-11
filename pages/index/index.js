// index.js - 游戏首页

Page({
  data: {
    gameTitle: '宫斗小游戏',
    gameVersion: '1.0.0',
    isLoading: true,
    loadingProgress: 0,
    loadingText: '正在加载游戏资源...',
    startButtonVisible: false
  },
  
  onLoad: function() {
    console.log('游戏首页加载');
    
    // 获取全局数据
    const app = getApp();
    this.gameConfig = app.globalData.gameConfig;
    
    // 模拟资源加载进度
    this.simulateLoading();
  },
  
  simulateLoading: function() {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += 10;
      this.setData({
        loadingProgress: progress,
        loadingText: `正在加载游戏资源...${progress}%`
      });
      
      if (progress >= 100) {
        clearInterval(loadingInterval);
        this.setData({
          isLoading: false,
          startButtonVisible: true
        });
      }
    }, 300);
  },
  
  onStartGame: function() {
    console.log('开始游戏');
    
    // 启动游戏主逻辑
    require('../../game.js');
  },
  
  onShareAppMessage: function() {
    return {
      title: '宫斗小游戏 - 成为后宫之主',
      imageUrl: '/images/share.jpg'
    };
  }
});