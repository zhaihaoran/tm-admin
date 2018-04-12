<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu router v-show="main" :default-active.sync="path" :default-openeds="['/invite']" class="admin-sider-menu"  >
            <router-link v-for="menu in menuList" :key="menu.$index" :to="sidebarRender(menu,'path')" >
                <el-menu-item class="sider-menu-item"
                    :index="sidebarRender(menu,'path')" >
                    <i :class="sidebarRender(menu,'icon')"></i>
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
import axios from 'axios';
import qs from 'qs';
import { attrs, sidebarRender } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            attrs,
            path: this.$route.path
        };
    },
    mounted() {
        // // 只有登陆之后，才拿去菜单列表
        // console.log(sessionStorage.isLogin);
        // if (sessionStorage.isLogin) {
        //     axios({
        //         data: qs.stringify({
        //             act: 'getMenuList'
        //         })
        //     }).then(res => {
        //         const menus = res.data.data.menuList;
        //         this.menuList = menus;
        //         const checkState = +menus.find(el => el.menuId == 20401).status;
        //         console.log(checkState);
        //         this.setValue({ checkState });
        //     });
        //     this.changeSidebarView();
        // }
    },
    updated() {
        this.changeSidebarView();
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: mapState({
        help: state => state.common.help_sidebar,
        main: state => state.common.common_sidebar,
        menuList: state => state.common.menuList
    }),
    methods: {
        sidebarRender,
        ...mapMutations(['setValue', 'switchSidebarView']),
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
<style lang="scss" scoped>
.dividar {
    height: 2px;
    background: #4e4b4b;
}
</style>

