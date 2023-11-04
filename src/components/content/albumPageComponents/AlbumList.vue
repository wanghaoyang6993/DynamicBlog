<template>
  <div class="albumList">
    <div class="albumItem" 
      v-for="album in albumList" 
      :key="album.id"
      @click="albumClick(album.id, album.password)">
      <h1 class="title">{{ album.password==="true"?album.name + "🔒":album.name }}</h1>
      <div class="photoContainer" v-if="album.password==='true'">
        <div class="lockedBg"></div>
        <div class="lockedBg"></div>
        <div class="lockedBg"></div>
        <div class="lockedBg"></div>
        <div class="lockedBg"></div>
      </div>
      <div class="photoContainer" v-if="album.password!=='true'">
        <div class="photo" 
            v-for="photo in album.photoList" 
            :key="photo.id"
            :style="{'background':`url(${photo.url}) round`}"
            ></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getAllAlbum, getPaginationPhotoByAlbumId, verifyAlbumPassword } from '@/request/api';
import { MessageBox, Message } from 'element-ui'

export default {
  data() {
    return {
      albumList:[],
      paginationParam: {
        page: "1",
        pageSize: "5"
      }
    }
  },
  props: ["albumData"],
  methods: {
    getAlbumData() {
      getAllAlbum().then(res => {
        const {data} = res
        this.albumList = data
        this.getPaginationPhoto()
      })
    },
    getPaginationPhoto() {
      this.albumList.forEach(item => {
        if(item.password!=="true") {
          getPaginationPhotoByAlbumId(item.id, {pageParams:this.paginationParam}).then(res => {
            const {data} = res
            //要通过$set来转换响应式
            this.$set(item, "photoList", data==="secret album"?[]:data)
          })
        }
      })
    },
    albumClick(id, needPassword) {
      if(needPassword==="true") {
        this.checkPassword(id)
      }else {
        this.$router.push('album/content/' + id)
      }
    },
    checkPassword(id) {
      const params = window.sessionStorage.getItem("album" + id)
      if(params==undefined) {
        // 参数不存在时，提示用户输入
        MessageBox.prompt('', "请输入密码", {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          inputType: 'text',
          customClass:"messagebox"
        }).then(({ value }) => {
          verifyAlbumPassword({id, password:value}).then(res => {
            if(res.data==="allowed") {
              //鉴权成功后放入sessionStorage，本次会话中再次访问不再需要输入密码
              window.sessionStorage.setItem("album" + id, JSON.stringify({id, password:value}))
              this.$router.push('album/content/' + id)
            }else {
              Message.error({
                message:"密码错误",
                center:true
              })
            }
          })
        }).catch(() => {
          // 用户点击取消按钮时的处理逻辑
        });
      }else {
        //参数存在，直接路由跳转，因为后续请求照片也要携带密码验证，所以就不再进行验证
        this.$router.push('album/content/' + id)
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  mounted() {
    this.getAlbumData()
  }

}
</script>

<style scoped>

.albumList {
  padding: 2vw;
}

.albumItem {
  margin-bottom: 2.5vw;
  height: 15vh;
  /* overflow: hidden; */
}

.title {
  display: flex;
  color: var(--font-color);
  font-size: 1.7vw;
  text-align: left;
  cursor: pointer;
}

.title::after {
  content: "";
  display: inline-block;
  border-bottom: 1px solid #ccc;
  margin-left: 1.2vw;
  flex: 1;
}

.title:hover {
  transform: scale(1.01);
}

.photoContainer{
  height: 10vh;
  text-align: left;
  margin-left: 1vw;
}

.photo {
  display: inline-block;
  border-radius: 5px;
  width: 18%;
  height: 100%;
  margin: 1vw .3vw;
  background:url("http://blog.theluckyone.top/7292494a-3312-476a-a951-a30155777686.png") contain;
  cursor: pointer;
}

.photo:hover {
  transform: scale(1.05);
}


.lockedBg {
  display: inline-block;
  width: 17%;
  height: 100%;
  margin: 1.5vw .5vw;
  background:var(--underlying-bg-reverse) round;
  cursor: pointer;
  backdrop-filter: blur(7px);
  filter: blur(10px);
}


</style>