<template>
<!-- <div> -->
  <div class="bloggerInfo">
    <div class="avatarContainer">
      <div class="myAvatar">
        <img src="http://blog.theluckyone.top/5c802b73-6a53-4594-b621-afc4ac1f1687.jpg" alt="" srcset="">
      </div>
    </div>
    <div class="info">
      <div class="bloggerName">
        <span>何小幸</span>
      </div>
      <div class="bloggerDetail">
        <span>欢迎光临，随意一些，不用换鞋啦~</span>
      </div>
    </div>
    <div class="iconContainer">
      <div class="iconfont icon-login" v-if="!isLogin" @click="login"></div>
      <el-dropdown @command="handleCommand" v-if="isLogin">
        <span class="el-dropdown-link iconfont icon-edit">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">写文章</el-dropdown-item>
          <el-dropdown-item command="b">写动态</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="iconfont icon-settings_light" v-if="isLogin"></div>
      <div class="iconfont icon-login" v-if="isLogin" @click="logout"></div>
    </div>
    <PostDialog :isShow="dialogFormVisible" @changeVisible="cancelDialog"/>
  </div>
  
</template>

<script>
import PostDialog from '../PostPageComponents/PostDialog.vue';

export default {
  data() {
    return {
      dialogFormVisible:false
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.$store.dispatch('logout')
    },
    handleCommand(command) {
      if(command === 'a') {
        this.$router.push('/editor')
      }else {
        this.dialogFormVisible = true
      }
    },
    cancelDialog() {
      this.dialogFormVisible = false;
    }
  },
  components: {
    PostDialog
  }
}
</script>

<style scoped>
  .bloggerInfo {
    position: relative;
    display: flex;
    align-items: center;
    width: 20%;
    height: 15%;
    padding: 0 2%;
    background-color: var(--infocard-bg-color);
    border: var(--infocard-bg-color) solid 1px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px var(--infocard-bg-color);
  }

  .avatarContainer {
    flex: 1;
  }

  .myAvatar img {
    height: 100%;
    width: 100%;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .info {
    flex: 2;
    color: var(--font-color);
    margin-left: 5%;
    text-shadow: 0 .5px 1px rgba(0, 0, 0, 0.5);
  }

  .bloggerName {
    margin-bottom: 3%;
    font-size: 1.3vw;
  }

  .bloggerInfo {
    font-size: .8vw;
  }

  .iconContainer {
    position: absolute;
    right: 5%;
    top: 8%;
    width: 20%;
    height: 5%;
    display: flex;
    justify-content: space-around;
    color: var(--font-color);
  }
  .iconfont {
    font-size: 1vw;
    cursor: pointer;
    opacity: .8;
  }

  .iconfont:hover {
    opacity: 1;
  }

  .el-dropdown-link {
    font-size: 1vw;
    cursor: pointer;
    color: var(--font-color);
  }

  .elForm {
    position: absolute;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>