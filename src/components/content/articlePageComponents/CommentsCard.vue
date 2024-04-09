<template>
  <div class="commentsCardContainer">
    <span>评论：</span>
    <hr>
    <button class="commentBth" @click="handleComment">评论一下</button>
    <div class="content" 
        v-for="comment in commentsArr"
        :key="comment.id">
        <!-- 一级评论 -->
        <div class="flexWraper">
            <div class="avatar">
                <img :src="comment.authorVo.avatar" alt="" srcset="">
            </div>
            <div class="contentContainer">
                <div class="name">{{comment.authorVo.nickName}}</div>
                <div class="comment">{{ comment.content }}</div>
                <div class="date">
                    {{ comment.createDate }}
                    <span class="reply" @click="handleReply(comment.authorVo.nickName, comment.id)">回复</span>
                </div>
            </div>
        </div>
        <!-- 二级评论 -->
            <div class="childContent" 
                v-for="childComment in comment.children" 
                :key="childComment.id">
                <div class="flexWraper">
                    <div class="avatar">
                        <img :src="childComment.authorVo.avatar" alt="" srcset="">
                    </div>
                    <div class="contentContainer">
                        <div class="name">{{ childComment.authorVo.nickName }}</div>
                        <div class="comment">{{ `回复 @${ childComment.toUser }：${childComment.content}` }}</div>
                        <div class="date">
                            {{ childComment.createDate }}
                            <span class="reply" @click="handleReply(childComment.authorVo.nickName, comment.id)">回复</span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="expendArray" :class="[isExpend?'expendArraydown':'expendArrayup']" @click="expend"></div>
    <div class="masking" v-if="isReplyBoxShow">
        <div class="replyBox">
            <div class="toUser">{{ `回复 ${replyParam.toUser}：` }}</div>
            <textarea name="" id="" cols="30" rows="8" v-model="content"></textarea>
            <div class="bthContainer">
                <button class="replyBtn" @click="reply">发送</button>
                <button class="replyBtn" @click="isReplyBoxShow = !isReplyBoxShow">取消</button>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import {saveComments, getCurrentUser, getComments} from '@/request/api'
import { Message } from 'element-ui'

export default {
    data() {
        return {
            commentsArr:[],
            isExpend:false,
            isReplyBoxShow:false,
            isReply:false,
            content:'',
            replyParam: {
                content:'',
                toUser:'',
                authorId:0,
                parentId:0,
                level:2,
                articleId:''
            },
            commentParam: {
                content:'',
                toUser:0,
                authorId:0,
                parentId:0,
                level:1,
                articleId:''
            }
        }
    },
    props: {
        articleId:String,
    },
    methods: {
        handleReply(toUser, parentId) {
            this.isReply = true
            this.replyParam.toUser = toUser
            this.replyParam.parentId = parentId,
            //判断当前用户是否已登录，若未登录按游客处理
            getCurrentUser().then(res => {
                if(res.success) {
                    this.replyParam.authorId = res.data.id
                }
            })
            this.isReplyBoxShow = !this.isReplyBoxShow
        },
        reply() {
            if(this.isReply) {
                this.isReplyBoxShow = false
                this.replyParam.content = this.content
                this.replyParam.articleId = this.articleId
                saveComments(this.replyParam).then(res => {
                    if(res.success === true) {
                        Message({
                            message:'回复成功',
                            type:'success'
                        })
                        this.askForComments()
                    }
                })
            }else {
                this.isReplyBoxShow = false
                this.commentParam.articleId = this.articleId
                this.commentParam.content = this.content
                saveComments(this.commentParam).then(res => {
                    if(res.success === true) {
                        Message({
                            message:'回复成功',
                            type:'success'
                        })
                        this.askForComments()
                    }
                })
            }
            this.content = ''
        },
        handleComment() {
            this.isReply = false
            //判断当前用户是否已登录，若未登录按游客处理
            getCurrentUser().then(res => {
                if(res.code===200) {
                    this.commentParam.authorId = res.data.id
                }
            })
            this.isReplyBoxShow = !this.isReplyBoxShow
        },
        askForComments() {
            this.$nextTick(() => {
            getComments(`comment/${this.articleId}`).then(res => {
                this.commentsArr = []
                //id、nickname、avatar、content、children
                res.data?.forEach(comment => {
                    const {id, authorVo, children, content, createDate} = comment
                    this.commentsArr.push({id, authorVo, children, content, createDate})
                });
            })
        })
        },
        expend() {
            this.isExpend = !this.isExpend
            this.$emit('expendComment')
        }
    },
    watch: {
        articleId: {
            handler() {
                this.askForComments()
            },
            immediate:true
        }
    },
}
</script>

