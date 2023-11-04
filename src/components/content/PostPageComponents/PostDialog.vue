<template>
  <div class="elForm">
      <el-dialog 
        title="发布动态" 
        :visible.sync="dialogFormVisible" 
        class="dialog"
        :modal-append-to-body="false">

        <el-form :model="form">
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.cover" :src="form.cover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input type="input" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-radio 
                v-model="form.tagId" 
                v-for="item in tags" 
                :label="item.id" 
                :key="item.id" 
                border 
                size="medium">{{ item.tag }}</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="$emit('changeVisible')">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import {getInterestTags, upLoadPost} from '@/request/api'
import { Message } from 'element-ui'

export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                title:null,
                content: '',
                tagId:'1',
                cover: "",
                createDate:null
            },
            formLabelWidth: '120px',
            tags:null
        }
    },
    props: {
        isShow: {
            type:Boolean,
            default:false
        }
    },
    watch: {
        isShow: {
            handler() {
                this.dialogFormVisible = this.isShow
            },
            immediate: true
        },
        dialogFormVisible: {
            handler() {
                if(this.dialogFormVisible !== this.isShow) {
                    this.$emit('changeVisible')
                }
            }
        }
    },
    methods: {
        submit() {
            this.form.createDate = Date.now();
            upLoadPost(this.form).then(res => {
                if(res.success) {
                    Message({
                        message:'上传成功！',
                        type:'success'
                    })
                }
            })
            this.$emit('changeVisible');
            location.reload()
        },
        handleAvatarSuccess(res, file) {
            // console.log("success")
            this.form.cover = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload() {
        },
        /**
         * 
         * @param { } file 该方法传入的file不是正常的文件，需要再.file将其取出
         */
        uploadImg(file) {
            // console.log(file.file)
            let formdata = new FormData()
            formdata.append('file',file.file)
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
                // console.log(res.data.data)
                this.form.cover = res.data.data
            })
        }
    },
    mounted() {
        getInterestTags().then(res => {
            this.tags = res.data
        })
    }
}
</script>

<style scoped>
img {
    width: 100%;
}

.el-form {
    height: 50%;
    overflow: auto;
}

/deep/ .el-input__inner {
    background-color: #fff;
    border: solid 1px #ddd;
    height: 2vw;
}

/deep/ .el-form-item__label {
    font-weight: bolder;
}

.dialog {
    border-radius: 30px;
}
</style>