export default function(fn, timeWait=1000) {
  console.log('发抖开始啦')
  return function() {
    let args = [].slice.call(arguments)

    if (fn.timerId) {
      clearTimeout(fn.timerId)
      fn.timerId = null
    }
    fn.timerId = setTimeout(_ => {
      fn(...args)
    }, timeWait)
  }
}