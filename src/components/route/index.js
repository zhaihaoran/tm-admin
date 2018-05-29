import Vue from 'vue'
import Router from 'vue-router'

// 登陆
import Login from '@comp/Login.vue'

// 主页面
import Main from '@comp/Main.vue'

Vue.use(Router)

// 默认路由，通过重定向实现

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/common/check_school'
        },
        {
            path: '/404',
            name: '404',
            component: resolve => require(['@comp/view/errorPage.vue'], resolve),
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/common',
            component: Main,
            children: [{
                path: 'check_school',
                name: 'check_school',
                component: resolve => require(['@comp/view/check_school.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'check_speaker',
                name: 'check_speaker',
                component: resolve => require(['@comp/view/check_speaker.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'invite_manage',
                name: 'invite_manage',
                component: resolve => require(['@comp/view/invite_manage.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'invite_all',
                name: 'invite_all',
                component: resolve => require(['@comp/view/invite_all.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'manage_school',
                name: 'school_manage',
                component: resolve => require(['@comp/view/school_manage.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'manage_speaker',
                name: 'speaker_manage',
                component: resolve => require(['@comp/view/speaker_manage.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'video_manage',
                name: 'video_manage',
                component: resolve => require(['@comp/view/video_manage.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'video_category',
                name: 'video_category',
                component: resolve => require(['@comp/view/video_category.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'video_setting_top',
                name: 'video_setting_top',
                component: resolve => require(['@comp/view/video_setting_top.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }, {
                path: 'video_setting_hot',
                name: 'video_setting_hot',
                component: resolve => require(['@comp/view/video_setting_hot.vue'], resolve),
                meta: {
                    requireAuth: true,
                },
            }]
        },
    ]
})

export default router;
