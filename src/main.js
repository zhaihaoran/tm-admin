import Vue from 'vue'

import App from '@comp/App.vue'
import router from '@route/index'
import store from '@store/index'

// 事先判断是否登陆
store.dispatch('getUserLogin').then(()=>{
    // 拦截器
    router.beforeEach((to, from, next) => {
        // 如果跳转到其他网站，则404
        if (to.matched.length < 1) {
            next({
                path: '/404',
            })
        }
        // 判断该路由是否需要登录权限
        // deprecated: 判断用户是否登陆,必须在所有模块没有加载前，就事先取到login状态，并将其放入sessionStorage中,由于sessionStorage里不能存布尔值，会默认转成字符串，所以用数字。
        if (to.meta.requireAuth) {
            if (store.state.common.login) {
                store.dispatch("onLoading", true);
                next();
            } else {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
            next();
        }
    })

    /* 为了美观加点延迟，不影响加载 */
    router.afterEach((to, from) => {
        setTimeout(function(){
            store.dispatch("onLoading", false);
        },1000)
    })
})


// config -- scss
import '@scss/theme/index.css'
import '@scss/admin_common.scss';

// config -- axios
import '@comp/lib/axios_config'

// icon
import 'assets/icon/iconfont.css'
import ElementUI from 'element-ui'

// plugin -- draggable
import vSelect from 'vue-select'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('v-select', vSelect)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
