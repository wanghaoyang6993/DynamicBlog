<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setTheme } from './utils/switchTheme';
import { addViewCount } from './request/api';

export default {
  data() {
    return {
      
    }
  },
  created() {
    //检测登录信息
    this.$store.dispatch('getUserInfo')
  },
  mounted() {
    setTheme();
    document.getElementById("notify").style.display = 'none'
    addViewCount()
  }
}

</script>

<style scoped>
#app {
  background-image: var(--underlying-bg);
  background-size: cover;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
