<template>
  <ul class="navBar">
    <router-link v-for="(option,index) in barOptions" 
        :key="index" 
        :class="{active:index===activeIndex}"
        @click.native="clickBar(index)"
        :to="option.value">
      {{ option.name }}
    </router-link>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      barOptions: [
        {name: "首页动态", value:"/"},
        {name: "相册", value:"/album"},
        {name: "文章", value:"/category"},
        {name: "留言墙", value:"/messageBoard"},
        {name: "关于我", value:"/aboutMe"},
      ],
      activeIndex: 0
    }
  },
  methods: {
    clickBar(index) {
      this.activeIndex = index;
    }
  },
  mounted() {
    const path = this.$route.path.split("/")[1]
    
    switch(path) {
      case "":
        this.activeIndex = 0;
        break;
      case "album":
        this.activeIndex = 1;
        break;
      case "category":
        this.activeIndex = 2;
        break;
      case "messageBoard":
        this.activeIndex = 3;
        break;
      case "aboutMe":
        this.activeIndex = 4;
        break;
    }
  }
}
</script>

<style scoped>
a {
	text-decoration: none; /* 去除默认的下划线 */
	outline: none;	/* 去除旧版浏览器的点击后的外虚线框 */
	color: var(--font-color);	/* 去除默认的颜色和点击后变化的颜色 */ 
}


.navBar {
  display: flex;
  justify-content: space-around;
  width: 40%;
  height: 5%;
  border-radius: 8px;
  background-color: var(--infocard-bg-color);
  overflow: hidden;
}

.navBar a {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-size: 50%;
  cursor: pointer;
  color: var(--font-color);
}

.navBar a:hover {
  transition: .3s;
  background-color: var(--infocard-active-color);
}

.active {
  background-color: var(--infocard-active-color);
}
</style>