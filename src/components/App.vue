<template>
    <el-container class="admin-layout">
        <Header />
        <el-container class="admin-context" >
            <Sidebar v-show="isLogin>0" />
            <el-main class="admin-wrapper" >
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Sidebar from '@layout/sidebar.vue';
import Header from '@layout/header.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'App',
    components: { Sidebar, Header },
    computed: mapState({
        isLogin: state => state.common.isLogin
    }),
    // 通用状态初始化,存入session中
    mounted() {
        this.getUserLogin({
            act: 'getUserLogin',
            onSuccess: res => {
                // 如登陆，则拿菜单列表
                if (sessionStorage.isLogin > 0) {
                    this.getMenuList();
                }
            }
        });
    },
    methods: {
        ...mapMutations(['getUserLogin'])
    }
};
</script>


