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
    <el-card>
        <Table :isPagination="false" :data="list"  >
            <el-table-column :formatter="formatAttr" align="center" prop="authStatus" label="认证状态" ></el-table-column>
            <el-table-column align="center" prop="name" label="学校名称" ></el-table-column>
            <el-table-column align="center" prop="address" label="学校地址" ></el-table-column>
            <el-table-column align="center" prop="teacher" label="责任老师" ></el-table-column>
            <el-table-column align="center" prop="teacherPhone" label="联系电话" ></el-table-column>
            <el-table-column align="center" prop="addTimestamp" label="申请时间" ></el-table-column>
            <el-table-column align="center" width="100px" label="详细信息" >
                <template slot-scope="scope">
                    <el-button size="mini" @click="showReason(scope.row.reason,'详细信息')" type="text" >查看原因</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="160px" label="操作" >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" class="tm-btn" >通过</el-button>
                    <el-button size="mini" class="tm-btn-border" >驳回</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="240px" label="冻结操作" >
                <template slot-scope="scope">
                    <div v-show="scope.row.suspend>0" >
                        <span>已冻结</span>
                        <el-button size="mini" type="text" @click="showReason(scope.row.suspendReason,'冻结原因')" v-show="scope.row.suspend>0">查看原因</el-button>
                        <el-button size="mini" v-show="scope.row.suspend>0" class="tm-btn-border" >解冻</el-button>
                    </div>
                    <el-button size="mini" v-show="scope.row.suspend==0" type="primary" class="tm-btn" >冻结</el-button>
                </template>
            </el-table-column>
        </Table>
    </el-card>
</div>
</template>
<script>
import axios from 'axios';
import Table from '@layout/table.vue';
import { formatAttr } from '@comp/lib/api_maps.js';

export default {
    name: 'school_manage',
    data() {
        return {
            loading: true,
            orderType: 0,
            schoolName: 11,
            list: [
                {
                    schoolId: '1', // 学校ID
                    authStatus: 1,
                    name: 'hahaha', // 学校名称
                    address: 'ads', // 学校地址
                    teacher: 'asd', // 责任老师
                    teacherPhone: '132', // 责任教师联系电话
                    addTimestamp: 12123123,
                    suspend: 0, // 冻结：0=否；1=是
                    isPoor: 0, // 认证贫困：0=否；1=是
                    classQuantity: 3,
                    reason: 'haha',
                    suspendReason: 'mmm'
                },
                {
                    schoolId: '2', // 学校ID
                    authStatus: 2,
                    name: 'hahaha', // 学校名称
                    address: 'ads', // 学校地址
                    teacher: 'asd', // 责任老师
                    teacherPhone: '132', // 责任教师联系电话
                    addTimestamp: 12123123,
                    suspend: 1, // 冻结：0=否；1=是
                    isPoor: 0, // 认证贫困：0=否；1=是
                    reason: 'haha',
                    suspendReason: 'mmm',
                    classQuantity: 3
                }
            ],
            modal: {}
        };
    },
    components: {
        Table
    },
    methods: {
        formatAttr,
        showReason(reason, title) {
            this.$alert(reason, title).catch(() => {});
        }
    }
};
</script>



