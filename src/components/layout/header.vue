<template>
    <el-header height="70px" class="admin-header">
        <div class="logo">
            <router-link to="/" ><img :src="logo" alt="logo"></router-link>
        </div>
        <ul class="header-right">
            <li class="nav-header-item">
                <router-link to="/" > <span>管理中心</span> </router-link>
            </li>
            <li class="nav-header-item">
                <a :href="baseURL">网站首页</a>
            </li>
            <!-- 未登录 -->
            <li v-show="+users.isLogin < 1" class="nav-header-item"  >
                <router-link to="/login" >  请登陆</router-link>
            </li>
            <!-- 已登录 -->
            <li v-show="+users.isLogin > 0" class="nav-header-item user-logo">
                <el-dropdown trigger="click" type="primary">
                    <span class="el-dropdown-link">
                        <img :src="users.profilePhotoUrl"  alt="user">
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item disabled >账号</el-dropdown-item>
                        <el-dropdown-item>{{users.account}}</el-dropdown-item>
                        <el-dropdown-item disabled >身份</el-dropdown-item>
                        <el-dropdown-item>{{attrs["userType"][users.userType]}}</el-dropdown-item>
                        <el-dropdown-item @click.native="handleSignout" divided>
                            <a class="tm-link" href="#">登出</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </el-header>
</template>

<script>
import logo from '@image/logo/logo_white.png';
import { baseURL, attrs } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    // data 在实例里可以用对象，但在组件中必须用函数形式
    data() {
        return {
            logo,
            attrs,
            baseURL
        };
    },
    // 方便 属性使用 mapState
    computed: mapState({
        users: state => state.common.users
    }),
    mounted() {
        this.getUserLogin({ baseURL });
    },
    methods: {
        ...mapMutations(['getUserLogin', 'signout']),
        handleSignout() {
            this.signout({
                onSuccess: res => {
                    this.$router.push({ path: '/login' });
                }
            });
        }
    }
};
</script>
<style scoped >
.el-dropdown-menu__item {
    text-align: center;
}
</style>
