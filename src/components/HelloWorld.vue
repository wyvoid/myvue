<template>
  <div class="hello">
    <div style="position: fixed; top:0;left:0;width:100%;">
      <div class="flex-box">
        <input type="text" v-model="token" class="token-input">
        <button class="clear" @click="myreceive(token)">开始抢1</button>
      </div>
      <div class="flex-box">
        <input type="text" v-model="token2" class="token-input">
        <button class="clear" @click="myreceive(token2)">开始抢2</button>
      </div>
      <div class="box">
        <button style="width: 100px;height:100px" @click="startInterval()">开始所有</button>
        <button style="width: 100px;height:100px" @click="clearAllInterval()">停止所有</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      token: '30ec14c9-7c34-4d5a-8bcc-c63844a87a4b',  // 2789
      token2: 'c40ee4eb-92cd-44f8-b005-8315a60340d2', // 4988
      dataAll: {
        appSubjectTempVos: []
      },
      intervalArr: []
    }
  },
  mounted() {
    this.init(this.token)
  }, 
  methods: {
    startInterval() {
      this.myreceive(this.token)
      this.myreceive(this.token2)
    },
    myreceive(token) {
      var arr = this.dataAll.appSubjectTempVos[2].itemList
      // var arr0 = this.dataAll.appSubjectTempVos[4].itemList
      // if (arr0 && arr) {
      //   arr = arr.concat(arr0)
      // }
      debugger
      if (!arr) return
      let inter = setInterval(()=> {
        arr.forEach((item, index) => {
          if (!item) return
          this.takeTicketT(token, item.recordLink)
        })
      }, 10)
      this.intervalArr.push(inter)
      console.log('push an inter------------------------------:'+inter)
      let tout = setTimeout(() => {
        console.log('clear an inter------------------------------:'+inter)
        clearInterval(inter)
        clearTimeout(tout)
      }, 10000)
    },
    clearAllInterval() {
      this.intervalArr.forEach(item => {
        console.log('clear interval item:'+ item)
        clearInterval(item)
      })
    },
    init(token) {
      let params = {
        token: token || this.token,
      }
      this.$http.get('/social/subject/topic/temp/search/two/uVFleYFHDfhUHJqasuga', params).then(res=> {
        this.dataAll = res.data
      })
    },
    takeTicketT(token, ticketId) {
      let params = {
        couponCode: ticketId,
        signature: '',
        token: token || this.token,
      }
      this.$http.post('/activity/member/coupon/page/receive', params).then(res=> {
        console.log(`time: ${new Date()}::: ${Date.now()}, token: ${token}||`, res.reason)
      })      
    }
  }
}
</script>
<style scoped>

.box{
  box-sizing: border-box;
  width: 400px;
  padding: 50px;
  margin: 50px;
  border: 1px solid;
  background: #ccc;  
}

.flex-box {
  display: flex;
  margin-bottom: 10px;
}
.token-input{
  width: 80%;
  height: 60px;
}
.clear{
  flex: 1;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
