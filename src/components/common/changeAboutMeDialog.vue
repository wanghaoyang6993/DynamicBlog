<template>
  <div class="elForm">
      <el-dialog 
        title="关于我" 
        :visible.sync="changeAboutMeShow" 
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
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.description"></el-input>
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
import { Message } from 'element-ui'

export default {
    data() {
        return {
            changeAboutMeShow: false,
            form: {
                description: '',
                cover: "",
            },
            formLabelWidth: '120px',
            tags:null,
        }
    },
    props: {
        isShow: {
            type:Boolean,
            default:false
        },
    },
    watch: {
        isShow: {
            handler() {
               this.changeAboutMeShow = this.isShow
            },
            immediate: true
        },
        dialogFormVisible: {
            handler() {
                if(this.changeAboutMeShow !== this.isShow) {
                    this.$emit('changeVisible')
                }
            }
        }
    },
    methods: {
        submit() {
            this.$store.commit('saveAboutMe', this.form)
            this.$store.state.aboutMe.cover = this.form.cover
            this.$store.state.aboutMe.description = this.form.description
            Message.success('修改成功！')
            this.$emit('changeVisible');
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
                url:'http://106.15.189.1:8889/api/upload',
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