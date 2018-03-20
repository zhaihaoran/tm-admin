import Vue from 'vue'
import App from '@comp/App.vue'
import router from '@route/index'
import store from '@store/index'
import '@scss/theme/index.css'
// icon
import 'assets/icon/iconfont.css'
import ElementUI from 'element-ui'

import VueDND from 'awe-dnd'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 拖拽控件
Vue.use(VueDND)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