<style scoped>

.commentsCardContainer > span{
    display: block;
    text-align: left;
    padding-left: 25px;
    font-size: 22px;
    margin-top: 20px;
    color: var(--font-color);
}

.commentsCardContainer hr {
    margin: 2vw 25px 0;
}
.masking {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
}

.replyBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 29%;
    height: 36%;
    padding: 0 2vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--infocard-bg-color);
    border-radius: 5px;
    z-index: 9;
}

.replyBox textarea {
    resize: none;
    background-color: rgba(255, 255, 255);
    outline: none;
    border: 0;
    border-radius: 20px;
    padding: 13px;
    color: #333;
}

.toUser {
    align-self: flex-start;
    color: var(--font-color);
    margin: 12px;
    font-size: 1.2vw;
}

.replyBtn {
    width: 4vw;
    margin-top: 12px;
    background-color: var(--infocard-bg-color);
    border: 1px solid #666;
    border-radius: 5px;
    color: var(--font-color);
    cursor: pointer;
    padding: 3px;
    margin-right: 1vw;
}

.replyBtn:active {
    background-color: var(--infocard-active-color);
}

.bthContainer {
    align-self: flex-end;
}

.childContent {
    width: 90%;
    margin-left: 2vw;
    border-left: .1vw solid rgba(255, 255, 255, .1);

}

.name {
    text-align: left;
    font-size: 1.2vw;
    color: var(--font-color);
    opacity: .8;
    padding-bottom: .6vw;
}

.comment {
    text-align: left;
    font-size: 1vw;
    color: var(--font-color);
    opacity: .9;
    line-height: 1.3vw;
}

.date {
    text-align: right;
    font-size: .6vw;
    margin-top: 1vw;
    color: var(--font-color);
    opacity: .9;
}

.reply {
    cursor: pointer;
}

.flexWraper {
    display: flex;
    width: 100%;
    padding: .6vw;
}

.avatar{
    width: 20%;
    height: 20%;
}

.avatar img {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.contentContainer {
    width: 80%;
    padding-left: .3vw;
}

.content {
    padding: 1vw;
    width: 100%;
}

.commentBth {
    position: absolute;
    right: 3vw;
    top: 2.6vw;
    width: 5vw;
    height: 2vw;
    font-size: .9vw;
    color: var(--font-color);
    outline: none;
    border: none;
    /* border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px; */
    /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); */
    background-color: var(--infocard-bg-color);
    cursor: pointer;
}

.commentBth:hover {
    transform: scale(1.1);
    transition: .1s;
}

.expendArray {
    position: absolute;
    width: .8vw;
    height: .8vw;
    top: 1vw;
    right: 2vw;
    opacity: .9;
    cursor: pointer;
    border: 1px solid var(--font-color);
    border-left: none;
    border-bottom: none;
    transition: .3s;
}

.expendArrayup {
    transform: rotate(-45deg);
}

.expendArraydown {
    transform: rotate(135deg);
}


.commentsCardContainer {
    position: relative;
    background-color: var(--infocard-bg-color);
    padding: 6px;
    transition: .3s;
    overflow: auto;
    border: 5px solid var(--infocard-bg-color);
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