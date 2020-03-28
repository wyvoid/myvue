<template>
<div class="hello" @mousemove="throttle(testThrottle, 2000)('this is throttle 1')">

  <div class="divv">
    沙士大夫
  </div>
  <div>
    程序水电费
  </div>
  <input type="text">
  <button @click="debounce(testDebounce, 3000)('按钮 1 触发')">debounce click test</button>
</div>
</template>

<style scoped lang="less">

  @keyframes anima1{
    from{
      margin-left: -100px;
      background: green;
    }
    40%{
      background: orange;
      transform: translateY(30px) rotate(720deg);
    }
    60%{
      background: blue;
    }

    to{
      margin-left: 100%;
      background: red;
      transform: translateY(-100px);
    }
  }
  


  .hello{
    border: 1px solid #890;
    overflow: hidden;
  }

  .divv{
    background: #ddf;
    width: 100px;
    height: 100px;
    border-radius: .5rem;
    transition: all 2s linear, all 3s ease-in;
    animation: anima1 3s linear 2 1s;
  }

  .divv:active{
    background: #000;
    border-radius: 50%;
    width: 300px;
    height: 200px;
    color: red;
    color: white;
    opacity: .5;
  }

  input{
    background: green;
    background-color: red;
    width: 100px;
    transition: background-color .5s ease-in, width 1s ease 99999s;
  }
  input:focus{
    width: 200px;
    background-color: orange;
    transition: width 3s linear;
  }

  @media only screen and (max-width: 900px) {
    .divv{
      background: #000;
      border-radius: 50%;
      width: 300px;
      height: 200px;
      color: red;
      color: white;
      opacity: .5;      
    }
  }

</style>

<script>
import debounce from '../utils/debounce'
import throttle from '../utils/throttle'
export default {
  name: 'index',
  data () {
    return {

    }
  },
  mounted() {
  
  }, 
  methods: {
    debounce,
    throttle,
    testDebounce(msg) {
      console.log('debouce trigger:', msg)
    },
    testThrottle(msg) {
      console.log('throttle trigger:', msg)
    }
  }
}
</script>

