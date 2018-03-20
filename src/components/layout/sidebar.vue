<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu :default-active.sync="path" :default-openeds="['/check','/invites','/schools','/videos']" class="admin-sider-menu" :collapse="sidebarState" >
            <!-- 审核信息 -->
            <el-submenu index="/check">
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">审核信息</span></template>
                <router-link to="/check/school" >
                    <el-menu-item class="sider-menu-item" index="/check/school">
                        学校申请管理
                    </el-menu-item>
                </router-link>
                <router-link to="/check/speaker" >
                    <el-menu-item class="sider-menu-item" index="/check/speaker">
                        演讲者申请管理
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <!-- 邀约信息 -->
            <el-submenu index="/invites">
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">邀约信息</span></template>
                <router-link to="/invite/manage" >
                    <el-menu-item class="sider-menu-item" index="/invite">
                        邀约管理
                    </el-menu-item>
                </router-link>
                <router-link to="/invite/all" >
                    <el-menu-item class="sider-menu-item" index="/invite/all">
                        所有邀约
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <!-- 学校信息 -->
            <el-submenu index="/schools">
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">学校信息</span></template>
                <router-link to="/manage/school" >
                    <el-menu-item class="sider-menu-item" index="/manage/school">
                        学校管理
                    </el-menu-item>
                </router-link>
                <router-link to="/manage/speaker" >
                    <el-menu-item class="sider-menu-item" index="/manage/speaker">
                        演讲者管理
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <!-- 演讲视频 -->
            <el-submenu index="/videos">
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">演讲视频</span></template>
                <router-link to="/video/manage" >
                    <el-menu-item class="sider-menu-item" index="/video/manage">
                        视频管理
                    </el-menu-item>
                </router-link>
                <router-link to="/video/category" >
                    <el-menu-item class="sider-menu-item" index="/video/category">
                        视频分类设置
                    </el-menu-item>
                </router-link>
                <router-link to="/video/setting/hot" >
                    <el-menu-item class="sider-menu-item" index="/video/setting/hot">
                        首页热门视频设置
                    </el-menu-item>
                </router-link>
                <router-link to="/video/setting/top" >
                    <el-menu-item class="sider-menu-item" index="/video/setting/top">
                        首页视频置顶设置
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            path: this.$route.path
        };
    },
    mounted() {
        this.changeSidebarView();
    },
    // 组件每次更新 都要做sidebar渲染处理
    updated() {
        // 每次更新都要确保path实时更新
        this.changeSidebarView();
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: mapState({
        main: state => state.common.common_sidebar,
        sidebarState: state => state.common.sidebar_toggle,
        checkState: state => state.common.check_state
    }),
    methods: {
        ...mapMutations(['switchSidebarView']),
        changeSidebarView() {
            this.path = this.$route.path;
            if (this.path.indexOf('help') > -1) {
                this.switchSidebarView('help');
            } else {
                this.switchSidebarView('main');
            }
        }
    }
};
</script>
