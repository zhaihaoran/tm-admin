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
                    label="演讲时长（分钟）">
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
                    width="140"
                    label="学校进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="schoolpopover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.schoolStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="待课后反馈提交"></el-step>
                                <el-step title="待课后反馈确认"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:schoolpopover >
                            {{attrs['schoolStatus'][scope.row.schoolStatus]}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    width="120"
                    label="演讲者进展">
                    <template slot-scope="scope">
                        <el-popover ref="speakerpopover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.speakerStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:speakerpopover >
                            {{attrs['speakerStatus'][scope.row.speakerStatus]}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="学校反馈">
                    <template slot-scope="scope">
                        <el-button  v-show="scope.row.status == 4" type="text" @click="showReason(scope.row)" >查看原因</el-button>
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
            {{status}}

            <Pagination :cfg="searchCfg" :count="count" ></Pagination>

            <!-- edit -->
            <EditInvite></EditInvite>

            <ResponseDialog v-on:modal="handleClose" :modal="modal.response" title="哈哈哈" :photos="photos" ></ResponseDialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';
// comp
import Pagination from '@layout/pagination.vue';
import Operation from '@layout/invite_operation.vue';
import EditInvite from '@layout/modal/editInvite.vue';
import Timerange from '@layout/timerange.vue';
import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
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
                status: 2,
                schoolName: '',
                speakerName: ''
            },
            modal: {
                edit: false,
                response: false
            },
            photos: []
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
            status: state => state.search.status
        })
    },
    components: {
        Search,
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
            status: 2
        });
        this.updateValue({
            status: 2
        });
    },
    methods: {
        dateformat,
        formatAttr,
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
        showResponse() {
            axios.get('/admin/feedbacklist').then(res => {
                const data = res.data.data.feedbackList;
                console.log(data);
                this.photos = data;
            });
            this.modal.response = true;
        },
        handleClose() {
            this.modal.response = false;
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


