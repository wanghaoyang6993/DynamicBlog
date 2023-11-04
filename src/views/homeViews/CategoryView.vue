<template>
  <div class="categoryView">
    <category-list-item 
      class="categoryListItem"
      v-for="data in DataList" 
      :key="data.id"
      :data="data"
      @click.native="categoryClick(data.id)"/>
    <pagination-bar 
      class="paginationBar"
      :totalPosts="total"
      :pageSize="pageInfo.pageSize"
      @nextPage="nextPage" 
      @prevPage="prevPage"
      @changePage="changePage"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/content/articlePageComponents/CategoryListItem.vue'
import PaginationBar from '@/components/content/PostPageComponents/PaginationBar.vue';
import {getCategories, getCategoriesNum} from '@/request/api'

export default {
  data() {
    return {
      pageInfo: {
        page:1,
        pageSize:4,
      },
      total: 0,
      DataList: [],
    }
  },
  methods: {
    getCategoryList(pageInfo) {
      getCategories({
        ...pageInfo
      }).then(res => {
        this.DataList = res.data;
      })
    },
    prevPage() {
      this.pageInfo.page--;
      this.getCategoryList(this.pageInfo);
    },
    nextPage() {
      this.pageInfo.page++;
      this.getCategoryList(this.pageInfo);
    },
    changePage(page) {
      this.pageInfo.page = page;
      this.getCategoryList(this.pageInfo);
    },
    categoryClick(id) {
      window.localStorage.setItem("currentCategoryId",id);
      this.$router.push('/articleList');
    }
  },
  mounted() {
    this.getCategoryList(this.pageInfo)
    getCategoriesNum().then(res => {
      // console.log(res)
      this.total = res.total;
    })
  },
  components: {
    CategoryListItem,
    PaginationBar
  },
}
</script>

<style scoped>
.categoryView {
  display: flex;
  flex-flow: column;
  justify-content:flex-start;
  width: 100%;
  height: 80%;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--infocard-bg-color);
}

.categoryListItem {
  width: 100%;
  height: 23.5%;
}

.paginationBar {
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 93.5%;
  height: 6%; */
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  top: 94%;
  width: 100%;
  height: 6%;
}
</style>