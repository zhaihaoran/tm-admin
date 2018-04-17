<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <div class="search-input">
                    <Timerange></Timerange>
                </div>
                <div class="sr-context" >
                    <div class="sr-input">
                        <el-input placeholder="学校名称" v-model="searchCfg.schoolName" suffix-icon="el-icon-search" ></el-input>
                    </div>
                    <div class="sr-input">
                        <el-input placeholder="演讲者名称" v-model="searchCfg.speakerName" suffix-icon="el-icon-search" ></el-input>
                    </div>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :data="data" :loading="tableLoading" >
                <el-table-column
                    type="index"
                    align="center"
                    width="40"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag
                        :type="attrs['status'][scope.row.status+''+scope.row.fromSide].tags"
                        close-transition>
                        {{attrs["status"][scope.row.status+''+scope.row.fromSide].text}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="发起者"
                >
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.fromSide == 1 ? 'primary' : 'success'"
                        close-transition>{{attrs["fromSide"][scope.row.fromSide]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="schoolName"
                    align="center"
                    label="学校">
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    label="演讲者">
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    width="140px"
                    align="center"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）" width="80"
                    >
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    align="center"
                    width="140px"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="schoolStatus"
                    align="center"
                    width="110"
                    label="学校进展">
                    <template slot-scope="scope">
                        <!-- 学校进度 popover -->
                        <ScProgress :scope="scope"></ScProgress>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    width="110"
                    label="演讲者进展">
                    <template slot-scope="scope">
                        <SpProgress :scope="scope"></SpProgress>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="110"
                    label="学校反馈">
                    <template slot-scope="scope">
                        <el-button v-show="scope.row.status == 4" type="text" @click="showReason(scope.row)" >查看/修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="180px"
                    label="操作">
                    <template slot-scope="scope" >
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
            <!-- edit -->
            <EditInvite></EditInvite>

            <ResponseDialog v-on:modal="handleClose" :modal="modal.response" title="哈哈哈" :photos="feedList" ></ResponseDialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';
import ScProgress from '@layout/modal/schoolProgress.vue';
import SpProgress from '@layout/modal/speakerProgress.vue';
import Pagination from '@layout/pagination.vue';
import Operation from '@layout/invite_operation.vue';
import EditInvite from '@layout/modal/editInvite.vue';

import Table from '@layout/table.vue';
import Timerange from '@layout/timerange.vue';
import Search from '@layout/search.vue';
import MessageBox from '@layout/modal/message.vue';

import axios from 'axios';

import ResponseDialog from '@layout/modal/response.vue';

export default {
    data() {
        return {
            attrs,
            form: {},
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined,
                schoolName: '',
                speakerName: ''
            },
            modal: {
                response: false,
                edit: false
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
            feedList: state => state.search.feedList,
            schoolProgress: state => state.progress.schoolProgress,
            speakerProgress: state => state.progress.speakerProgress
        })
    },
    components: {
        Search,
        ScProgress,
        SpProgress,
        Operation,
        MessageBox,
        EditInvite,
        Table,
        Timerange,
        Pagination,
        ResponseDialog
    },
    mounted() {
        commonPageInit(this, {
            act: 'getAppointmentList',
            status: 0
        });
        this.updateValue({
            status: 0
        });
    },
    methods: {
        formatAttr,
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getRejectDesc'
        ]),

        handleEdit(index, row) {
            this.showModal(row);
        },

        showReason(obj) {
            this.getRejectDesc({
                act: 'getRejectDescOfAppointment',
                appointmentId: obj.appointmentId,
                onSuccess: res => {
                    this.$alert(res.data.data.rejectDesc, '拒绝原因').catch(
                        () => {}
                    );
                }
            });
        },

        getResponseList(obj) {
            this.getFeedList({
                act: 'getFeedbackList',
                appointmentId: obj.appointmentId,
                onSuccess: res => {
                    console.log(res);
                }
            });
        },
        handleClose() {
            this.modal.response = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.sr-context {
    margin-top: 10px;
    .sr-input {
        display: inline-block;
        margin-right: 5px;
    }
}
</style>



