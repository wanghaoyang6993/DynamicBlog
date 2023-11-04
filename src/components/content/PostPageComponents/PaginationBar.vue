<template>
    <div class="pagenation">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="changePage">
      </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      total:0,
      size:0
    }
  },
  props: {
    totalPosts:Number,
    pageSize:Number
  },
  methods: {
    prevClick() {
      this.$emit('prevPage')
    },
    nextClick() {
      this.$emit('nextPage')
    },
    changePage(page) {
      this.$emit('changePage',page)
    }
  },
  watch: {
    totalPosts: {
      handler() {
        this.total = this.totalPosts
      },
      immediate:true
    },
    pageSize: {
      handler() {
        this.size = this.pageSize
      },
      immediate:true
    },
  }
}
</script>

<style scoped>
.pagenation {
    /* width: 40vw; */
    /* height: 4%; */
    background-color: var(--infocard-bg-color);
    border-radius: 5px;
    box-shadow: 1px 1px 1px var(--infocard-bg-color);
  }

  .pagenation >>> .el-pagination  .btn-prev,.pagenation >>> .el-pagination .btn-next {
    background-color: var(--infocard-bg-color);
  }

.pagenation >>> .el-pagination .el-icon-arrow-right ,
.pagenation >>> .el-pagination .el-icon-arrow-left ,
.pagenation >>> .el-pagination .el-pager .number {
  color: var(--font-color);
  /* background-color: none; */
}

</style>