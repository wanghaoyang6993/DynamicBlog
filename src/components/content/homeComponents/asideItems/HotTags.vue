<template>
  <div class="tagWrapper">
    <p class="title">常用标签🔥</p>
    <div class="tagContainer">
        <div class="tag" v-for="tag in tags" :key="tag.tagName">
            {{ tag.tagName }}
        </div>
    </div>
    
  </div>
</template>

<script>
import { getHotTag } from '@/request/api'

export default {
    data() {
        return {
            tags:[]
        }
    },
    mounted() {
        getHotTag().then(res => {
            this.tags = res.data
        })
    }
}
</script>

<style scoped>
.tagWrapper {
    margin: 7%;
}

.title{
    text-align: left;
    font-size: 1.2vw;
    color: var(--font-color);
    margin-bottom: 1vw;
}

.title::after {
    content: '';
    display: inline-block;
    width: 10vw;
    height: 1px;
    background-color: rgba(255, 255, 255, .2);
}

.tagContainer {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.tag {
    display: inline-block;
    padding: 5px;
    font-size: .7vw;
    border-radius: 10%;
    user-select: none;
}

.tag {
    border: 1px solid #FFBB46;
    color: #FFBB46;
}

.tag:hover {
    background-color: var(--infocard-active-color);
}

/* .tag:nth-child(2) {
    border: 1px solid rgb(0, 255, 119);
    color: rgb(0, 255, 119);
}

.tag:nth-child(3) {
    border: 1px solid rgb(0, 145, 255);
    color: rgb(0, 145, 255);
}

.tag:nth-child(4) {
    border: 1px solid rgb(179, 0, 255);
    color: rgb(179, 0, 255);
}

.tag:nth-child(5) {
    border: 1px solid rgb(255, 12, 62);
    color: rgb(255, 12, 62);
} */
</style>