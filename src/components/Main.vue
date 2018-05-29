<template>
    <!-- 主视图 -->
    <div>
        <Loading v-show="loading" ></Loading>
        <Header />
        <el-container class="admin-context" >
            <Sidebar />
            <el-main class="admin-wrapper" >
                <router-view/>
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
    components: { Sidebar, Header, Loading },
    computed: {
        ...mapState({
            loading: state => state.common.routeLoading
        })
    }
};
</script>
