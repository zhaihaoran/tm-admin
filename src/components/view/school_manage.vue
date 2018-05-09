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
            <el-table-column align="center" width="230" label="冻结操作" >
                <template slot-scope="scope">
                    <Suspend :scope="scope" ></Suspend>
                </template>
            </el-table-column>
        </Table>
        <Pagination :cfg="searchCfg" :count="count" ></Pagination>
        <!-- 查看原因 -->
        <EditSchool :data="form" v-on:modal="handleClose" title="修改信息" :modal="modal" ></EditSchool>
    </el-card>
</div>
</template>
<script>
import { commonPageInit } from '@comp/lib/api_maps.js';

import common from '@comp/mixin/common';
import check from '@comp/mixin/check';

import Table from '@layout/table.vue';
import Search from '@layout/apply_search.vue';
import Suspend from '@layout/suspend.vue';
import Pagination from '@layout/pagination.vue';
import Operation from '@layout/operation.vue';
import EditSchool from '@layout/modal/editSchool.vue';

export default {
    name: 'school_manage',
    mixins: [common, check],
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
        Suspend,
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
            this.modal = true;
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



