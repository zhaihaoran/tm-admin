<template>
    <div>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <Timerange></Timerange>
                </div>
                <div class="sr-context" >
                    <div class="sr-input">
                        <SlRemote placeholder="学校名称" v-on:id="handleUpdateSchoolId" :id="searchCfg.schoolId" action="getSchoolListForInput" >
                            <template slot-scope="scope" >
                                <div class="d-center sl_option">
                                    <div class="sl_image">
                                        <img :src="scope.option.profilePhotoUrl" class="img-fluid" alt="">
                                    </div>
                                    <div class="sl_body">
                                        <h4 class="sl_title">{{scope.option.name}}</h4>
                                        <h5 class="sl_info">{{scope.option.schoolShortDesc}}</h5>
                                    </div>
                                </div>
                            </template>
                        </SlRemote>
                    </div>
                    <div class="sr-input">
                        <SlRemote placeholder="梦享家名称" v-on:id="handleUpdateSpeakerId" :id="searchCfg.speakerId" action="getSpeakerListForInput" >
                            <template slot-scope="scope" >
                                <div class="d-center sl_option">
                                    <div class="sl_image">
                                        <img :src="scope.option.profilePhotoUrl" class="img-fluid" alt="">
                                    </div>
                                    <div class="sl_body">
                                        <h4 class="sl_title">{{scope.option.name}}</h4>
                                        <h5 class="sl_info">{{scope.option.speakerShortDesc}}</h5>
                                    </div>
                                </div>
                            </template>
                        </SlRemote>
                    </div>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :data="data" :loading="tableLoading" >
                <el-table-column
                    prop="status"
                    align="center"
                    fixed
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag
                        :type="handleRendorState(scope.row,'tags')"
                        close-transition>
                        {{handleRendorState(scope.row,'text')}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fromSide"
                    align="center"
                    fixed
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
                    fixed
                    label="学校">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.schoolName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    fixed
                    label="梦享家">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSpeakerHome(scope.row.speakerId)">{{scope.row.speakerName}}</a>
                    </template>
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
                    label="演讲时长" width="80"
                    >
                    <template slot-scope="scope">
                        {{secToMin(scope.row.speakDuration)}}
                    </template>
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
                    width="150"
                    label="学校进展">
                    <template slot-scope="scope">
                        <ScProgress v-on:feed="handleShowImage" :scope="scope"></ScProgress>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    width="120"
                    label="梦享家进展">
                    <template slot-scope="scope">
                        <SpProgress :scope="scope"></SpProgress>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="110"
                    label="学校反馈">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleShowImage(scope.row)" >查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :canSend="+scope.row.status === 1" :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    class="no-wrap"
                    width="250px"
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope" >
                        <Operation
                        v-on:done="handleDoneModal" :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>

            <!-- 完成 提示 -->
            <el-dialog
                :visible.sync="modal.finish"
                width="400px"
            >
                <h3 class="text-center modal-title" >确定完成邀约吗？</h3>
                <span class="mb-20">完成邀约后，邀约将不在此列表中显示并且梦享家和学校双方的邀约将进入“已完成”列表</span>
                <span slot="footer" class="tm-modal-footer">
                    <el-button class="tm-btn-border" @click="modal.finish = false">取 消</el-button>
                    <el-button class="tm-btn" type="primary" @click="handleFinish">确 定</el-button>
                </span>
            </el-dialog>

            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
            <!-- edit -->
            <EditInvite></EditInvite>

            <!-- 反馈 -->
            <FeedList v-on:close="handleClose" :modal="modal.feed" :current-id="currentId" ></FeedList>
        </div>
    </div>
</template>
<script>
import common from '@comp/mixin/common';
import slremote from '@comp/mixin/slremote';

import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    toSpeakerHome,
    toSchoolHome,
    commonPageInit,
    secToMin
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
import FeedList from '@layout/modal/feedlist.vue';

import SlRemote from '@layout/slremote.vue';

export default {
    mixins: [common, slremote],
    data() {
        return {
            attrs,
            currentId: '',
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
                edit: false,
                feed: false,
                finish: false
            },
            // 当前选中行数据
            selectRow: {}
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
        SlRemote,
        MessageBox,
        EditInvite,
        Table,
        Timerange,
        FeedList,
        Pagination
    },
    mounted() {
        commonPageInit(
            this,
            {
                act: 'getAppointmentList',
                status: 0
            },
            {
                status: 0
            }
        );
    },
    methods: {
        formatAttr,
        dateformat,
        secToMin,
        toSpeakerHome,
        toSchoolHome,
        ...mapMutations([
            'clearSearchOps',
            'updateValue',
            'getFeedList',
            'getPageData',
            'formSubmit',
            'showModal',
            'getRejectDesc',
            'finishInvite'
        ]),

        handleDoneModal(obj) {
            this.modal.finish = true;
            this.selectRow = obj; // 当前选中行的数据
        },

        handleFinish() {
            this.finishInvite({
                act: 'finishAppointment',
                appointmentId: this.selectRow.appointmentId,
                onSuccess: res => {
                    this.modal.finish = false;
                }
            });
        },

        /* 渲染状态 */
        handleRendorState(obj, type) {
            let state = obj.status || '1';
            return this.attrs['status'][state][type];
        },

        // 学校预览照片，并可以上传
        handleShowImage(row) {
            this.modal.feed = true;
            this.currentId = row.appointmentId;
            this.getFeedList({
                act: 'getFeedbackList',
                appointmentId: row.appointmentId
            });
        },

        handleClose() {
            this.modal.feed = false;
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



