<!--
 * @Author: Tango
 * @Date: 2021-09-08 10:27:55
 * @LastEditTime: 2021-12-17 10:37:48
 * @LastEditors: Tango
 * @Description: 
 * @FilePath: \vite-todolist\src\views\demo.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="main">
    <div class="dialog">
      <div class="header item">
        <div class="flex">日期</div>
        <div class="flex">活动</div>
        <div class="flex">奖励</div>
      </div>
      <div class="item">
        <div class="flex">9月21日</div>
        <div class="flex">登录领积分</div>
        <div class="flex reward"><span class="text">满500减125代金券</span></div>
      </div>
      <canvas id="canvas" width="500px"></canvas>
      <p :style="{ color: `rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]})` }">主题色</p>
    </div>
  </div>
</template>

<script>
import colorthief from 'colorthief'
export default {
  name: 'demo',
  data() {
    return {
      colorArr: []
    }
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')
    let img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    img.onload = () => {
      let scale = canvas.width / img.width
      let height = img.width > canvas.width ? img.height * scale : img.height
      canvas.height = height
      let colorThief = new colorthief()
      this.colorArr = colorThief.getColor(img)
      context.drawImage(img, 0, 0, img.width > canvas.width ? canvas.width : img.width, height)
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  .dialog {
    width: 290px;
    margin: 50px auto;
    background-color: #fff;
  }
}
.item {
  display: flex;
  justify-content: space-between;
  .flex {
    flex: 1;
    text-align: center;
  }
  .reward {
    position: relative;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      word-break: keep-all;
    }
  }
}
</style>
