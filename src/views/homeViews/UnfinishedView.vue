<template>
  <div class="unfinishedCard">
    <div class="infoContainer">
        <div class="iconfont icon-houqiweihuweihuweihuguanli icon"></div>
        <div class="content">该功能页正在开发中，敬请期待哦~~</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.unfinishedCard {
    display: flex;
    background-color: var(--infocard-bg-color);
    border-radius: 15px;
}
.infoContainer {
    margin: auto;
    width: 300px;
    height: 300px;
    color: var(--font-color);
}

.iconfont {
  font-size: 7vw;
  margin-bottom: 5vw;
  font-weight: bolder;
}

.content {
  font-size: 1.2vw;
  font-weight: bolder;
}
</style>