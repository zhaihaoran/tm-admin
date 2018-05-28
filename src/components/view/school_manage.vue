<template>
<div>
    <Search :cfg="searchCfg" ref="sr_component" >
        <template slot-scope="props" >
            <div class="search-input">
                <el-input @keyup.native.enter="handleSearch" placeholder="学校名称" v-model="searchCfg.searchText" suffix-icon="el-icon-search" ></el-input>
            </div>
        </template>
    </Search>
    <el-card>
        <Table :loading="tableLoading" :data="data" >
            <el-table-column width="100" :formatter="formatAttr" align="center" prop="authStatus" label="认证状态" ></el-table-column>
            <el-table-column
                prop="name"
                align="center"
                show-overflow-tooltip
                label="学校">
                <template slot-scope="scope">
                    <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="address" label="学校地址" ></el-table-column>
            <el-table-column align="center" prop="teacher" label="责任老师" ></el-table-column>
            <el-table-column align="center" width="120" prop="teacherPhone" label="联系电话" ></el-table-column>
            <el-table-column align="center" prop="addTimestamp" width="140px" label="申请时间" >
                <template slot-scope="scope">
                    {{dateformat(scope.row.addTimestamp)}}
                </template>
            </el-table-column>
            <el-table-column align="center" width="100px" label="详细信息" >
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleShowReason(scope.row)" type="text" >查看/修改</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="170" label="操作" >
                <template slot-scope="scope" >
                    <Operation :handleEdit="handleEdit" :scope="scope" type="schoolId" :action="actions" ></Operation>
                </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" width="230" label="冻结操作" >
                <template slot-scope="scope">
                    <div v-if="scope.row.suspend && +scope.row.suspend > 0" >
                        <span>已冻结</span>
                        <el-button size="mini" class="no-ml" type="text" @click="showReason(scope.row.suspendDesc)" >查看原因</el-button>
                        <el-button size="mini" class="tm-btn-border no-ml" @click="handleUnsuspend(scope.row)" >解冻</el-button>
                    </div>
                    <el-button size="mini" v-else type="primary" class="tm-btn" @click="handleOnModal(scope.row)" >冻结</el-button>
                </template>
            </el-table-column>
        </Table>
        <Pagination :cfg="searchCfg" :count="count" ></Pagination>
        <!-- 查看原因 -->
        <EditSchool :data="form" v-on:modal="handleClose" title="修改信息" :modal="modal.reason" ></EditSchool>
        <!-- 冻结账户 -->
        <el-dialog
            :visible.sync="modal.suspend"
            width="500px"
        >
            <h3 class="text-center modal-title" >确定冻结账号吗？</h3>
            <span class="mb-20" >请填写冻结原因</span>
            <el-form ref="form" >
                <el-form-item class="no-margin" >
                    <el-input type="textarea" v-model="suspendDesc" class="tm-textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.suspend=false">取 消</el-button>
                <el-button class="tm-btn" :disabled="suspendDesc.length == 0" type="primary" @click="handleSuspend">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</div>
</template>
<script>
import { commonPageInit } from '@comp/lib/api_maps.js';

import common from '@comp/mixin/common';
import check from '@comp/mixin/check';
import suspend from '@comp/mixin/suspend';

import Table from '@layout/table.vue';
import Search from '@layout/apply_search.vue';
import Pagination from '@layout/pagination.vue';
import Operation from '@layout/operation.vue';
import EditSchool from '@layout/modal/editSchool.vue';

export default {
    name: 'school_manage',
    mixins: [common, check, suspend],
    data() {
        return {
            searchCfg: {
                act: 'getSchoolApplicationList',
                orderType: this.orderType,
                searchText: '',
                authStatus: 0
            },
            actions: {
                ok: 'passSchoolApplication',
                refuse: 'rejectSchoolApplication'
            }
        };
    },
    components: {
        Pagination,
        Table,
        EditSchool,
        Operation,
        Search
    },
    mounted() {
        commonPageInit(this, {
            act: 'getSchoolApplicationList'
        });
    },
    methods: {
        handleShowReason(obj) {
            this.modal.reason = true;
            this.getFormData({
                act: 'getSchoolApplication',
                schoolId: obj.schoolId,
                onSuccess: res => {
                    this.form = res.data.data;
                    this.form.schoolId = obj.schoolId;
                    this.update({
                        classroomPhotoShortPathFilename: this.form
                            .classroomPhotoShortPathFilename,
                        classroomPhotoUrl: this.form.classroomPhotoUrl,
                        schoolPhotoShortPathFilename: this.form
                            .schoolPhotoShortPathFilename,
                        schoolPhotoUrl: this.form.schoolPhotoUrl
                    });
                }
            });
        }
    }
};
</script>



