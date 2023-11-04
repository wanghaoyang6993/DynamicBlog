<template>
  <div class="backTop" @click="topClick">
    <span class="iconfont icon-huidaodingbu"></span>
  </div>
</template>

<script>
	export default {
		name: "BackTop",
    methods: {
      topClick() {
        this.$emit('backTop')
      }
    }
	}
</script>

<style scoped>
  .backTop {
    text-align: center;
    line-height: 4vw;
    width: 4vw;
    height: 4vw;
    background-color: var(--infocard-bg-color);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
    opacity: .7;
    cursor: pointer;
  }

  .backTop:hover {
    background-color: var(--infocard-active-color);
  }

  .icon-huidaodingbu {
    font-size: 2.5vw;
    color: var(--font-color);
  }
</style>
