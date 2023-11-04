<template>
  <div :class="getThame()" class="login-container">
    <LoginForm 
      class="loginForm"
      @login="login"/>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm.vue'
import {login, getCurrentUser} from '@/request/api'
import loginCode from '@/constants/code'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      isLight:true
    }
  },
  methods: {
    // 获取主题
    getThame() {
      return {[this.$store.state.thame]:true}
    },
    //登陆后获取当前登录者信息
    getCurrentUserInfo() {
      getCurrentUser().then(res => {
        this.$store.commit('saveCurrentUserInfo', res.data);
        // console.log(this.$store.state.currentUserInfo);
      })
    },
    // 登录
    login(loginInfo) {
      login(loginInfo).then(res => {
        if(res.msg === 'success!') {
          window.localStorage.setItem("token", res.data)
          this.$store.commit('saveIsLogin',true)
          this.getCurrentUserInfo();
          Message({
            message: loginCode.get(res.code.toString()),
            type:'success',
            center:true
          })
          setTimeout(()=>{
            this.$router.replace('/')
          },0)
        }else {
          Message({
            message: loginCode.get(res.code.toString()),
            type:'warning',
            center:true
          })
        }
      });
    }
  },
  components: {
    LoginForm
  },
}
</script>

<style scoped>
  .light {
    /* background-image: url(@/assets/imgs/login_bg.png); */
    background-size: cover;
    background-repeat: no-repeat;
  }
  .login-container {
    height: 100vh;
    width: 100vw;
  }

  .loginForm{
    position: absolute;
    right: 9vw;
    top: 50%;
    transform: translateY(-60%);
  }
</style>