<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input placeholder="演讲者名称" v-model="searchCfg.searchText" suffix-icon="el-icon-search" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
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
                    width="140px"
                    align="center"
                    label="申请时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
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
                        <Operation :handleEdit="handleEdit" :scope="scope" type="speakerId" :action="actions" ></Operation>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import { dateformat, commonPageInit } from '@comp/lib/api_maps.js';

import Table from '@layout/table.vue';
import Operation from '@layout/operation.vue';
import Pagination from '@layout/pagination.vue';

export default {
    data() {
        return {
            searchCfg: {
                act: 'getSpeakerApplicationList',
                orderType: this.orderType,
                searchText: '11',
                authStatus: 0
            },
            actions: {
                ok: '',
                delete: '',
                refuse: ''
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
            act: 'getSpeakerApplicationList'
        });
    },
    components: { Operation, Table, Pagination },
    methods: {
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getRejectDesc'
        ]),
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        }
    }
};
</script>


