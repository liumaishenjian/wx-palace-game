/**
 * 游戏配置文件
 * 定义游戏的基本参数和性能设置
 */

export const gameConfig = {
  // 游戏基本设置
  game: {
    name: '宫斗小游戏',
    version: '1.0.0',
    author: '开发者',
    description: '一款宫廷题材的角色扮演游戏'
  },
  
  // 性能设置
  performance: {
    targetFPS: 60,                // 目标帧率
    drawCallLimit: 30,            // 每帧最大drawcall数量
    memoryLimit: {
      jsHeap: 16,                 // JS堆内存限制（MB）
      canvasCache: 4              // Canvas缓存限制（MB）
    },
    loadingTimeout: 5000,         // 资源加载超时时间（毫秒）
    coldStartTime: 800            // 冷启动时间目标（毫秒）
  },
  
  // 游戏画面设置
  screen: {
    width: 750,                   // 设计宽度
    height: 1334,                 // 设计高度
    orientation: 'portrait',      // 屏幕方向：portrait（竖屏）或landscape（横屏）
    adaptMethod: 'scale-fit'      // 适配方法：scale-fit（等比缩放适配）
  },
  
  // 游戏难度设置
  difficulty: {
    default: 'normal',            // 默认难度
    levels: {
      easy: {
        attributeGainRate: 1.2,    // 属性获取倍率
        favorGainRate: 1.2,       // 好感度获取倍率
        eventSuccessRate: 0.8     // 事件成功率
      },
      normal: {
        attributeGainRate: 1.0,
        favorGainRate: 1.0,
        eventSuccessRate: 0.6
      },
      hard: {
        attributeGainRate: 0.8,
        favorGainRate: 0.8,
        eventSuccessRate: 0.4
      }
    }
  },
  
  // 游戏控制设置
  controls: {
    touchSensitivity: 1.0,        // 触摸灵敏度
    longPressTime: 500,           // 长按判定时间（毫秒）
    doubleTapTime: 300            // 双击判定时间（毫秒）
  },
  
  // 音频设置
  audio: {
    bgmVolume: 0.5,               // 背景音乐音量（0-1）
    sfxVolume: 0.8,               // 音效音量（0-1）
    voiceVolume: 1.0              // 语音音量（0-1）
  },
  
  // 存档设置
  save: {
    autoSaveInterval: 300000,     // 自动存档间隔（毫秒）
    maxSaveSlots: 5               // 最大存档槽位数
  },
  
  // 网络设置
  network: {
    requestTimeout: 5000,         // 网络请求超时时间（毫秒）
    retryTimes: 3,                // 失败重试次数
    retryInterval: 1000           // 重试间隔（毫秒）
  },
  
  // 广告设置
  ad: {
    rewardedVideoRetryTimes: 3,   // 激励视频加载失败重试次数
    bannerRefreshInterval: 60000  // Banner广告刷新间隔（毫秒）
  },
  
  // 调试设置
  debug: {
    enabled: false,               // 是否启用调试模式
    showFPS: false,               // 是否显示FPS
    showMemory: false,            // 是否显示内存使用情况
    logLevel: 'warn'              // 日志级别：debug, info, warn, error
  }
};

// 导出默认配置
export default gameConfig;