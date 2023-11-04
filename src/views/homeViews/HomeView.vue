<template>
  <div class="homeContainer">
    <transition name="infoFade">
      <div v-if="infoShow" 
        class="infoPageContainer" 
        @mousewheel.prevent="changeDown"
        key="info">
        <div class="info">
          小何的世界
        </div>
        <div class="triangleDownContainer" @click="changeDown">
          <div class="triangleDown"></div>
        </div>
      </div>
    </transition>
    <transition name="contentFade">
      <div class="home" 
        ref="home" 
        v-show="contentShow"
        key="content">
        <div class="triangleUpContainer" @click="changeUp">
          <div class="triangleUp"></div>
        </div>
        <home-content/>
        <beian class="beianInfo"/>
      </div>
    </transition>
    <theme-toggle/>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
// import smoothScroll from '@/utils/smoothScroll';
import homeContent from '@/views/homeViews/HomeContentView.vue';

import ThemeToggle from '@/components/common/ThemeToggle.vue';
import beian from '@/components/common/BeianInfo.vue'


export default {
  name: 'HomeView',
  data(){
    return {
      listData: [],
      page: 1,
      pageSize: 10,
      totalNum: 1,
      infoShow: true,
      contentShow: false
    }
  },
  methods: {
    changeDown() {
      this.infoShow = false
      this.contentShow = true
    },
    changeUp() {
      this.infoShow = true
      this.contentShow = false
    }
  },
  components: {
    homeContent,
    beian,
    ThemeToggle
}
}
</script>

<style scoped>

  .homeContainer {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: var(--underlying-bg);
    background-color: transparent;
    background-repeat: repeat;
    background-size: cover;
  }

  .info{
    position: absolute;
    color: var(--title-color);
    font-size: 30px;
    /* opacity: 0.9; */
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    transition: .7s;
  }
  .triangleDownContainer {
    position: absolute;
    width: 100px;
    height: 50px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    cursor: pointer;
  }
  .triangleDown {
    position: absolute;
    left: 50%;
    width: 20px;
    height: 20px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    transform: translateX(-50%) rotate(45deg);
  }
  .triangleDown:hover {
    transform: translateX(-50%) rotate(45deg) scale(1.2);
    transition: .8s;
  }

  .triangleUpContainer {
    position: absolute;
    width: 100px;
    height: 50px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    cursor: pointer;
    /* 防止被homeContent覆盖 */
    z-index: 9;
    
  }

  .triangleUp {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 20px;
    height: 20px;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    transform: translateX(-50%) rotate(45deg);
  }

  .triangleUp:hover {
    transform: translateX(-50%) rotate(45deg) scale(1.2);
    transition: .8s;
  }

  .temp {
    display: none;
  }

  .infoPageContainer {
    position: relative;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .home{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0.95;
    /* background: linear-gradient(rgb(20, 22, 17),30%, var(--underlying-bg-color)); */
  }

  .beianInfo {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .contentFade-enter-active, .contentFade-leave-active {
    transition: 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .contentFade-enter, .contentFade-leave-to {
    opacity: 0;
    transform: translateY(100vh);
  }
  .contentFade-enter-to, .contentFade-leave {
    transform: translateY(0);
    opacity: 1;
  }
  .infoFade-leave-active, .infoFade-enter-active {
    transition: 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .infoFade-leave, .infoFade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .infoFade-leave-to, .infoFade-enter {
    transform: translateY(-100vh);
    opacity: 0;
  }

  
</style>