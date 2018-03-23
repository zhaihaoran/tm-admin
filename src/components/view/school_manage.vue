<template>
<div>
    <Search :searchConfig="searchConfig" ></Search>
    <el-card>
        <el-table class="tm-table" border :data="list" >
            <el-table-column align="center" prop="authStatus" label="认证状态" ></el-table-column>
            <el-table-column align="center" prop="name" label="学校名称" ></el-table-column>
            <el-table-column align="center" prop="address" label="学校地址" ></el-table-column>
            <el-table-column align="center" prop="teacher" label="责任老师" ></el-table-column>
            <el-table-column align="center" prop="teacherPhone" label="联系电话" ></el-table-column>
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
                    schoolId: '1', // 学校ID
                    authStatus: mapAttr['authStatus'][1],
                    name: 'hahaha', // 学校名称
                    address: 'ads', // 学校地址
                    teacher: 'asd', // 责任老师
                    teacherPhone: '132', // 责任教师联系电话
                    addTimestamp: mapAttr.dateformat(123),
                    suspend: 0, // 冻结：0=否；1=是
                    isPoor: mapAttr.isPoor[0], // 认证贫困：0=否；1=是
                    classQuantity: 3,
                    reason: 'haha',
                    suspendReason: 'mmm'
                },
                {
                    schoolId: '2', // 学校ID
                    authStatus: mapAttr['authStatus'][2],
                    name: 'hahaha', // 学校名称
                    address: 'ads', // 学校地址
                    teacher: 'asd', // 责任老师
                    teacherPhone: '132', // 责任教师联系电话
                    addTimestamp: mapAttr.dateformat(12345),
                    suspend: 1,
                    reason: 'haha',
                    suspendReason: 'mmm',
                    isPoor: mapAttr.isPoor[1],
                    classQuantity: 3
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


