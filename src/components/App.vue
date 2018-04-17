<template>
    <el-container class="admin-layout">
        <Header />
        <el-container class="admin-context" >
            <Sidebar v-if="+users.isLogin>0" />
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
        users: state => state.common.users
    })
};
</script>


