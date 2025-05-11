/**
 * Symbol polyfill
 * 为不支持ES6 Symbol的环境提供Symbol功能
 */

if (!window.Symbol) {
  // 用于生成唯一ID的计数器
  let _symbolCounter = 0
  
  // Symbol构造函数
  function Symbol(description) {
    // 确保使用new调用
    if (this instanceof Symbol) {
      throw new TypeError('Symbol is not a constructor')
    }
    
    // 生成唯一标识符
    const id = `__symbol_${_symbolCounter++}_${Date.now()}`
    
    // 创建Symbol对象
    const symbol = Object.create(Symbol.prototype)
    
    // 设置描述
    Object.defineProperties(symbol, {
      '__description__': {
        value: description,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__id__': {
        value: id,
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    
    return symbol
  }
  
  // 重写toString方法
  Symbol.prototype.toString = function() {
    return `Symbol(${this.__description__})`
  }
  
  // 添加valueOf方法
  Symbol.prototype.valueOf = function() {
    return this
  }
  
  // 添加Symbol.for和Symbol.keyFor方法
  const _symbolRegistry = {}
  
  Symbol.for = function(key) {
    if (_symbolRegistry[key]) {
      return _symbolRegistry[key]
    }
    
    const symbol = Symbol(key)
    _symbolRegistry[key] = symbol
    return symbol
  }
  
  Symbol.keyFor = function(symbol) {
    for (const key in _symbolRegistry) {
      if (_symbolRegistry[key] === symbol) {
        return key
      }
    }
    return undefined
  }
  
  // 添加常用的Symbol值
  Symbol.iterator = Symbol('Symbol.iterator')
  Symbol.hasInstance = Symbol('Symbol.hasInstance')
  Symbol.toStringTag = Symbol('Symbol.toStringTag')
  
  // 将Symbol添加到全局对象
  window.Symbol = Symbol
  
  console.log('Symbol polyfill 初始化完成')
}