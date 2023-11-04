<template>
  <div class="hotArticleWrapper">
    <p class="cpnTitle">最热文章🔥</p>
    <div class="hotArticleContainer">
        <div class="article" v-for="article in articles" :key="article.id" @click="handleClick(article.id)">
            <p class="title">{{ article.title }}</p>
            <p class="summary">{{ article.summary }}</p>
            <p class="createDate">{{ article.createDate }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { getHotArticles } from '@/request/api'

export default {
    data() {
        return {
            articles:[]
        }
    },
    mounted() {
        getHotArticles().then(res => {
            this.articles = res.data
        })
    },
    methods: {
        handleClick(id) {
            this.$router.push('/article/' + id)
        }
    }
}
</script>

<style scoped>

.hotArticleWrapper {
    margin:7%
}

.cpnTitle {
    text-align: left;
    font-size: 1.2vw;
    color: var(--font-color);
    margin-bottom: 1vw;
}

.cpnTitle::after {
    content: '';
    display: inline-block;
    width: 10vw;
    height: 1px;
    background-color: rgba(255, 255, 255, .2);
}

.hotArticleContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;

}

.article {
    position: relative;
    width: 46%;
    height: 15vh;
    padding: 5%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
    border-radius: 15px;
    color: var(--font-color);
    cursor: pointer;
    margin-bottom: 10px;
}

.article:hover {
    background-color: var(--infocard-active-color);
}

.title {
    font-size: .8vw;
    text-align: left;
}

.summary {
    transform: scale(.9);
    width: 100%;
        /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
        display: -webkit-box;
        /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
        -webkit-box-orient:vertical;
        /*要显示的行数*/
        -webkit-line-clamp:2;
        /* 溢出部分隐藏 */
        overflow:hidden;
        font-size: .9vw;
        margin: 10% 0;
        text-indent: 2em;
        text-align: left;
        line-height: 120%;
}

.createDate {
    position: absolute;
    transform: scale(.7);
    font-size: .9vw;
    bottom: 10%;
    right: 0;
}
</style>