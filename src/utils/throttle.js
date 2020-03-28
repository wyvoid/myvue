/**
 * 如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕
 * 
 * 用节流的方式合理减少调用频率, 同事又不影响实际效果
 * 
 * 当持续触发事件时，保证一定时间段内只调用一次事件处理函数
 * 流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，
 * 秉着勤俭节约的优良传统美德，我们要把水龙头关小点，最好是如我
 * 们心意按照一定规律在某个时间间隔内一滴一滴的往下滴。 
 */
export default function(fn, delay) {
  console.log('节流触发咯')
  return function(){
    var context = this
    var args = arguments
    if(!fn.timer){
      fn.timer = setTimeout(function(){
        fn.apply(context,args)
        fn.timer = null
      },delay)
    }
  }
}