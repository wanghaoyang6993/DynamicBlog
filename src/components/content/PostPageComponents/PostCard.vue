<template>
  <div class="cardContainer" tabIndex="1">
    <div class="imgContainer" ref="cover" :style="bg"></div>
    <div class="rightPart">
      <div class="title" :class="{smallTitle:isWindowSmall,bigTitle:!isWindowSmall}">{{ showData.title }}</div>
      <div class="content">
        <p :class="{smallp:isWindowSmall,bigp:!isWindowSmall}" ref="content" v-html="showData.content">
        </p>
      </div>
      <div class="date">{{ showData.createDate }}</div>
    </div>
    <el-dropdown class="setting" @command="handleCommand" v-if="$store.state.currentUserInfo">
        <span class="el-dropdown-link iconfont icon-edit">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">
            <span class="iconfont icon-icon"></span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :modal-append-to-body="false"
      v-if="dialogVisible">
      <span>确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return { 
      showData: {
        title: null,
        imgSrc: null,
        content: null,
        date: null
      },
      isWindowSmall:false,
      dialogVisible: false,
      bg:{}
    }
  },
  props: {
    postData:Object,
  },
  methods: {
    resize() {
      if(document.body.clientWidth <= 1080) {
        this.isWindowSmall = true;
      }else {
        this.isWindowSmall = false;
      }
    },
    handleDel() {
      this.dialogVisible = false
      this.$emit('handleDel');
    },
    formatDate(date) {
      let d = new Date(date);
      let month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
      let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
      let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      return [d.getFullYear(), month, day].join('-') + ' ' + hours + ':' + minutes;
    },
    handleClose() {
      this.$confirm('确认关闭？')
        .then(() => {
          // console.log("111")
        })
        .catch(() => {
          // console.log(false)
        });
    },
    handleCommand(command) {
      if(command === 'a') {
        this.dialogVisible = true
      }else {
        this.dialogVisible = true
      }
    }
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    })
  },
  watch: {
    postData: {
      handler() {
        this.showData = this.postData;
        this.showData.createDate = this.formatDate(this.showData.createDate)
        this.bg = {backgroundImage: `url(${this.showData.cover})`}
        this.showData.content = '&emsp;&emsp;' + this.showData.content;
        this.showData.content = this.showData.content.replaceAll('\\r\\n',"</br></br>&emsp;&emsp;")
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
* {
  transition: .6s;
}
.cardContainer {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  background-color: var(--infocard-bg-color);
  border-radius: 10px;
  box-shadow: 1px 1px 1px var(--infocard-bg-color);
  color: var(--font-color);
  padding: 0 15px;
  cursor: pointer;
  transition: .3s;
}

.cardContainer:hover {
  background-color: var(--infocard-active-color);
  transition: .3s;
}
/**
  通过:focus伪类来实现动态展开效果
*/
.cardContainer:focus:hover {
  background-color: var(--infocard-active-color);
  cursor:auto;
}

.cardContainer:focus {
  background-color: var(--infocard-active-color);
  flex-flow: column;
  flex-direction: column-reverse;
  height: 100%;
  opacity: 1;
  z-index: 9;
  transition: .3s;
}

.cardContainer:focus .rightPart p {
  height: 18vw;
  top: 10%;
  line-height: 1.5vw;
  display:block;
  overflow: scroll;
  transition: .3s;
}

.cardContainer:focus .rightPart .content {
  flex: 4;
  top: 25%;
  display:block;
  transition: .3s;
}

.cardContainer:focus .rightPart {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  flex-flow: column;
}

.cardContainer:focus .title {
  flex: 1;
}

.cardContainer:focus .imgContainer {
  display: none;
}

.cardContainer p::-webkit-scrollbar {
    width: 5px;
}

.cardContainer p::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
}

.imgContainer {
  /*竖屏照片显示效果不好 */
  display: inline-block;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  width: 40%;
  height: 70%;
  overflow: hidden;
  margin: auto;
}

/* .imgContainer img {
  height: 100%;
} */

.rightPart {
  position: relative;
  flex: 1;
  height: 70%;
  margin: auto;
}

.title {
  position: absolute;
  font-size: 1.5vw;
  left: 5%;
}

.smallTitle {
  top: 18%;
}

.bigTitle {
  top: 10%;
}

.content {
  position: absolute;
  top: 36%;
  left: 5%;
  font-size: 1vw;
}

.content p {
  display: -webkit-box;
  text-align: start;
  text-overflow: ellipsis;
  overflow:hidden;
  -webkit-box-orient: vertical;
  transition: .3s;
}

.bigp {
  -webkit-line-clamp:4;
  line-height: 1.2vw;
}

.smallp {
  line-height: 1.8vw;
  text-overflow: ellipsis;
  -webkit-line-clamp:3;
}

.date {
  position: absolute;
  top: 90%;
  left: 60%;
  font-size: .9vw;
}

.setting {
    position: absolute;
    top: .7vw;
    right: 1vw;
    color: var(--font-color);
}

.setting:hover {
  cursor: pointer;
  scale: 1.5;
}
</style>