<template>
    <div class="tableContainer">
        <el-table
        ref="filterTable"
        :data.sync="tableList"
        style="width: 100%"
        @row-click="toArticlePage">
        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="author"
            label="作者"
            width="180">
        </el-table-column>
        <el-table-column
            prop="summary"
            label="摘要">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="日期"
            width="180"
            column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          width="300"
          :filters="tagFilters"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <div v-for="(tag,index) in scope.row.tags"
                :key="tag"
                class="tagItem">
              <el-tag
                :type="index%2===0 ? 'primary' : 'success'"
                disable-transitions
              >{{tag}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 分页器 -->
      </el-table>
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          @next-click="nextClick"
          @prev-click="prevClick"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
    </div>
  </template>
  
  <script>

    export default {
      data() {
        return {
          tagFilters: [],
          tableList:[],
          total:1
        }
      },
      props:{
        dataList:Array,
        totalNum:Number
      },
      methods: {
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        filterTag(value, row) {
          return row.tags.indexOf(value)!==-1;
        },
        nextClick() {
          this.clearTable();
          this.$emit("nextPage")
        },
        prevClick() {
          this.clearTable();
          this.$emit("prevPage")
        },
        currentChange(val) {
          this.clearTable();
          this.$emit("changePage", val);
        },
        clearTable() {
          this.tableList = []
        },
        toArticlePage(row) {
          this.$emit("toArticlePage", row.id);
        }
      },
      watch: {
        dataList: {
          handler() {
            this.tableList = this.dataList
          },
          immediate:true
        },
        totalNum: {
          handler() {
            this.total = this.totalNum;
          },
          immediate:true
        }
      },
    }
  </script>

<style scoped>

.tableContainer >>> .el-pagination  .btn-prev,.tableContainer >>> .el-pagination .btn-next {
    background-color: var(--infocard-bg-color);
  }
  .tableContainer /deep/  .el-table, .el-table__expanded-cell {
      height: 80vh;
      background-color: transparent;
      color: var(--font-color);
      opacity: 1;
  }

  .tableContainer /deep/ .el-table tbody tr:hover>td {
      background-color:var(--infocard-active-color) !important;
      cursor: pointer;
  }

  .tableContainer /deep/ .el-table tr {
    background-color: transparent;
      height: 5vw;
      opacity: 1;
  }
  .tableContainer /deep/ .el-table th {
    background-color: transparent;
      
      color: var(--font-color);
      font-size: 1.2vw;
      opacity: 1;
  }
  .tableContainer /deep/ .el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;    
    /*height: 4px;*/
}
.tableContainer /deep/ .el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px !important;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2) !important;
    background: rgba(0,0,0,0.2) !important;
}
.tableContainer /deep/ .el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2) !important;
    border-radius: 0 !important;
    background: rgba(0,0,0,0.1) !important;
}

.tableContainer /deep/ .el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-corner {
    background-color: var(--infocard-bg-color) !important;
  }

  .tableContainer /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;

    opacity: 1;
  }

  .tableContainer >>> .el-table__row>td{ border: none; }
  .tableContainer .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }

  .tableContainer {
    padding:10px 50px;
    border-radius: 20px;
    background-color: var(--infocard-bg-color);
    opacity: 1;
    overflow: hidden;
  }

  .tagItem {
    display: inline-block;
    margin-right: 5px;
  }

  .pagination {
    margin-top: 8px;
  }
</style>