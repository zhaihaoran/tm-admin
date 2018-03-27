<template>
    <div>
        <Search :orderType.sync="orderType" >
            <div class="search-input">
                <el-input placeholder="学校名称" v-model="schoolName" suffix-icon="el-icon-search" ></el-input>
            </div>
            <div class="search-input">
                <el-input placeholder="演讲者名称" v-model="speakerName" suffix-icon="el-icon-search" ></el-input>
            </div>
            <div class="search-input">
                <Timerange :timerange="timerange" startPlaceholder="演讲开始时间" ></Timerange>
            </div>
        </Search>
        <div class="tm-card">
            <Table v-loading="loading" :data="listData" :page="filter.page" :perPage="filter.per_page" :totalCount="totalCount" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="发起者">
                </el-table-column>
                <el-table-column
                    prop="fromSide"
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
                    label="演讲主题">
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
                    show-overflow-tooltip
                    label="演讲时间">
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    align="center"
                    show-overflow-tooltip
                    label="发起邀约时间">
                </el-table-column>
                <el-table-column
                    prop="schoolStatus"
                    align="center"
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
                        <el-button @click="showResponse(scope.row.reason)" type="text">查看</el-button>
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
                    min-width="170px"
                    label="操作">
                    <template slot-scope="scope" >
                        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
                        <el-button size="mini" class="tm-btn-border" @click="handledelete(scope.row.appointmentId)" >删除</el-button>
                        <el-button size="mini" type="primary" v-show="scope.row.status === 4" @click="handleConfirm(scope.row.appointmentId)" >完成</el-button>
                    </template>
                </el-table-column>
            </Table>

            <!-- 修改 modal -->
            <el-dialog
                :visible.sync="modal.edit"
                width="30%"
            >
                <el-form ref="form" :model="editForm" label-width="80px" >
                    <el-form-item label="演讲者" >
                        <span>{{editForm.speakerName}}</span>
                    </el-form-item>
                    <el-form-item label="演讲主题" >
                        <el-input v-model="editForm.speakTitle" ></el-input>
                    </el-form-item>
                    <el-form-item label="演讲时间" >
                        <el-date-picker
                            v-model="editForm.speakTimestamp"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="演讲时长" >
                        <el-input v-model="editForm.speakDuration" >
                            <template slot="append">分钟</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邀约时间" >
                        <span>{{editForm.speakTimestamp}}</span>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="tm-modal-footer">
                    <el-button class="tm-btn" type="primary" @click="modal.edit = false">确 定</el-button>
                </span>
            </el-dialog>

            <ResponseDialog v-on:modal="handleClose" :modal="modal.response" title="哈哈哈" :photos="photos" ></ResponseDialog>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { formatAttr, attrs } from '@comp/lib/api_maps.js';
// comp
import Timerange from '@layout/timerange.vue';
import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
import ResponseDialog from '@layout/modal/response.vue';

export default {
    data() {
        return {
            attrs,
            filter: {
                page: 1,
                per_page: 20
            },
            timerange: [],
            totalCount: 111,
            schoolName: '',
            speakerName: 'asdasd',
            loading: true,
            orderType: 1,
            editForm: {},
            modal: {
                edit: false,
                response: false
            },
            listData: [],
            photos: []
        };
    },
    components: {
        Search,
        Timerange,
        Table,
        MessageBox,
        ResponseDialog
    },
    mounted() {
        axios.get('/admin/list').then(res => {
            const data = res.data.data.data;
            this.listData = data;
            this.loading = false;
        });
    },
    methods: {
        formatAttr,
        handleEdit(index, row) {
            console.log(row);
            this.modal.edit = true;
            this.editForm = Object.assign(row);
        },
        handledelete(id) {
            this.$confirm('您确认要删除此次邀约, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(res => {
                    axios.get('/admin/logout').then(res => {
                        // delete
                        console.log(id);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
                .catch(() => {});
        },
        handleConfirm(id) {
            this.$confirm('您确认要提交?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(res => {
                    axios.get('/admin/logout').then(res => {
                        // delete
                        console.log(id);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
                .catch(() => {});
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
</style>


