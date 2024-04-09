<template>
  <div class="articleContentContainer" id="articleContent" ref="articleContent">
    <div class="title">
      {{ articleData.title }}
    </div>
    <div class="authorNTime"> 
      {{ articleData.author }} 
      {{ articleData.createDate }}
      <span 
        class="iconfont icon-icon deleteIcon"
        v-if="isLogin"
        @click="dialogVisible=!dialogVisible"></span>
      <span class=" iconfont icon-edit editIcon" 
        v-if="isLogin"
        @click="handleEdit"></span>
    </div>
    <div class="content" v-html="htmlContent"></div>
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
    <theme-toggle/>
    <back-top @backTop="backTop" class="backtop"/>
  </div>
</template>

<script>
import { deleteArticle } from '@/request/api';
import { setTheme, changeTheme } from '@/utils/switchTheme';
import { Message, Loading} from 'element-ui';

import ThemeToggle from '@/components/common/ThemeToggle.vue';
import BackTop from '@/components/common/BackTop.vue';
import smoothScroll from '@/utils/smoothScroll';


export default {
  data() {
    return {
      articleData:{},
      content:'',
      catalog:[],
      dialogVisible:false,
      loadingInstance:null
    }
  },
  props: {
    article: {
      type: Object,
    },
    htmlContent: String
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    handleDel() {
      deleteArticle("articles/" + this.articleData.id).then(res => {
        if(res.code === 200) {
          Message({
                message:'删除成功！',
                type:'success'
              })
          this.$router.go(-1)
        }else {
          Message({
            message:'删除失败，重进一下试试呢！',
            type:'error'
          })
        }
        this.dialogVisible = false
      })
    },
    switchTheme() {
      changeTheme()
      setTheme()
    },
    handleClose() {
    },
    handleEdit() {
      this.$emit('edit')
    },
    backTop() {
      smoothScroll(0, document.getElementById('articleContent'))
    }
},
  watch: {
    article: {
      handler() {
        // this.loadingInstance?.close()
        this.articleData = this.article;
        // this.content = newVal.body;
      },
      immediate: true
    },
    htmlContent: {
      handler() {
        this.loadingInstance?.close()
      },
      immediate:true
    }
  },
  components: {
    ThemeToggle,
    BackTop
  },
  mounted() {
    let bgcolor = document.body.style.getPropertyValue("--infocard-bg-color")
    if(this.content === '') {
      this.loadingInstance = Loading.service({ fullscreen: true,background: bgcolor });
    }

    // console.log(this.$store.state.isLogin)
  }
}
</script>

<style scoped>
.backtop {
  position: fixed;
  bottom: 8%;
  right: 30%;
  z-index: 9999;
}

.editor {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.articleContentContainer {
  position: relative;
  background-color: var(--infocard-bg-color);
  line-height: 24px;
  font-size: 16px;
  text-align: left;
  overflow: scroll;
  padding: 2.5vw;
  color: var(--font-color);
  border-radius: 20px;
  border: 10px solid var(--infocard-bg-color);
  overflow-x: hidden;
}



.title{
  text-align: center;
  line-height: 3vw;
  font-size: 2.5vw;
  margin: 0 6vw;
}

.authorNTime {
  margin: 1vw 0 3vw 30vw;
  text-align: center;
  font-size: 1vw;
}

.content {
  width: 45vw;
  margin: 0 auto;
}

.content >>> .hljs {
  background-color: transparent;
  color: var(--font-color);
}

.content >>> p {
  margin: 1.5vw 0 0 0;
  width: 100%;
  text-indent: 2em;
  opacity: .9;
}

.content >>>li p {
  text-indent: 0;
}

.content >>> li {
  margin: 1.5vw 0 0 3vw;
  list-style:disc;
  opacity: .9;
}

.content >>> p:hover,.content >>> li:hover {
  opacity: 1;
}

.content >>> h1 {
  font-weight: normal;
  font-size: 2.3vw;
  line-height: 6vw;
  margin-top: 1.5vw;
}

.content >>> h2 {
  font-weight: normal;
  font-size: 2vw;
  line-height: 4vw;
  margin-top: 1.5vw;


}

.content >>> h3 {
  font-weight: normal;
  font-size: 1.6vw;
  line-height: 4vw;
  margin-top: 1.5vw;
}

.content >>> h4, .content >>> h5, .content >>> h6{
  font-weight: normal;
  font-size: 1.5vw;
  line-height: 4vw;
  margin-top: 1.5vw;
}

.content >>> .hljs-subst {
  color: rgb(255, 123, 0);
}

.content >>> .hljs-meta {
  color: #47a40a;
}

.content >>> pre{
  background-color: rgba(0,0,0,.2);
  border-radius: 15px;
  margin: 20px 0;
  margin-left: 0;
  padding: 20px;
  width: 45vw;
  overflow-x: scroll;
}

.content >>> pre::-webkit-scrollbar {
    width: 10px;    
    /*height: 4px;*/
}
.content >>> pre::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.content >>> pre::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}

