import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'

import '@/assets/css/iconfont.css'

//elementUI按需引用
import element from './components/elements'

//引入elementui
Vue.use(element)

// 全局注册
// import with ES6
// import mavonEditor from 'mavon-editor'
// // markdown-it对象：md.s_markdown, md => mavonEditor实例
// //                 or
// //                 mavonEditor.markdownIt 
// import 'mavon-editor/dist/css/index.css'
// // use
// Vue.use(mavonEditor)
// new Vue({
// 	'el': '#main',
// 	data() {
// 		return { value: '' }
// 	}
// })

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//禁止用户放大/缩小页面
document.addEventListener('keydown', function (event) {
	if ((event.ctrlKey === true || event.metaKey === true)
		&& (event.keyCode === 61 || event.keyCode === 107
			|| event.keyCode === 173 || event.keyCode === 109
			|| event.keyCode === 187 || event.keyCode === 189)) {
		event.preventDefault();
	}
}, false);

window.ResizeObserver = undefined;




