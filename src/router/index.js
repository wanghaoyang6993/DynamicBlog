import Vue from 'vue'
import VueRouter from 'vue-router'
import {getCurrentUser} from '@/request/api'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/homeViews/HomeView'),
    children: [
      {
        path:'/',
        component: () => import('@/views/homeViews/PostView')
      },
      {
        path:'/category',
        component: () => import('@/views/homeViews/CategoryView'),
      },
      {
        path:'/messageBoard',
        component: () => import('@/views/homeViews/MessageBoardView'),
      },
      {
        path:'/album',
        component: () => import('@/views/homeViews/AlbumView'),
        children: [
          {
            path:'/',
            component: () => import('@/components/content/albumPageComponents/AlbumList')
          },
          {
            path:'content/:id',
            component: () => import('@/components/content/albumPageComponents/AlbumContent.vue')
          }
        ]
      },
      {
        path:'/aboutMe',
        component: () => import('@/views/homeViews/AboutMe.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginView/LoginView.vue')
  },
  {
    path: '/articleList',
    name: 'articleList',
    component: () => import('../views/articleViews/ArticleListView.vue')
  },
  {
    path:'/editor',
    component: () => import("../views/articleViews/ArticleEditorView.vue"),
    beforeEnter: (from, to, next)=>{ 
      //判断token是否过期
      getCurrentUser().then(res => {
        if(res.success){
          next()
        }else{
          Message('登录信息过期啦，请先登录哦！')
          next('/login')
        }
      })
      
     }
  },
  {
    path:'/article/:id',
    component: () => import("../views/articleViews/ArticleView.vue"),
    props:true
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode:'history',
  routes
})

export default router