.content >>> pre::-webkit-scrollbar-corner {
    background-color: var(--infocard-bg-color);
  }

.content >>> img {
  max-width: 50vw;
}

.content >>> a {
  color: var(--font-color);
}

.deleteIcon {
  cursor: pointer;
}

.editIcon {
  cursor: pointer;
  margin-left: .3vw;
}

.toggle {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    right: 28.5%;
    height: 10%;
    width: 15px;
    cursor: pointer;
    z-index: 999;
    transition: .3s;
  }

  .toggle .wire{
    background-color: orange;
    width: 1px;
    height: 100%;
  }

  .toggle .circle {
    height: 15px;
    width: 15px;
    background-color: white;
    border: solid 1px orange;
    border-radius: 50%;
  }

  /deep/  .toggle:active {
    height: 11%;
  }

  /deep/   .hljs-literal {
    color: #569CD6;
}

/deep/ .hljs-symbol {
    color: #569CD6;
}

/deep/ .hljs-name {
    color: #e06c75;
}

/deep/ .hljs-link {
    color: #569CD6;
    text-decoration: underline;
}

/deep/ .hljs-built_in {
    color: #c678dd;
}

/deep/ .hljs-type {
    color: #4EC9B0;
}

/deep/ .hljs-number {
    color: #da7518;
}

/deep/ .hljs-class {
    color: #7bff24;
}

/deep/ .hljs-string {
    color: rgb(99, 99, 255);
}

/deep/ .hljs-meta-string {
    color: #D69D85;
}

/deep/ .hljs-regexp {
    color: #9A5334;
}

/deep/ .hljs-template-tag {
    color: #9A5334;
}

/deep/ .hljs-subst {
    color: #DCDCDC;
}

/deep/ .hljs-function {
    color: #c678dd;
}

/deep/ .hljs-title {
    color: #30a2ff;
}

/deep/ .hljs-params {
    color: #5B6370;
}

/deep/ .hljs-formula {
    color: #DCDCDC;
}

/deep/ .hljs-comment {
    color: #5B6370;
    font-style: italic;
}

/deep/ .hljs-quote {
    color: #57A64A;
    font-style: italic;
}

/deep/ .hljs-doctag {
    color: #608B4E;
}

/deep/ .hljs-meta {
    color: #abb2bf;
}

/deep/ .hljs-tag {
    color: #abb2bf;
}

/deep/ .hljs-meta-keyword {
    color: #bdd4ff;
}

/deep/ .hljs-variable {
    color: #e06c75;
}

/deep/ .hljs-template-variable {
    color: #e06c75;
}

/deep/ .hljs-attr {
    color: #ff7b00;
}

/deep/ .hljs-attribute {
    color: #D19A66;
}

/deep/ .hljs-builtin-name {
    color: #ABB2BF;
}

/deep/ .hljs-section {
    color: gold;
}

/deep/ .hljs-emphasis {
    font-style: italic;
}

/deep/ .hljs-strong {
    font-weight: bold;
}

/deep/ .hljs-bullet {
    color: #D7BA7D;
}

/deep/ .hljs-selector-tag {
    color: #e06c75;
}

/deep/ .hljs-selector-id {
    color: #D19A66;
}

/deep/ .hljs-selector-class {
    color: #D19A66;
}

/deep/ .hljs-selector-attr {
    color: #D19A66;
}

/deep/ .hljs-selector-pseudo {
    color: #D7BA7D;
}

/deep/ .language-html {
    color: #ABB2BF;
}

/deep/ .language-css {
    color: #ABB2BF;
}

/deep/ .language-javascript {
    color: #ABB2BF;
}

/deep/ .hljs-addition {
    background-color: #144212;
    display: inline-block;
    width: 100%;
}

/deep/ .hljs-deletion {
    background-color: #600;
    display: inline-block;
    width: 100%;
}
/deep/ table {
  border-collapse: separate;
  border: 1px solid var(--font-color);
  margin: 0 auto;
  border-spacing: 0; /* 设置间距为0 */
  background: var(--infocard-bg-color); 
}

/deep/ table td,/deep/ table tr th {
  padding: 5px; /* 设置单元格内边距为5px */
  text-align: center !important; /* 设置内容左对齐 */
  vertical-align: middle; /* 设置内容垂直居中 */
  border: 1px solid var(--font-color);
}

/deep/ blockquote {
  margin: 1em 0 1em; /* 设置外边距，上方无，下方有一个段落的空间 */
  padding: 0 1em; /* 设置内边距，左右各有一个字符的空间 */
  border-left: 3px solid #ccc; /* 左边框为2像素宽的灰色实线 */
  font-style: italic; /* 字体样式为斜体 */
  color: #888;
}

/deep/ blockquote p {
  margin: 0; /* 段落内部的外边距为0 */
}




</style>