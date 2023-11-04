/**
  优化：
      图片的懒加载实现
      函数式组件实现照片展示
*/

<template>
  <div class="albumContainer">
    <div class="photoContianer" v-for="photo in photoList" :key="photo.id" ref="photos">
      <img :src="photo.url"
        alt="http://blog.theluckyone.top/08a1bec0-8254-4f6b-8752-2667b741c011.jpg"
        class="photo"
        :title="photo.description + '\n' + photo.date"
        @click="handleImgClick(photo.url, photo.description, photo.date)"
        @load="calcGrid"
        >
    </div>
    <album-show
      class="albumShow" 
      v-if="isFullPhotoShow" 
      :url="showPhotoUrl"
      :desc="showPhotoDesc"
      :date="showPhotoDate"
      @myClick="handelAlbumClick"
      />
  </div>
</template>

<script>
import { getAllPhotoByAlbumId } from '@/request/api';
import albumShow from '@/components/content/albumPageComponents/albumShow'

export default {
  data() {
    return {
      id:null,
      photoList:[],
      mask:null,
      imgContainer:null,
      isFullPhotoShow: false,
      showPhotoUrl:null,
      showPhotoDesc:null,
      showPhotoDate:null
    }
  },
  methods: {
    calcGrid() {
      this.$nextTick(() => {
        //相册为空就退出，省的报错
        if(!this.$refs.photos) return
        const els = Array.from(this.$refs.photos)
        for(let i = 0;i < els.length;i++) {
          if(els[i].clientHeight===0){
            setTimeout(this.calcGrid, 200)
            break
          }
          const rows = Math.ceil(els[i].clientHeight / 5)
          els[i].style.gridRowEnd = `span ${rows}`
          //放置出现问题，过一段时间后再次重新计算一遍
          setTimeout(() => {
            const rows = Math.ceil(els[i].clientHeight / 5)
            els[i].style.gridRowEnd = `span ${rows}`
          }, 500)
        }
      })
    },
    //隐藏备案信息和主题拉绳
    hideBeianNtoggle() {
      //因为visibility会应用transition动画效果，所以为了瞬间隐藏，使用display
      document.querySelector(".beian").style.display = "none"
      document.querySelector(".toggle").style.display = "none"
    },
    //显示备案信息和主题拉绳
    showBeianNtoggle() {
      document.querySelector(".beian").style.display = "block"
      document.querySelector(".toggle").style.display = "flex"
    },
    //点击显示图片展示容器
    handleImgClick(url, desc, date) {
      this.isFullPhotoShow = true
      this.showPhotoUrl = url,
      this.showPhotoDesc = desc,
      this.showPhotoDate = date
      this.hideBeianNtoggle()
    },
    //点击后容器隐藏
    handelAlbumClick() {
      this.isFullPhotoShow = false
      this.showBeianNtoggle()
    }
  },
  mounted() {
    
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calcGrid)
  },
  activated() {
    if(this.id != this.$route.params.id) {
      this.photoList = null
      this.id = this.$route.params.id
      getAllPhotoByAlbumId(this.id).then(res => {
        //反转一下保证最新更新的图片在前面，后期再添加供用户选择排序方式的功能
        this.photoList = res.data?.reverse().map(item => {
          //日期转换
          let date = new Date(Number(item.createDate))
          const day = date.getDate()
          const mounth = date.getMonth() + 1
          const year = date.getFullYear()
          item.date = `${year}-${mounth}-${day}`
          return item
        })
        this.calcGrid()
      })
      window.addEventListener("resize", this.calcGrid)
    }
  },
  components: {
    albumShow
  }
}

</script>

<style scoped>
.albumContainer {
  display: grid;
  grid-auto-rows: 5px;
  grid-template-columns: repeat(auto-fill, calc(33%));
  align-items: start;
  justify-content: space-between;
  border-radius: 15px;
  
}

.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.photo {
  width: 100%;
  cursor: pointer;
}

.photo:hover {
  transform: scale(1.02);
}

.description {
  color: var(--font-color);
}

.date {
  color: var(--font-color);
}
</style>