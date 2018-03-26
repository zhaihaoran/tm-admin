<template>
    <div>
        <div class="tm-card">
            <el-radio-group v-model="orderType" class="radio-group" >
                <el-radio-button label="0">综合排序</el-radio-button>
                <el-radio-button label="1">申请时间</el-radio-button>
            </el-radio-group>
            <div class="search-input">
                <el-input placeholder="学校名称" v-model="schoolName" suffix-icon="el-icon-search" ></el-input>
            </div>
        </div>
        <div class="tm-card">
            <Table v-loading="loading" :data="data" >
                <el-table-column
                    prop="name"
                    align="center"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    align="center"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="company"
                    align="center"
                    label="公司">
                </el-table-column>
                <el-table-column
                    prop="title"
                    align="center"
                    label="岗位">
                </el-table-column>
                <el-table-column
                    prop="wechat"
                    align="center"
                    label="微信号">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    align="center"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="email"
                    align="center"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    align="center"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="详细信息">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showReason(scope.row.reason)" >查看/修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                min-width="120px"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <Operation ></Operation>
                    </template>
                </el-table-column>
            </Table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Table from '@layout/table.vue';
import Operation from '@layout/op_manage.vue';

export default {
    data() {
        return {
            loading: true,
            orderType: 0,
            schoolName: 11,
            data: [
                {
                    name: '石家庄实验中学',
                    sex: '男',
                    company: '北京大学',
                    title: '程序员',
                    wechat: 'zzq234',
                    phone: '13888888888',
                    email: 'zzq@sina.com',
                    addTimestamp: 60
                }
            ]
        };
    },
    components: { Operation, Table },
    methods: {
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        }
    }
};
</script>


