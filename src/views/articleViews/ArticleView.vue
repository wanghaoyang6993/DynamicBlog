<template>
  <div class="articleContainer">
    <article-editor-view 
        v-if="isEditorShow"
        :title="article.title"
        :articleBody="articleBody"
        :summary="article.summary"
        :id="article.id"
        :is-update="true"
        @editDone="editDone"></article-editor-view>
    <article-content-card 
        class="articleContentCard"
        :article="article"
        :html-content="htmlContent"
        v-if="!isEditorShow"
        @edit="handleEdit"/>
    <toc-list  :class="{'expendCard':isTocExpend}"
        ref="tocList"
        @expendToc="expendToc"
        :isdone="done"
        v-if="!isEditorShow"/>
    <comments-card :articleId="article.id"
        class="commentsCard"
        ref="commentCard"
        :class="{'expendCard':isCommentExpend}"
        @expendComment="expendComment" 
        v-if="!isEditorShow"/>
    <span class="iconfont icon-zhuye home" @click="backHome" v-if="!isEditorShow"></span>
  </div>
</template>

<script>
import ArticleContentCard from '@/components/content/articlePageComponents/ArticleContentCard.vue';
import TocList from '@/components/content/articlePageComponents/TocList.vue';
import CommentsCard from '@/components/content/articlePageComponents/CommentsCard.vue';
import ArticleEditorView from '@/views/articleViews/ArticleEditorView.vue';
import {getArticleInfoById, getArticleContentByArticleId, getArticleSegmentById} from '@/request/api'
import {concurRequest} from "@/utils/concurRequest"

export default {
    data() {
        return {
            article: {},
            isCommentExpend:false,
            isTocExpend:false,
            isEditorShow:false,
            articleBody:'',
            htmlContent: '',
            done: false
        }
    },
    methods: {
        expendToc() {
            this.isTocExpend = !this.isTocExpend
            this.$refs.tocList.$el.style.zIndex = 9
            this.$refs.commentCard.$el.style.zIndex = 1
        },
        expendComment() {
            this.isCommentExpend = !this.isCommentExpend
            this.$refs.tocList.$el.style.zIndex = 1
            this.$refs.commentCard.$el.style.zIndex = 9
        },
        handleEdit() {
            
            getArticleContentByArticleId(`articles/content/${this.article.id}`).then(res => {
                this.articleBody = res.data
                this.isEditorShow = true
            })
        },
        editDone() {
            this.isEditorShow = false
            this.getArticle()
        },
        getArticle() {

            getArticleInfoById(this.id).then(res => {
                this.article = res.data
                window.localStorage.setItem("lastArticleId",this.id)
                window.localStorage.setItem("lastArticleTitle",this.article.title)
                window.localStorage.setItem("lastArticleSummary",this.article.summary)
            })

            getArticleSegmentById(this.id, 1).then(res => {
                const {content, total} = res.data

                this.htmlContent = content

                const requestArr = []
                
                //生成请求数组，以便并发地发起请求
                for(let i = 2;i <= total;i++) {
                    requestArr.push(getArticleSegmentById.bind(null, this.id, i))
                }

                try {
                    concurRequest(
                        //请求数组
                        requestArr, 
                        //并发数
                        6, 
                        //成功回调
                        (resArr) => {
                            resArr.forEach(res => {
                                this.htmlContent += res.data.content
                            })
                        },
                        //完成回调
                        () => this.done = true,
                        //最大重试次数
                        100
                    )
                }catch(e) {
                    this.$message("网络出现问题啦，更换网络后刷新试试呢！")
                }
                
            })

            
        },
        backHome() {
            this.$router.push('/')
        }
    },
    props: {
        articleData:Object,
        id:String
    },
    components: {
        ArticleContentCard,
        TocList,
        CommentsCard,
        ArticleEditorView
    },
    mounted() {
        this.getArticle()
    }
}
</script>

<style scoped>

.home {
    position: fixed;
    top: 6%;
    left: 4%;
    font-size: 3vw;
    cursor: pointer;
    color: var(--font-color);
    opacity: .8;
}

.expendCard {
    top: 3% !important;
    height: 94% !important;
    opacity: 1 !important;
}

.articleContainer {
    position: relative;
    justify-content: space-around;
    width: 100%;
    height: 100vh;
}

.tocListContainer {
    position: absolute;
    right: 3%;
    top: 3%;
    width: 22%;
    height: 50%;
    border-radius: 20px;
    opacity: .95;
}

.articleContentCard {
    position: absolute;
    width: 72%;
    height: 94%;
    top: 3%;
    left: 2vw;
    opacity: .95;
}

.commentsCard {
    position: absolute;
    width: 22%;
    height: 41%;
    top: 56%;
    right: 3%;
    border-radius: 20px;
    opacity: .95;
}

*::-webkit-scrollbar {
    width: 10px;    
    /*height: 4px;*/
}
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
*::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);

}
</style>