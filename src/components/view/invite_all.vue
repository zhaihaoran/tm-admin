<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <div class="search-input">
                    <SlRemote placeholder="学校名称" v-on:id="handleUpdateSchoolId" :id="searchCfg.schoolId" action="getSelectOptions" ></SlRemote>
                </div>
                <div class="search-input">
                    <SlRemote placeholder="演讲者名称" v-on:id="handleUpdateSpeakerId" :id="searchCfg.speakerId" action="getSelectOptions" ></SlRemote>
                </div>
                <div class="search-input">
                    <Timerange></Timerange>
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
                    label="学校进展">
                    <template slot-scope="scope">
                        <el-button @click="handleGetStatus(scope.row)" type="text" v-popover:schoolpopover >
                            {{attrs['schoolStatus'][scope.row.schoolStatus]}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    label="演讲者进展">
                    <template slot-scope="scope">
                        <el-button @click="handleGetStatus(scope.row)" type="text" v-popover:speakerpopover >
                            {{attrs['speakerStatus'][scope.row.speakerStatus]}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="学校反馈">
                    <template slot-scope="scope">
                        <el-button v-show="scope.row.status == 4" type="text" @click="showReason(scope.row)" >查看原因</el-button>
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

            <!-- 学校进度 popover -->
            <ScProgress :active="schoolProgress" ref="schoolpopover" ></ScProgress>
            <!-- 演讲者进度 popover -->
            <SpProgress :active="speakerProgress" ref="speakerpopover" ></SpProgress>

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
import SlRemote from '@layout/slremote.vue';
import Operation from '@layout/invite_operation.vue';
import EditInvite from '@layout/modal/editInvite.vue';

import Table from '@layout/table.vue';
import Timerange from '@layout/timerange.vue';
import Search from '@layout/search.vue';
import MessageBox from '@layout/modal/message.vue';

import axios from 'axios';

import ResponseDialog from '@layout/modal/response.vue';
import img from '../../assets/image/admin/camera.png';

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
                schoolId: '',
                speakerId: ''
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
            status: state => state.search.status,
            feedList: state => state.search.feedList,
            schoolProgress: state => state.progress.schoolProgress,
            speakerProgress: state => state.progress.speakerProgress
        })
    },
    components: {
        Search,
        ScProgress,
        SpProgress,
        SlRemote,
        Operation,
        MessageBox,
        EditInvite,
        Table,
        Timerange,
        Pagination,
        ResponseDialog
    },
    mounted() {
        commonPageInit(
            this,
            { status: 0 },
            {
                act: 'getAppointmentList',
                status: 0
            }
        );
    },
    methods: {
        formatAttr,
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getProgressStatus',
            'getRejectDesc'
        ]),

        handleUpdateSchoolId(value) {
            this.searchCfg.schoolId = value;
        },

        handleUpdateSpeakerId(value) {
            this.searchCfg.speakerId = value;
        },

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
        },
        // 获取邀约状态
        handleGetStatus(obj, value, active) {
            this.getProgressStatus({
                schoolProgress: obj.schoolStatus,
                speakerProgress: obj.speakerStatus
            });
            active = value;
        }
    }
};
</script>


