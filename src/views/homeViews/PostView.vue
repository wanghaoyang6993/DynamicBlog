<template>
  <div class="postPage">
    <div v-for="(post,index) in postData" :key="post.id" class="cardContainer">
      <post-card 
        :postData="post" 
        :class="{infoCardOne:index===0,infoCardTwo:index===1,activeCard:index===activeCard}"
        @click.native="cardClick(index)"
        @handleDel="handleDel(post.id)"/>
    </div>
    <pagination-bar class="pagenationBar" 
      @nextPage="nextPage" 
      @prevPage="prevPage"
      @changePage="changePage"
      :totalPosts="totalPosts"
      :page-size="pageInfo.pageSize"/>
  </div>
</template>

<script>
import PostCard from '@/components/content/PostPageComponents/PostCard.vue';
import PaginationBar from '@/components/content/PostPageComponents/PaginationBar.vue'
import {getPost, getTotalPost, deletePost} from '@/request/api'
import { Message } from 'element-ui';

export default {
    data() {
        return {
        postData: [],
        pageInfo: {
            page:1,
            pageSize:2
        },
        totalPosts:0,
        activeCard:0,
        }
    },
    methods: {
        getPage(pageInfo) {
            getPost({
                ...pageInfo
            }).then(res => {
                // console.log(res.data)
                this.postData = res.data;
            })
        },
        nextPage() {
            this.pageInfo.page++;
            this.getPage(this.pageInfo);
        },
        prevPage() {
            this.pageInfo.page--;
            this.getPage(this.pageInfo);
        },
        changePage(page) {
            this.pageInfo.page = page;
            this.getPage(this.pageInfo);
        },
        cardClick(index) {
            this.activeCard = index;
        },
        handleDel(id) {
            deletePost("post/" + id).then(res => {
                if(res.success) {
                    Message({
                        message:'删除成功！',
                        type:'success'
                    })
                    location.reload()
                }
            })
        }
    },
    mounted() {
        this.getPage(this.pageInfo);
        
        getTotalPost().then(res => {
            this.totalPosts = res.total
        });
    },
    components: {
        PostCard,
        PaginationBar
    }
}
</script>

<style scoped>
.postPage {
    position: relative;
}

.activeCard {
    z-index: 99;
}

.infoCardOne {
    position: absolute;
    top: 0;
    width: 100%;
    height: 44%;
    z-index: 1;
}

.infoCardTwo {
    position: absolute;
    top: 46.8%;
    width: 100%;
    height: 44%;
    z-index: 1;
}

.infoCardTwo:focus {
    top: 0%;
}

.pagenationBar {
    position: absolute;
    top: 94%;
    width: 100%;
    height: 6%;
}


</style>