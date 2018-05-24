<template>
    <el-header height="70px" class="admin-header">
        <div class="logo">
            <router-link to="/" ><img :src="logo" alt="logo"></router-link>
        </div>
        <ul class="header-right">
            <li class="nav-header-item flex-right left" >
                <a target="_blank" :href="baseURL">网站首页</a>
            </li>
            <li :class="[navClass]">
                <router-link to="/" >途梦管理中心</router-link>
            </li>

            <!-- 未登录 -->
            <li v-show="!login" class="nav-header-item"  >
                <router-link to="/login" >请登陆</router-link>
            </li>
            <!-- 已登录 -->
            <li v-show="login" class="nav-header-item user-logo">
                <el-dropdown trigger="click" type="primary">
                    <span class="el-dropdown-link">
                        <img :src="handleAvatar(users.profilePhotoUrl)"  alt="user">
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item disabled>账号：{{users.account}}</el-dropdown-item>
                        <el-dropdown-item @click.native="handleSignout" divided>
                            <a @click="handleSignout" class="tm-color" href="#">登出</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </el-header>
</template>

<script>
import logo from '@image/logo/logo_white.png';
import avatar from '@image/avatar.png';
import { baseURL, attrs } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    // data 在实例里可以用对象，但在组件中必须用函数形式
    data() {
        return {
            logo,
            attrs,
            baseURL,
            navClass: 'nav-header-item'
        };
    },
    // 方便 属性使用 mapState
    computed: mapState({
        users: state => state.common.users,
        login: state => state.common.login
    }),
    methods: {
        ...mapMutations(['signout']),
        handleSignout() {
            this.signout({
                onSuccess: res => {
                    this.$router.push({ path: '/login' });
                }
            });
        },
        handleAvatar(url) {
            return url || avatar;
        }
    }
};
</script>
<style lang="scss" scoped>
.el-dropdown-menu__item {
    text-align: center;
}
.flex-right {
    margin-right: auto;
}
</style>
