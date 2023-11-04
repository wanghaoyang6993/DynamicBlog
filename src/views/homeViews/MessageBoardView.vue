<template>
  <div class="messageBoard">
    <ul class="messageContent">
        <li v-for="item, index in messageData" 
            :key="index"
            :style="{top:item.topPosition,left:item.leftPosition}">{{ item.message }}</li>
    </ul>
    <div class="input">
        <el-input 
            class="el-input"
            v-model="message"
            placeholder="在这里输入留言，回车发送哦！"
            @keydown.enter.native="saveMessage"/>
    </div>
  </div>
</template>

<script>
import {saveMessage, getMessages} from '@/request/api'
import { Message } from 'element-ui'

export default {
    data() {
        return {
            messageData:[],
            message:"",
            throttleflag:true
        }
    },
    methods: {
        saveMessage() {

            if(this.message  === '') {
                Message({
                    message: "留言不要为空哦！",
                    type:'warning',
                })
                return;
            }

            if(this.message.length > 30) {
                Message({
                    message: "这条留言有些长了哦，有点放不下呢",
                    type:'warning',
                })
                return;
            }

            if(!this.throttleflag){
                Message({
                    message: "操作太快啦，等等再发吧！",
                    type:'warning',
                })
                return
            }
            
            //获取随机位移信息
            let leftPosition = this.getRandomPositionX();
            let topPosition = this.getRandomPositionY();

            //判断是否有重复
            while(!this.positionJudge(topPosition, leftPosition)){
                leftPosition = this.getRandomPositionX();
                topPosition = this.getRandomPositionY();
            }
            let message = this.message
            let messageBody = {
                message,
                topPosition,
                leftPosition
            }
            saveMessage(messageBody).then(res => {
                if(res.data === true) {
                    this.insertMessage(this.message, topPosition, leftPosition)
                    this.message = '';
                }else {
                    Message({
                        type:'error',
                        message:"出错啦，待会儿再试哦！"
                    })
                }
            })

            this.throttleflag = false
            setTimeout(()  => {
                this.throttleflag = true;
            }, 30000)
        },
        getRandomPositionX() {
            let left = `${Math.random() * 80}%`;
            return left
        },
        getRandomPositionY() {
            let top = `${Math.random() * 80}%`;
            return top
        },
        positionJudge(topPosition, leftPosition) {
            for(let message of this.messageData) {
                while(message.topPosition === topPosition&&message.leftPosition === leftPosition) {
                    return false
                }
            }
            return true
        },
        insertMessage(message, topPosition, leftPosition) {
            this.messageData.push({
                message,
                topPosition,
                leftPosition
            })
        },
    },
    mounted() {
        getMessages().then(res => {
            this.messageData = res.data
        })
    }
}
</script>

<style>
.messageBoard {
    display: flex;
    flex-flow: column;
    border-radius: 15px;
    background-color: var(--infocard-bg-color);
}

.el-input__inner {
    padding-left: 3vw;
    background-color: rgba(0, 0, 0, .1);
    height: 100%;
    font-size: 1.1vw;
    outline: none;
    border: none;
    color: var(--font-color);
}

.el-input {
    border-top: 2px var(--infocard-active-color) solid;
    height: 100%;
}

.input {
    height: 12%;
}

.messageContent {
    position: relative;
    height: 88%;
}

.messageContent li {
    position: absolute;
    color: var(--font-color);
    padding: .6vw;
    border: solid 1px black;
    border-radius: 10%;
    background-color: var(--infocard-active-color);
    font-size: .8vw;
    transition: all .3s;
    cursor: default;
}

.messageContent li:hover {
    z-index: 999;
    background-color: var(--infocard-bg-active-color-reverse);
    color: var(--infocard-bg-color);
}
</style>