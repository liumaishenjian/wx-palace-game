/**
 * 微信小游戏适配器
 * 用于在微信小游戏环境中模拟浏览器环境
 */

export default class WeappAdapter {
  constructor() {
    // 初始化适配器
    this.initAdapter()
  }

  initAdapter() {
    // 适配 window 对象
    if (!window) {
      window = {
        devicePixelRatio: wx.getSystemInfoSync().pixelRatio
      }
    }

    // 适配 document 对象
    if (!window.document) {
      window.document = {
        createElement: (tagName) => {
          if (tagName === 'canvas') {
            return wx.createCanvas()
          }
          return {}
        }
      }
    }

    // 适配 navigator 对象
    if (!window.navigator) {
      window.navigator = {
        userAgent: 'weapp',
        appVersion: '1.0.0'
      }
    }

    // 适配 Image 对象
    if (!window.Image) {
      window.Image = function() {
        const img = wx.createImage()
        return img
      }
    }

    // 适配 Audio 对象
    if (!window.Audio) {
      window.Audio = function() {
        const audio = wx.createInnerAudioContext()
        return audio
      }
    }

    // 适配 requestAnimationFrame
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = callback => {
        return setTimeout(callback, 1000 / 60)
      }
    }

    // 适配 cancelAnimationFrame
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = id => {
        clearTimeout(id)
      }
    }

    console.log('微信小游戏适配器初始化完成')
  }
}

// 初始化适配器
new WeappAdapter()