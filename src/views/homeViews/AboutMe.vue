<template>
  <div class="aboutMe">
    <img id="avater" src="http://blog.theluckyone.top/55925afc-7142-4ed8-a5ea-f6979bfc49dc.jpg" alt="">
    <div class="container">
      <p>Hello! 我是小何</p><br>
      <p>家在山西，今年大四，现在在武汉实习</p><br>
      <p>平时更新比较慢</p><br>
      <p>找我请联系：Q2320554377</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.aboutMe {
    /* display: flex; */
    position: relative;
    background-color: var(--infocard-bg-color);
    border-radius: 15px;
}

#avater {
  position: absolute;
  left: 3vw;
  top: 13vh;
  width: 10vw;
  border-radius: 10px;
}

.container {
  position: absolute;
  top: 20vh;
  right: 5vw;
  width: 20vw;
  color: var(--font-color);
}
 
</style>