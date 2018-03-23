<template>
<div>
    <Search :searchConfig="searchConfig" ></Search>
    <el-card>
        <el-table class="tm-table" border :data="list" >
            <el-table-column align="center" prop="authStatus" label="状态" ></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" ></el-table-column>
            <el-table-column align="center" prop="company" label="公司" ></el-table-column>
            <el-table-column align="center" prop="title" label="岗位" ></el-table-column>
            <el-table-column align="center" prop="wechat" label="微信号" ></el-table-column>
            <el-table-column align="center" prop="phone" label="联系电话" ></el-table-column>
            <el-table-column align="center" prop="email" label="邮箱" ></el-table-column>
            <el-table-column align="center" prop="addTimestamp" label="申请时间" ></el-table-column>
            <el-table-column align="center" label="详细信息" >
                <template slot-scope="scope">
                    <el-button @click="showReason(scope.row.reason,'详细信息')" type="text" >查看原因</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" min-width="160px" label="操作" >
                <template slot-scope="scope">
                    <el-button type="primary" class="tm-btn" >通过</el-button>
                    <el-button class="tm-btn-border" >驳回</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="240px" label="冻结操作" >
                <template slot-scope="scope">
                    <div v-show="scope.row.suspend>0" >
                        <span>已冻结</span>
                        <el-button type="text" @click="showReason(scope.row.suspendReason,'冻结原因')" v-show="scope.row.suspend>0">查看原因</el-button>
                        <el-button v-show="scope.row.suspend>0" class="tm-btn-border" >解冻</el-button>
                    </div>
                    <el-button v-show="scope.row.suspend==0" type="primary" class="tm-btn" >冻结</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>
<script>
import mapAttr from '@comp/lib/api_maps.js';
import Search from '@layout/search.vue';

export default {
    name: 'school_manage',
    data() {
        return {
            searchConfig: {},
            list: [
                {
                    authStatus: mapAttr['authStatus'][1],
                    name: 'haha', // 演讲者名称
                    sex: 1, // 性别：1=女；2=男
                    company: '2a', // 公司
                    title: 'asd', // 工作岗位
                    wechat: 'asd', // 微信号
                    phone: 'asd', // 联系电话
                    email: 'asd', // 邮箱
                    suspend: 0, // 冻结：0=否；1=是
                    addTimestamp: mapAttr.dateformat(123),
                    reason: 'haha',
                    suspendReason: 'mmm'
                },
                {
                    authStatus: mapAttr['authStatus'][1],
                    name: 'haha', // 演讲者名称
                    sex: 1, // 性别：1=女；2=男
                    company: '2a', // 公司
                    title: 'asd', // 工作岗位
                    wechat: 'asd', // 微信号
                    phone: 'asd', // 联系电话
                    email: 'asd', // 邮箱
                    suspend: 1, // 冻结：0=否；1=是
                    addTimestamp: mapAttr.dateformat(123),
                    reason: 'haha',
                    suspendReason: 'mmm'
                }
            ],
            modal: {}
        };
    },
    components: {
        Search
    },
    methods: {
        showReason(reason, title) {
            this.$alert(reason, title).catch(() => {});
        }
    }
};
</script>
<style lang="scss">

</style>


