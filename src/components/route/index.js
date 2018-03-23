import Vue from 'vue'
import Router from 'vue-router'

import Button from '@comp/Button.vue'
// 审核信息
import Check_school from '@comp/view/check_school.vue'
import Check_speaker from '@comp/view/check_speaker.vue'
// 邀约信息
import Invite_manage from '@comp/view/invite_manage.vue'
import Invite_all from '@comp/view/invite_all.vue'
// 学校信息
import School_manage from '@comp/view/school_manage.vue'
import Speaker_manage from '@comp/view/speaker_manage.vue'
// 演讲视频
import Video_manage from '@comp/view/video_manage.vue'
import Video_recommend from '@comp/view/video_recommend.vue'
import Video_category from '@comp/view/video_category.vue'
//
import Video_setting_top from '@comp/view/video_setting_top.vue'
import Video_setting_hot from '@comp/view/video_setting_hot.vue'
// error
import ErrorPage from '@comp/view/errorPage.vue'

// 登陆
import Login from '@comp/view/login.vue'

Vue.use(Router)

// 默认路由，通过重定向实现

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/check/school'
    }, {
        path: '/404',
        name: '404',
        component: ErrorPage,
    }, {
        path: '/check/school',
        name: 'check_school',
        component: Check_school,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/check/speaker',
        name: 'check_speaker',
        component: Check_speaker,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/invite/manage',
        name: 'invite_manage',
        component: Invite_manage,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/invite/all',
        name: 'invite_all',
        component: Invite_all,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/manage/school',
        name: 'school_manage',
        component: School_manage,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/manage/speaker',
        name: 'speaker_manage',
        component: Speaker_manage,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/video/manage',
        name: 'video_manage',
        component: Video_manage,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/video/recommend',
        name: 'video_recommend',
        component: Video_recommend,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/video/category',
        name: 'video_category',
        component: Video_category,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/login',
        name: 'login',
        component: Login,
    }, {
        path: '/video/setting/top',
        name: 'video_setting_top',
        component: Video_setting_top,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/video/setting/hot',
        name: 'video_setting_hot',
        component: Video_setting_hot,
        meta: {
            requireAuth: true,
        },
    }],
})

// 拦截器
router.beforeEach((to, from, next) => {
    console.log(to.fullPath)
    // 如果跳转到其他网站，则404
    if (to.matched.length < 1) {
        next({
            path: '/404',
        })
    }
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        // 判断用户是否登陆
        if (+sessionStorage.isLogin > 0) {
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

export default router;
