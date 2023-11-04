<template>
  <div 
    class="loginContainer"
    ref="loginContainerStyle">

    <el-form class="form">

        <el-form-item label="账号" class="inputContainer">
            <el-input
                placeholder="请输入账号"
                v-model="accountInput"
                clearable
                class="input"
                @keydown.enter.native="login">
            </el-input>
        </el-form-item>

        <el-form-item class="passwordLabel inputContainer" label="密码">
            <el-input 
                placeholder="请输入密码" 
                v-model="passwordInput"
                show-password
                clearable
                class="input passwordInput"
                @keydown.enter.native="login">
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button 
                type="primary" 
                class="loginBtn"
                @click="login">
                登录
            </el-button>
        </el-form-item>

    </el-form>

  </div>
</template>

<script>
/**
 * 本组件提供登录表单
 * 用户可自定义以String类型带单位传入宽度(width)和高度(height)，默认为28vw及50vh
 * 采用vhvw及百分比形式设计，可自适应适配，但最小宽度和高度分别设为了450px 400px
 * 
 * 点击登录后，触发父组件中的login事件，以{account: '1', password: '1'}的形式将表单信息传递给父组件
 */
export default {
    data() {
      return {
        accountInput: '',
        passwordInput: ''
      }
    },
    props: {
        width:{
            type:String,
            default:"28vw"
        },
        height:{
            type:String,
            default:"25vw"
        },
    },
    methods: {
        //设置宽度和高度
        setStyle() {
            this.$nextTick(()=>{
                this.$refs.loginContainerStyle.style.setProperty('--width', this.width);
                this.$refs.loginContainerStyle.style.setProperty('--height', this.height);
            })
        },
        //登录
        login() {
            this.$emit("login",{
                account: this.accountInput,
                password: this.passwordInput
            })
        }
    },
    mounted() {
        this.setStyle();
    }
}
</script>

<style scoped>
    .loginContainer {
        position: relative;
        width: var(--width);
        height: var(--height);
        min-width: 315px;
        min-height: 280px;
        background-color: var(--infocard-bg-color);
        opacity: .9;
        /* border: #ccc solid 1px; */
        box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.8);
        border-radius: 10px;
    }

    .form{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        height: 16vw;
        width: 70%;
    }

    .loginBtn{
        width: 100%;
        border: none;
    }

    .input{
        width: 80%;
    }



</style>