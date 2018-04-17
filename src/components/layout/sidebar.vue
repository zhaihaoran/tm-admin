<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu router :default-active.sync="path" :default-openeds="['/invite']" class="admin-sider-menu" >
            <router-link v-for="menu in menuList" :key="menu.$index" :to="sidebarRender(menu,'path')" >
                <el-menu-item class="sider-menu-item"
                    :index="sidebarRender(menu,'path')" >
                    {{sidebarRender(menu,'name')}}
                    <span v-if="sidebarRender(menu,'status')" >(
                        {{sidebarRender(menu,'status')[menu.status]}}
                    )</span>
                </el-menu-item>
                <div class="dividar" v-show="sidebarRender(menu,'dividar')" ></div>
            </router-link>
        </el-menu>
    </el-aside>
</template>

<script>
import { sidebarRender } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            path: this.$route.path,
            iconfont: 'icon iconfont sd-icon'
        };
    },
    mounted() {
        this.getMenuList();
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: mapState({
        menuList: state => state.common.menuList,
        users: state => state.common.users
    }),
    methods: {
        sidebarRender,
        ...mapMutations(['getMenuList'])
    }
};
</script>
<style lang="scss" scoped>
.dividar {
    height: 2px;
    background: #d4d4d4;
}
.sd-icon {
    margin-right: 8px;
    font-size: 16px;
}
</style>

