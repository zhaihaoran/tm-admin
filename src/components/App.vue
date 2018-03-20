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
        isLogin: state => state.common.login_state
    }),
    // 通用状态初始化
    mounted() {
        this.initState();
    },
    methods: {
        ...mapMutations(['initState'])
    }
};
</script>
<style lang="scss">
@import '../scss/variable/_school.scss';
@import '../scss/lib/admin_common.scss';
</style>


