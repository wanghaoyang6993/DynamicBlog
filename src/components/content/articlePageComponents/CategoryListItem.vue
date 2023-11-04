<template>
  <div class="categoryListItem">
    <div class="avatar" :style="{backgroundImage: `url(${listData.avatar})`}"></div>
    <div class="rightPart">
        <div class="title">{{listData.categoryName}}</div>
        <div class="description">{{ listData.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            listData: {}
        }
    },
    props: {
        data:Object
    },
    watch: {
        data: {
            handler() {
                this.listData = this.data
            },
            immediate:true
        }
    }
}
</script>

<style scoped>
.categoryListItem {
    width: 100%;
    /* background-color: var(--infocard-bg-color); */
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    /* padding: 0 10px; */
    cursor: pointer;
    transition: .3s;
}

.categoryListItem:hover {
    background-color: var(--infocard-active-color);
}

.avatar{
  /*竖屏照片显示效果不好 */
  display: inline-block;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  width: 24%;
  height: 66%;
  overflow: hidden;
  margin: auto;
  background-color: #fff;
  border: 13px solid #fff;
  border-radius: 10px;
}

.rightPart {
    position: relative;
    width: 56%;
}

.title {
    position: absolute;
    top: 20%;
    color: var(--font-color);
    font-size: 1.5vw;
}

.description {
    position: absolute;
    top: 56%;
    color: var(--font-color);
    font-size: .8vw;
}

</style>