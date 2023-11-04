<template>
  <div class="lastReadWrapper">
    <p class="lastRead">上次阅读📕</p>
    <div class="article" v-if="id" @click="handleClick(id)">
        <p class="title">{{ title }}</p>
        <p class="summay">{{ summary }}</p>
    </div>
    <p class="noArticle" v-else>
        您的浏览器上没有阅读记录哦，快去看看文章吧！
    </p>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id: window.localStorage.getItem('lastArticleId'),
            title: window.localStorage.getItem('lastArticleTitle'),
            summary:  window.localStorage.getItem('lastArticleSummary')
        }
    },
    methods: {
        handleClick(id) {
            this.$router.push('/article/' + id)
        }
    }
}
</script>

<style scoped>

.lastReadWrapper {
    margin: 7%;
}
.lastRead {
    text-align: left;
    font-size: 1.2vw;
    color: var(--font-color);
    margin-bottom: 1vw;
}

.lastRead::after {
    content: '';
    display: inline-block;
    width: 10vw;
    height: 1px;
    background-color: rgba(255, 255, 255, .2);
}

.article {
    width: 100%;
    height: 11vh;
    padding: 5% 10%;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
    color: var(--font-color);
    cursor: pointer;
}

.article:hover {
    background-color: var(--infocard-active-color);
}

.title {
    font-size: 1vw;
    margin-bottom: 8%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.summay {
    font-size: .8vw;
    height: 2em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-indent: 1em;
}

.noArticle {
    color: var(--font-color);
    text-align: left;
    text-indent: 2em;
    padding-top: 20px;
    margin: 10px;
}
</style>