<template>
    <div>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input @keyup.native.enter="handleSearch" placeholder="梦享家名称" v-model="searchCfg.searchText" suffix-icon="el-icon-search" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    prop="name"
                    align="center"
                    label="姓名">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSpeakerHome(scope.row.speakerId)">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sex"
                    :formatter="formatAttr"
                    align="center"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="company"
                    align="center"
                    show-overflow-tooltip
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
                    show-overflow-tooltip
                    label="邮箱">
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
                        <Operation :is-hidden="true" :handleEdit="handleEdit" :scope="scope" type="speakerId" :action="actions" ></Operation>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
            <!-- 查看/修改 -->
            <EditSpeaker :data="form" v-on:modal="handleClose" title="修改信息" :modal="modal" ></EditSpeaker>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import {
    dateformat,
    commonPageInit,
    toSpeakerHome,
    formatAttr
} from '@comp/lib/api_maps.js';

import Table from '@layout/table.vue';
import Search from '@layout/apply_search.vue';
import Operation from '@layout/operation.vue';
import Pagination from '@layout/pagination.vue';
import EditSpeaker from '@layout/modal/editSpeaker.vue';

export default {
    data() {
        return {
            modal: false,
            form: {},
            searchCfg: {
                act: 'getSpeakerApplicationList',
                authStatus: 2,
                orderType: this.orderType,
                searchText: ''
            },
            actions: {
                ok: 'passSpeakerApplication',
                refuse: 'rejectSpeakerApplication'
            }
        };
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage,
            status: state => state.search.status
        })
    },
    mounted() {
        commonPageInit(this, {
            act: 'getSpeakerApplicationList',
            authStatus: 2
        });
    },
    components: { Operation, Table, Pagination, Search, EditSpeaker },
    methods: {
        formatAttr,
        dateformat,
        toSpeakerHome,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'update',
            'getFormData',
            'getRejectDesc'
        ]),
        handleShowReason(obj) {
            this.modal = true;
            this.getFormData({
                act: 'getSpeakerApplication',
                speakerId: obj.speakerId,
                onSuccess: res => {
                    this.form = res.data.data;
                    this.form.speakerId = obj.speakerId;
                    this.update({
                        photoUrl: this.form.photoUrl,
                        photoShortPathFilename: this.form.photoShortPathFilename
                    });
                }
            });
        },
        handleEdit(index, row) {
            this.showModal(row);
        },
        handleClose() {
            this.modal = false;
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
        }
    }
};
</script>


