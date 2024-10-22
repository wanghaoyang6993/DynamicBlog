<template>
  <div class="elForm">
      <el-dialog 
        title="上传照片" 
        :visible.sync="addPhotoShow" 
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
          <el-form-item label="是否私密" :label-width="formLabelWidth">
            <el-radio 
                v-model="form.isprivate" 
                label="true" 
                border
                size="medium">
                是
            </el-radio>
            <el-radio 
                v-model="form.isprivate" 
                label="false" 
                border
                size="medium">
                否
            </el-radio>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="选择相册" :label-width="formLabelWidth">
            <el-radio 
                v-model="form.albumId" 
                v-for="album in albums" 
                :label="album.id" 
                :key="album.id" 
                border 
                size="medium">{{ album.name }}</el-radio>
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
import {addPhoto, getAllAlbum} from '@/request/api'
import { Message } from 'element-ui'

export default {
    data() {
        return {
            addPhotoShow: false,
            form: {
                description: '',
                albumId:'',
                url: "",
                isprivate: false
            },
            formLabelWidth: '120px',
            albums:[],
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
                this.addPhotoShow = this.isShow
            },
            immediate: true
        },
        dialogFormVisible: {
            handler() {
                if(this.addPhotoShow !== this.isShow) {
                    this.$emit('changeVisible')
                }
            }
        }
    },
    methods: {
        submit() {
            // this.form.createDate = Date.now();
            addPhoto(this.form).then(res => {
                alert()
                if(res.success) {
                    Message({
                        message:'上传成功！',
                        type:'success'
                    })
                }
            })
            this.$emit('changeVisible');
            // location.reload()
        },
        handleAvatarSuccess(res, file) {
            // console.log("success")
            this.form.url = URL.createObjectURL(file.raw);
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
                this.form.url = res.data.data
            })
        },
    },
    mounted() {
        getAllAlbum().then(res => {
            this.albums = res.data
        });
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