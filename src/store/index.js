import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentUser } from '@/request/api';
import { logout } from '@/request/api';
import { Message } from 'element-ui';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "light",
    currentUserInfo: null,
    currentCategoryId: 0,
    isLogin:false,
    aboutMe: {
      cover: `http://blog.theluckyone.top/00ba8a89-012a-4b17-9a89-17fa934390a7.jpg`,
      description: `自在的少年~`
    }
  },
  getters: {
    isLogin(state) {
      return state.isLogin
    },
    aboutMe(state) {
      return state.aboutMe
    }
  },
  mutations: {
    changeTheme(state, theme) {
      state.theme = theme;
    },
    saveCurrentUserInfo(state, info) {
      state.currentUserInfo = info;
    },
    ChangeCurrentCategoryId(state, id) {
      state.currentCategoryId = id;
    },
    saveIsLogin(state, info) {
      state.isLogin = info
    },
    saveAboutMe(state, aboutMe) {
      state.aboutMe.cover = aboutMe.cover;
      state.aboutMe.description = aboutMe.description;
    }
  },
  actions: {
    setTheme({commit}, theme) {
      commit('changeTheme', theme)
    },
    async getUserInfo({commit}) {
      const res = await getCurrentUser()

      if(res.code === 200) {
        commit('saveCurrentUserInfo', res.data)
        commit('saveIsLogin', true)
      }
    },
    async logout({commit}) {
      const res = await logout()

      if(res.code === 200) {
        commit('saveIsLogin', false)
        commit('saveCurrentUserInfo', null)
        Message({
          message:'登出成功',
          type:'success'
        })
      }
    }
  },
  modules: {
  }
})
