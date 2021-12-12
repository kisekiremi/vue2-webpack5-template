import router from './router'
import Vue from 'vue'
import App from './App'

import './style/main.css'
import './style/app.scss'

Vue.prototype.$setTitle = (title) => {
  document.title = title + ' - ' + '背光前行的旅人'
}

new Vue({
  router,

  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  render: (h) => h(App)
}).$mount('#app')
