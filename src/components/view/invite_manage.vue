<template>
    <div>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <Timerange></Timerange>
                </div>
                <div class="sr-context" >
                    <div class="sr-input">
                        <SlRemote placeholder="学校名称" v-on:id="handleUpdateSchoolId" action="getSchoolListForInput" >
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
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.schoolName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    label="梦享家">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSpeakerHome(scope.row.speakerId)">{{scope.row.speakerName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
                    width="140"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    width="80"
                    label="演讲时长">
                    <template slot-scope="scope">
                        {{secToMin(scope.row.speakDuration)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    width="140"
                    align="center"
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
// comp
import ScProgress from '@layout/modal/schoolProgress.vue';
import SpProgress from '@layout/modal/speakerProgress.vue';
import Pagination from '@layout/pagination.vue';
import Operation from '@layout/invite_operation.vue';
import EditInvite from '@layout/modal/editInvite.vue';

import Timerange from '@layout/timerange.vue';
import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
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
                status: 2,
                schoolId: '',
                speakerId: ''
            },
            modal: {
                edit: false,
                response: false,
                feed: false
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
            perPage: state => state.search.perPage,
            status: state => state.search.status,
            feedList: state => state.search.feedList,
            schoolProgress: state => state.progress.schoolProgress,
            speakerProgress: state => state.progress.speakerProgress
        })
    },
    components: {
        Search,
        Operation,
        MessageBox,
        ScProgress,
        SpProgress,
        EditInvite,
        Table,
        Timerange,
        SlRemote,
        Pagination,
        FeedList
    },
    mounted() {
        commonPageInit(
            this,
            {
                act: 'getAppointmentList',
                status: 2
            },
            {
                status: 2
            }
        );
    },
    methods: {
        dateformat,
        formatAttr,
        toSpeakerHome,
        toSchoolHome,
        secToMin,
        ...mapMutations([
            'clearSearchOps',
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getFeedList',
            'getRejectDesc'
        ]),

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
.pagination {
    display: flex;
    justify-content: flex-end;
}
.sr-context {
    margin-top: 10px;
    .sr-input {
        display: inline-block;
        margin-right: 5px;
    }
}
</style>


