// 可遍历对象
// 如果想处理其他的可遍历对象，比如函数的 arguments，可加入此数组，便于维护
const iterations = [
    '[object Object]',
    '[object Array]',
    '[object Map]',
    '[object Set]',
  ]
  
  export const deepClone = (source, map = new WeakMap())=> {
    // 处理 null
    if (source === null) return source
  
    // 获取对象类型
    const type = Object.prototype.toString.call(source)
  
    // 处理不可遍历对象
    if (!iterations.includes(type)) {
      // 处理日期
      if (type === '[object Date]') return new Date(source)
  
      // 处理正则
      if (type === '[object RegExp]') return new RegExp(source)
  
      // 处理 Symbol
      if (type === '[object Symbol]') return Symbol(source.description)
  
      // 其他未处理的类型，一般是原始类型或函数，直接返回
      return source
    }
  
    // 处理可遍历对象
    // 创建 target 实例
    let target = new source.constructor() // {} | [] | Map(0) | Set(0)
  
    // 处理循环引用，防止死循环
    if (map.get(source)) {
      return source // 如果已经处理过，则直接返回，不再遍历
    } else {
      map.set(source, target)
    }
  
    // 处理 Map
    if (type === '[object Map]') {
      source.forEach((value, key) => {
        target.set(key, deepClone(value))
      })
      return target
    }
  
    // 处理 Set
    if (type === '[object Set]') {
      source.forEach(value => {
        target.add(deepClone(value))
      })
      return target
    }
  
    // 处理对象和数组
    for (const key in source) {
      target[key] = deepClone(source[key])
    }
    return target
  }