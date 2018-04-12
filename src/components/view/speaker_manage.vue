<template>
<div>
    <Search :cfg="searchCfg" >
        <template slot-scope="props" >
            <div class="search-input">
                <el-input placeholder="演讲者名称" v-model="searchCfg.searchText" suffix-icon="el-icon-search" ></el-input>
            </div>
        </template>
    </Search>
    <el-card>
        <Table :loading="tableLoading" :data="data" >
            <el-table-column :formatter="formatAttr" align="center" prop="authStatus" label="认证状态" ></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" ></el-table-column>
            <el-table-column align="center" prop="company" label="公司" ></el-table-column>
            <el-table-column align="center" prop="title" label="岗位" ></el-table-column>
            <el-table-column align="center" prop="wechat" label="微信号" ></el-table-column>
            <el-table-column align="center" prop="phone" label="联系电话" ></el-table-column>
            <el-table-column align="center" prop="email" label="邮箱" ></el-table-column>
            <el-table-column align="center" prop="addTimestamp" width="140px" label="申请时间" >
                <template slot-scope="scope">
                    {{dateformat(scope.row.addTimestamp)}}
                </template>
            </el-table-column>
            <el-table-column align="center" width="100px"  label="详细信息" >
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleShowReason(scope.row)" type="text" >查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="160px" label="操作" >
                <template slot-scope="scope">
                    <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                </template>
            </el-table-column>
            <el-table-column align="center" width="240px" label="冻结操作" >
                <template slot-scope="scope">
                    <div v-show="+scope.row.suspend>0" >
                        <span>已冻结</span>
                        <el-button size="mini" type="text" @click="showReason(scope.row)" v-show="scope.row.suspend>0">查看原因</el-button>
                        <el-button size="mini" v-show="scope.row.suspend>0" class="tm-btn-border" @click="handleUnsuspend" >解冻</el-button>
                    </div>
                    <el-button size="mini" v-show="+scope.row.suspend==0" type="primary" class="tm-btn" >冻结</el-button>
                </template>
            </el-table-column>
        </Table>
        <Pagination :cfg="searchCfg" :count="count" ></Pagination>
        <!-- 查看原因 -->
        <EditSpeaker :data="form" v-on:modal="handleClose('showReason')" title="修改信息" :modal="modal.showReason" ></EditSpeaker>
        <!-- 驳回 -->
        <Reject v-on:modal="handleClose('reject')"  :modal="modal.reject" ></Reject>
    </el-card>
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

import Table from '@layout/table.vue';
import Pagination from '@layout/pagination.vue';
import Operation from '@layout/operation.vue';
import EditSpeaker from '@layout/modal/editSpeaker.vue';
import Reject from '@layout/modal/reject.vue';

export default {
    name: 'speaker_manage',
    data() {
        return {
            searchCfg: {
                act: 'getSchoolApplicationList',
                orderType: this.orderType,
                searchText: '11',
                authStatus: 0
            },
            modal: {
                showReason: false,
                reject: false
            },
            form: {
                speakerId: '',
                name: 'zhaihr',
                sex: 1,
                company: 'zhaihr',
                title: 'zhaihr',
                wechat: 'zhaihr',
                phone: 'zhaihr',
                address: 'zhaihr',
                idleTimeDesc: 'zhaihr',
                showVideoOnSite: 1,
                photoUrl:
                    'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                educationBackground: 'zhaihr',
                inviter: 'zhaihr',
                whyChooseUs: 'zhaihr',
                rejectDesc: 'zhaihr',
                suspendDesc: 'zhaihr',
                benefitPeopleTimesAdd: 1
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
    components: {
        Pagination,
        Table,
        EditSpeaker,
        Reject,
        Operation
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
        /* 查看冻结原因 */
        showReason(obj) {
            this.getRejectDesc({
                act: 'getSuspendReason',
                userId: obj.schoolId,
                onSuccess: res => {
                    this.$alert(res.data.data.suspendDesc, '拒绝原因').catch(
                        () => {}
                    );
                }
            });
        },
        /* 解冻 */
        handleUnsuspend() {
            this.formSubmit({
                act: 'suspendUser',
                userId: obj.schoolId,
                onSuccess: res => {
                    this.$alert(res.data.data.rejectDesc, '拒绝原因').catch(
                        () => {}
                    );
                }
            });
        },
        handleShowReason(data) {
            const id = '3';
            this.modal.showReason = true;
        },
        handleClose(modalName) {
            this.modal[modalName] = false;
        }
    }
};
</script>



