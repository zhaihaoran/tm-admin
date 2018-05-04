<template>
    <!-- 主视图 -->
    <div>
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
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Main',
    components: { Sidebar, Header },
    mounted() {
        this.getUserLogin();
    },
    methods: {
        ...mapMutations(['getUserLogin'])
    }
};
</script>
