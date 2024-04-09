<template>
  <div class="homeContent">
    <blogger-info 
      class="bloggerInfo"
      />
    <latest-articles class="latestArticles"/>
    <nav-bar class="navBar"/>
    <aside-content class="asideContent"/>
    <transition 
      name="fade"
      mode="out-in"
      enter-from-class="fade-enter">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import BloggerInfo from '@/components/content/homeComponents/BloggerInfo.vue';
import LatestArticles from '@/components/content/homeComponents/LatestArticles.vue';
import NavBar from '@/components/content/homeComponents/NavBar.vue';
import AsideContent from '@/components/content/homeComponents/AsideContent.vue';



export default {
  computed: {
    // isLogin() {
    //   return this.$store.getters.isLogin
    // }
  },
  components: {
      BloggerInfo,
      LatestArticles,
      NavBar,
      AsideContent,
    }
}
</script>

<style scoped>
.homeContent {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 500px;
}

.bloggerInfo {
  position: absolute;
  top: 14%;
  left: 8.5%;
}

.unfoldCard {
  position: absolute;
  left: 30.5%;
  top: 22%;
  z-index: 9;
}

.latestArticles{
  position: absolute;
  top: 31%;
  left: 8.5%;
}

.navBar {
  position: absolute;
  top: 14%;
  left: 30.5%;
}

.pagenationBar {
  position: absolute;
  top: 85%;
  left: 30.5%;
}

.asideContent {
  position: absolute;
  top: 14%;
  left: 72.5%;
}

.postPage {
  position: absolute;
  width: 40%;
  height: 67%;
  top: 22%;
  left: 30.5%;
  
}

.albumCard {
  position: absolute;
  width: 40%;
  height: 67%;
  top: 22%;
  left: 30.5%;
  overflow-x: hidden;
  overflow-y: auto;
}

.homeContent >>> .categoryView {
  position: absolute;
  width: 40%;
  height: 67%;
  top: 22%;
  left: 30.5%;
}

.homeContent >>> .messageBoard {
  position: absolute;
  width: 40%;
  height: 67%;
  top: 22%;
  left: 30.5%;
}

.homeContent >>> .aboutMe {
  position: absolute;
  width: 40%;
  height: 67%;
  top: 22%;
  left: 30.5%;
}

/**路由切换动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}



  .homeContent >>> .albumCard::-webkit-scrollbar {
      width: 0;    
      height: 4px;
      border-radius: 15px;
      padding: 10px 0;
  }
  .homeContent >>> .albumCard::-webkit-scrollbar-thumb {
      border-radius: 10px;
      height: 4px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
      background: rgba(0,0,0,0.1);
      border-radius: 15px;
      padding: 10px 0;
  }
  .homeContent >>> .albumCard::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
      border-radius: 0;
      height: 4px;
      background: rgba(0,0,0,0);
      border-radius: 15px;
      padding: 10px 0;
  }

  .homeContent >>> .albumCard::-webkit-scrollbar-corner {
      background-color: var(--infocard-bg-color);
      border-radius: 15px;
      height: 4px;
      padding: 10px 0;
      background-color: transparent;
  }

</style>