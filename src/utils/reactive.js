

class Vue {
  constructor(options) {
    new Watcher()
    this._data = options.data
  }
}




class Dep {

  constructor() {

    this.subs = []
  }

  add(depend) {
    this.subs.push(depend)
  }

  notify() {
    this.subs.forEach((item, index) => {
      // 执行更新方法 
      Dep.target.update(item)
    })
  }

}

Dep.target = null

class Watcher {

  constructor() {
    if (Dep.target) {
      Dep.target = this
    }
  }

  update() {

  }

}