<template>
  <div id="main">
    <mavon-editor 
      v-model="value" 
      class="editor" 
      :toolbars="toolbars" 
      @change="changed()"
      @imgAdd="handleEditorImgAdd"
      @imgDel="handleEditorImgDel"
      ref="md"/>
</div>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';
// import with ES6
import mavonEditor from 'mavon-editor'
// markdown-it对象：md.s_markdown, md => mavonEditor实例
//                 or
//                 mavonEditor.markdownIt 
import 'mavon-editor/dist/css/index.css'

export default {
  
  data() {
    return {
      value: this.content,
      imgFile: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    };
  },
  methods: {
    changed() {
      this.$emit("contentChange",this.$refs.md.d_value, this.$refs.md.d_render)
    },
    handleEditorImgAdd (pos, $file) {
      $file
      let formdata = new FormData()
      formdata.append('file', $file)
      this.imgFile[pos] = $file
      let token = window.localStorage.getItem("token")
        axios({
          method:'post',
          url:'http://47.115.223.189:8888/upload',
          headers:{
            Authorization:token,
            'Content-Type':'multipart/form-data'
          },
          data:formdata
        }).then(res => {
          if (res.data.code === 200) {
              Message({
                message:'上传成功',
                type:'success'
              })
              let url = res.data.data
              let name = $file.name
              if (name.includes('-')) {
                  name = name.replace(/-/g, '')
              }
              let content = this.value
              // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
              if (content.includes(name)) {
                  let oStr = `(${pos})`
                  let nStr = `(${url})`
                  let index = content.indexOf(oStr)
                  let str = content.replace(oStr, '')
                  let insertStr = (soure, start, newStr) => {
                      return soure.slice(0, start) + newStr + soure.slice(start)
                  }
                  this.value = insertStr(str, index, nStr)
              }
          } else {
            Message({
              message:res.msg,
              type:'success'
            })
          }
        })
      },
      handleEditorImgDel (pos) {
          delete this.imgFile[pos]
      },

  },
  props: {
    content:{
      type:String,
      default:''
    }
  },
  watch: {
    'this.$refs.md.d_value': {
      handler(newVal) {
        // console.log(newVal)
        newVal
      }
    }
  },
  components: {
    mavonEditor:mavonEditor.mavonEditor
  }
};
</script>

<style scoped>
.main {
  height: 90vh;
  overflow: hidden;
}
.editor {
  height: 90vh;
}
</style>