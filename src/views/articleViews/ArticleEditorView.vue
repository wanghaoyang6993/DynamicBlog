<template>
  <div class="article">
    <div class="masking">
        <div class="topBar">
            <div class="title">
                <span>标题</span>
                <el-input v-model="article.title"/>
            </div>
            <div class="submit">
                <el-button 
                    class="submitBtn"
                    type="primary" 
                    @click="dialogFormVisible = true">搞定！</el-button>
            </div>
        </div>
        <!-- <MdEditor :content.sync="article.content" class="mdEditor"></MdEditor> -->
        <MDEditorComponents :content.sync="article.content" @contentChange="contentChange"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="calc(36vw)">
        <el-form>
            <el-form-item label="文章摘要" :label-width="formLabelWidth">
            <el-input v-model="article.summary" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" :label-width="formLabelWidth">
            <el-select v-model="article.categoryId"  placeholder="请选择文章分类">
                <el-option 
                    :label="item.name" 
                    :value="item.value" 
                    v-for="item in categories"
                    :key="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
                <el-checkbox 
                    v-for="tag in tags" 
                    :key="tag.id" 
                    v-model="tag.flag" 
                    :label="tag.name" 
                    border:true></el-checkbox>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdateArticle(article)">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {putArticle, getAllCategories, getAllTags, updateArticle} from '@/request/api'
import MDEditorComponents from '@/components/content/articlePageComponents/MDEditorComponents.vue';
import { Message } from 'element-ui';


export default {
  data() {
    return {
        article: {
            title: '',
            content: "# h1",
            summary:'',
            categoryId: null,
        },
        htmlValue:'',
        tags: [],
        categories: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        
    };
  },
  props: {
    title: {
        type:String,
        default:''
    },
    summary: {
        type:String,
        default:''
    },
    id: {
        type:String,
        default:''
    },
    isUpdate: {
        type:Boolean,
        default:false
    },
    articleBody: {
        type:Object,
        default() {
            return {}
        }
    }
  },
  methods: {
    saveOrUpdateArticle(article) {
        this.dialogFormVisible = false
        // 调用方法将 markdown 转换成 html 并使用 xss 过滤
        // const html = xss.process(VueMarkdownEditor.themeConfig.markdownParser.render(this.article.content));
        let tagId = [];
        for(let tag of this.tags) {
            tag.flag === true && tagId.push(tag.value);
        }
        if(!this.isUpdate) {
            putArticle({
                ...article,
                contentHtml:this.htmlValue,
                tagId
            }).then(res => {
                if(res.success) {
                    // window.localStorage.setItem("currentArticleId", res.data)
                    this.$router.push("/article/" + res.data);
                }else {
                    Message({
                        message: "登录超时，请重新登陆哦！",
                        type:'warning',
                    })
                    this.$router.push("/login");
                }
            })
        }else {
            let id = this.id
            updateArticle({
                ...article,
                id,
                contentHtml:this.htmlValue,
                tagId
            }).then(res => {
                if(res.success) {
                    this.$emit('editDone')
                    window.localStorage.setItem("currentArticleId", res.data.id)
                }else {
                    Message({
                        message: "登录超时，请重新登陆哦！",
                        type:'warning',
                    })
                    this.$router.push("/login")
                }
            })
        }
    },
    contentChange(markDownvalue, htmlValue) {
        this.article.content = markDownvalue;
        this.htmlValue = htmlValue
    }
  },
  mounted() {
    getAllCategories().then(res => {
        for(let item of res.data) {
            let temp = {};
            temp.name = item.categoryName;
            temp.value = item.id;
            this.categories.push(temp);
        }
    })
    getAllTags().then(res => {
        for(let tag of res.data) {
            let temp  = {
                name:tag.tagName,
                value:tag.id,
                flag:false
            }
            this.tags.push(temp);
        }
    })
  },
  beforeMount() {
    if(this.isUpdate === true) {
        //需要在beforeMount钩子中为data中需要初始显示的值更新，不然编辑器内不会双向绑定！！
        this.article.content = this.articleBody.content
        this.article.title = this.title
        this.article.summary = this.summary
    }
  },
  components:{
    MDEditorComponents
  },
};
</script>

<style scoped>
.article {
    width: 100%;
    height: 100vh;
}

.masking {
    position: inherit;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    opacity: 0.9;
}

.topBar {
    height: 10%;
    padding: 0 30px;
    background-color: #fff;
    opacity: .9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    display: flex;
    width: 80%;
}

.title span {
    display: flex;
    align-items: center;
    width: 8%;
    font-size: 1.6vw;
}

.submitBtn {
    width: 10vw;
}

.topBar {
    position: relative;
    z-index: 9999;
}

.submitBtn {
    width: 10vw;
}

.title {
    height: 3vw;
}
</style>