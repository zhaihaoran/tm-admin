<template>
    <el-header height="70px" class="admin-header">
        <div class="logo">
            <router-link to="/" ><img :src="logo" @click="switchSidebarView('main')" alt="logo"></router-link>
        </div>
        <ul class="header-right">
            <li v-show="loginState === 1" class="nav-header-item">
                <a href="##" @click="handleSignOut" ><i class="icon iconfont icon-tuichudenglu mr-20"></i> <span class="signout-btn">退出</span> </a>
            </li>
            <!-- 未登录 -->
            <li v-show="loginState === 0" class="nav-header-item"  >
                <router-link to="/login" >  请登陆</router-link>
            </li>
        </ul>
    </el-header>
</template>

<script>
import logo from '@image/logo/logo_white.png';
import qinghua from '@image/logo/tsinghua.png';
// action 可以执行异步操作、mutations只能执行同步操作
// actions 提交的是mutation，不直接变更状态，同时通过dispatch分发
import { mapState, mapMutations } from 'vuex';

export default {
    // data 在实例里可以用对象，但在组件中必须用函数形式
    data() {
        return {
            logo,
            user_logo: qinghua
        };
    },
    methods: {
        handleSignOut() {
            this.signout();
            this.$router.push({ path: '/login' });
        },
        ...mapMutations(['switchSidebarView', 'signout'])
    },
    // 方便 属性使用 mapState
    computed: mapState({
        sidebar: state => state.common.sidebar_toggle,
        loginState: state => state.common.login_state
    })
};
</script>
<style scoped >
.mr-20 {
    margin-right: 10px;
    font-size: 28px;
}
.signout-btn {
    line-height: 30px;
    display: inline-block;
    margin-bottom: -4px;
    overflow: hidden;
}
</style>

