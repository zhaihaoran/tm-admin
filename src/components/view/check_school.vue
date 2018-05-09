<template>
    <div>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props"  >
                <div class="search-input">
                    <el-input @keyup.native.enter="handleSearch" placeholder="学校名称" v-model="searchCfg.searchText" suffix-icon="el-icon-search" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    prop="name"
                    align="center"
                    label="学校名称">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    show-overflow-tooltip
                    label="学校地址">
                </el-table-column>
                <el-table-column
                    prop="teacher"
                    align="center"
                    label="责任老师">
                </el-table-column>
                <el-table-column
                    prop="teacherPhone"
                    align="center"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    width="140px"
                    align="center"
                    label="申请时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="classQuantity"
                    align="center"
                    label="课程剩余">
                </el-table-column>
                <el-table-column
                    align="center"
                    width="110"
                    label="详细信息">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleShowReason(scope.row)" type="text" >查看/修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180px"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <Operation :is-hidden="true" :handleEdit="handleEdit" :scope="scope" type="schoolId" :action="actions" ></Operation>
                    </template>
                </el-table-column>
            </Table>
            <!-- 查看原因 -->
            <EditSchool :data="form" v-on:modal="handleClose" title="修改信息" :modal="modal" ></EditSchool>
            <!-- 分页 -->
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
        </div>
    </div>
</template>
<script>
import { commonPageInit } from '@comp/lib/api_maps.js';

import common from '@comp/mixin/common';
import check from '@comp/mixin/check';

import Search from '@layout/apply_search.vue';
import EditSchool from '@layout/modal/editSchool.vue';
import Table from '@layout/table.vue';
import Operation from '@layout/operation.vue';
import Pagination from '@layout/pagination.vue';

export default {
    mixins: [common, check],
    data() {
        return {
            searchCfg: {
                act: 'getSchoolApplicationList',
                authStatus: 2,
                orderType: this.orderType,
                searchText: ''
            },
            actions: {
                ok: 'passSchoolApplication',
                refuse: 'rejectSchoolApplication'
            }
        };
    },
    mounted() {
        commonPageInit(this, {
            act: 'getSchoolApplicationList',
            authStatus: 2
        });
    },
    components: { Operation, Table, Pagination, Search, EditSchool },
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


