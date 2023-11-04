<template>
  <div class="articleListViewContainer">
    <pagination-table
    :dataList="listData"
    :totalNum="totalNum"
    @nextPage="nextPage"
    @prevPage="prevPage"
    @changePage="changePage"
    @toArticlePage="toArticlePage"
    class="paginationTable"/>
  </div>
</template>

<script>
import PaginationTable from '@/components/common/PaginationTable.vue'
import { getPaginationArticlesByCategoryId, getArticleNumByCategoryId } from '@/request/api';
export default {
    data(){
        return {
            listData: [],
            pageInfo: {
                page: 1,
                pageSize: 7,
            },
            totalNum: 1,
        }
    },
    methods: {
        nextPage() {
            this.clearTable();
            this.pageInfo.page++;
            this.getPages(this.pageInfo);
        },
        prevPage() {
            this.clearTable();
            this.pageInfo.page--;
            this.getPages(this.pageInfo);
        },
        changePage(val) {
            this.clearTable();
            this.pageInfo.page = val;
            this.getPages(this.pageInfo);
        },
        clearTable() {
            this.listData = []
        },
        getPages(pageInfo) {
            this.listData = [];
            getPaginationArticlesByCategoryId(`articles/category/${window.localStorage.getItem("currentCategoryId")}`,{
                ...pageInfo
            }).then(
                res => {
                    //要先清除一下，不然会导致数据叠加
                    this.clearTable();
                    //拆分数据
                    for(let item of res.data) {
                        let temp = {
                            id: item.id,
                            title: item.title,
                            author: item.author,
                            summary: item.summary,
                            createDate: item.createDate,
                            tags: []
                        }
                        for(let tag of item.tags) {
                            temp.tags.push(tag.tagName);
                        }
                        this.listData.push(temp);
                    }
                }
            )
        },
        toArticlePage(id) {
            // window.localStorage.setItem("currentArticleId",id);
            this.$router.push('/article/' + id);
        }
    },
    mounted() {
        const categoryId = window.localStorage.getItem("currentCategoryId");
        this.getPages(this.pageInfo)
        getArticleNumByCategoryId(`/articles/category/${categoryId}`).then(res => { 
            this.totalNum = res.data;
        })
    },
    components: {
        PaginationTable
    }
}
</script>

<style scoped>
.articleListViewContainer {
    position: relative;
    height: 100vh;
}

.paginationTable {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
}
</style>