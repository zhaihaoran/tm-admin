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
                    <el-button size="mini" @click="handleShowReason(scope.row)" type="text" >查看原因</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="160px" label="操作" >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" class="tm-btn" @click="handleSuccess" >通过</el-button>
                    <el-button size="mini" class="tm-btn-border" @click="handleReject" >驳回</el-button>
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
        <!-- 查看原因 -->
        <EditSchool :data="rowData" v-on:modal="handleClose('showReason')" title="修改信息" :modal="modal.showReason" ></EditSchool>
        <!-- 驳回 -->
        <Reject v-on:modal="handleClose('reject')"  :modal="modal.reject" ></Reject>
    </el-card>
</div>
</template>
<script>
import axios from 'axios';
import Table from '@layout/table.vue';
import EditSchool from '@layout/modal/editSchool.vue';
import Reject from '@layout/modal/reject.vue';
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
            modal: {
                showReason: false,
                reject: false
            },
            rowData: {
                radios: 3,
                name: '',
                address: '',
                teacher: '',
                teacherPhone: '',
                pic1: '',
                pic2: '',
                delivery: false,
                type: [],
                resource: '',
                freeinfo: '',
                radio: true,
                remainCount: 12
            }
        };
    },
    components: {
        Table,
        EditSchool,
        Reject
    },
    methods: {
        formatAttr,
        showReason(reason, title) {
            this.$alert(reason, title).catch(() => {});
        },
        handleShowReason(data) {
            const id = '3';
            console.log(this.rowData);
            this.modal.showReason = true;
        },
        handleClose(modalName) {
            this.modal[modalName] = false;
        },
        handleSuccess() {
            this.modal.reject = false;
        },
        handleReject() {
            this.modal.reject = true;
        }
    }
};
</script>



