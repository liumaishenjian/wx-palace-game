// app.js - 微信小游戏应用入口

App({
  globalData: {
    userInfo: null,
    systemInfo: null
  },
  
  onLaunch: function() {
    console.log('小游戏启动');
    
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;
    console.log('系统信息:', systemInfo);
    
    // 检查更新
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          console.log('有新版本');
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
        }
      });
    }
    
    // 加载游戏配置
    this.loadGameConfig();
  },
  
  loadGameConfig: function() {
    // 从game/config/gameConfig.js加载配置
    const gameConfig = require('./game/config/gameConfig.js').default;
    this.globalData.gameConfig = gameConfig;
    console.log('游戏配置加载完成');
  },
  
  onShow: function() {
    console.log('小游戏显示');
  },
  
  onHide: function() {
    console.log('小游戏隐藏');
  },
  
  onError: function(error) {
    console.error('小游戏发生错误:', error);
    // 错误上报
    if (this.globalData.gameConfig && this.globalData.gameConfig.debug.enabled) {
      wx.showModal({
        title: '错误提示',
        content: error,
        showCancel: false
      });
    }
  }
});