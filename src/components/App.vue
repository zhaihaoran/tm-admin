<template>
    <el-container class="admin-layout">
        <Header v-if="login" />
        <el-container :class="[classes,{login:!login}]" >
            <Sidebar v-if="login" />
            <el-main class="admin-wrapper" >
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Sidebar from '@layout/sidebar.vue';
import Header from '@layout/header.vue';
import { baseURL } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'App',
    components: { Sidebar, Header },
    data: function() {
        return {
            classes: 'admin-context'
        };
    },
    mounted() {
        this.getUserLogin();
    },
    computed: mapState({
        login: state => state.common.login
    }),
    methods: {
        ...mapMutations(['getUserLogin'])
    }
};
</script>


