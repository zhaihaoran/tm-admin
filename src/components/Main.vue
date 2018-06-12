<template>
    <!-- 主视图 -->
    <div>
        <Loading v-show="loading" ></Loading>
        <Header />
        <el-container class="admin-context" >
            <Sidebar />
            <el-main class="admin-wrapper" >
                <!-- 实现 route 动画 -->
                <transition :name="transitionName">
                    <router-view class="routerClass" />
                </transition>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Sidebar from '@layout/sidebar.vue';
import Header from '@layout/header.vue';
import Loading from '@layout/loading.vue';

import { mapState } from 'vuex';

export default {
    name: 'Main',
    data() {
        return {
            transitionName: 'slide-right' // 默认动态路由变化为slide-right
        };
    },
    watch: {
        $route(to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            /* 只能针对父子嵌套 */
            this.transitionName =
                toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }
    },
    components: { Sidebar, Header, Loading },
    computed: {
        ...mapState({
            loading: state => state.common.routeLoading
        })
    }
};
</script>
<style>
.routerClass {
    position: absolute;
    width: calc(100% - 40px);
    transition: all 0.2s ease;
}

.slide-left-enter {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
}
.slide-left-leave-active {
    opacity: 0;
}
.slide-right-enter {
    opacity: 1;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px 0);
}
.slide-right-leave-active {
    opacity: 0;
}
</style>

