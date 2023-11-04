<template>
    <ul class="latestContainer">
        <li 
            v-for="item in listData"
            :key="item.id" 
            class="latestArticle"
            @click="click(item.id)">
                <h3 class="articleTitle">{{ item.title }}</h3>
                <span class="summary">{{ item.summary }}</span>
                <span class="date">{{ item.createDate }}</span>
        </li>
    </ul>
</template>

<script>
import { getRecent } from '@/request/api';

export default {
    data() {
        return {
            listData: []
        }
    },
    methods: {
        click(id) {
            // window.localStorage.setItem("currentArticleId", id)
            this.$router.push("/article/" + id);
        }
    },
    mounted() {
        getRecent().then(res => {
            this.listData = res.data;
        })
    }
}
</script>

<style scoped>
    .latestContainer {
        display: flex;
        width: 20%;
        height: 58%;
        flex-flow: column;
        border-radius: 10px;
        background-color: var(--infocard-bg-color);
        box-shadow: 1px 1px 1px var(--infocard-bg-color);
        overflow: hidden;
    }

    .latestContainer .latestArticle:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .latestArticle {
        position: relative;
        flex-basis: 20%;
        width: 100%;
        height: 100%;
        color: var(--font-color);
        cursor: pointer;
    }

    .latestArticle:hover {
        background-color: var(--infocard-active-color);
        opacity: 0.8;
        transition: .3s;
    }

    .latestArticle h3 {
        position: absolute;
        top: 20%;
        left: 15%;
        font-size: 1vw;
        max-width: 40%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .summary {
        position: absolute;
        text-align: left;
        width: 80%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        top: 65%;
        left: 15%;
        font-size: .9vw;
    }

    .date {
        position: absolute;
        top: 20%;
        left: 58%;
        font-size: .8vw;
    }

</style>