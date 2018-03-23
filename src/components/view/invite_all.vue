<template>
    <div>
        <Search :searchConfig="searchConfig" ></Search>
        <div class="tm-card">
            <el-table :data="listData" border class="tm-table" >
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="fromSide"
                    align="center"
                    label="邀约发起者">
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
                    label="演讲时间">
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    prop="ct"
                    align="center"
                    label="发起邀约时间">
                </el-table-column>
                <el-table-column
                    prop="schoolStatus"
                    align="center"
                    label="进展">
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    label="演讲者进展">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="学校反馈">
                    <template slot-scope="scope">
                        <el-button @click="showResponse(scope.row.reason)" type="text">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reason"
                    align="center"
                    label="拒絕原因">
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
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                        <!-- modal edit -->
                        <el-dialog
                            :visible.sync="modal_edit"
                            width="30%"
                        >
                            <el-form ref="form" :model="scope.row" label-width="80px" >
                                <el-form-item label="演讲者" >
                                    <span>{{scope.row.speakerName}}</span>
                                </el-form-item>
                                <el-form-item label="演讲主题" >
                                    <el-input v-model="scope.row.speakTitle" ></el-input>
                                </el-form-item>
                                <el-form-item label="演讲时间" >
                                    <el-date-picker
                                        v-model="scope.row.speakTimestamp"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="演讲时长" >
                                    <el-input v-model="scope.row.speakDuration" >
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="邀约时间" >
                                    <span>{{scope.row.speakTimestamp}}</span>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="tm-modal-footer">
                                <el-button class="tm-btn" type="primary" @click="modal_edit = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :current-page.sync="paging.current"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="paging.totalCount"
                class="pagination"
            >
            </el-pagination>
            <ResponseDialog v-on:modal="handleClose" :modal="modal.response" title="哈哈哈" :photos="photos" ></ResponseDialog>
        </div>
    </div>
</template>
<script>
import Operation from '@layout/operation.vue';
import Search from '@layout/search.vue';
import MessageBox from '@layout/modal/message.vue';
import mapsAttr from '@comp/lib/api_maps.js';

import ResponseDialog from '@layout/modal/response.vue';
import img from '../../assets/image/admin/camera.png';

export default {
    data() {
        return {
            paging: {
                current: 1,
                totalCount: 111
            },
            searchConfig: {
                input: [973822200000, 973908600000],
                category: 'right'
            },
            modal_edit: false,
            listData: [
                {
                    state: 0, // 0 :同意 1：修改
                    status: mapsAttr['status'][1], //1. 发起中 2 进行中 3已完成 4 已拒绝
                    fromSide: mapsAttr['fromSide'][1],
                    speakerName: 'zhaiharoan',
                    speakTitle: '电影人的梦想',
                    speakTimestamp: '2017-12-12 12:12',
                    speakDuration: 60,
                    ct: '2015-12-12 12:12',
                    chatUnreadQuantity: 2, // 对话信息数
                    schoolStatus: mapsAttr['schoolStatus'][1], // 学校进展状态
                    speakerStatus: mapsAttr['speakerStatus'][1], // 演讲者进展状态
                    reason: '不开心'
                },
                {
                    state: 1, // 0 :同意 1：修改
                    status: mapsAttr['status'][2], //1. 发起中 2 进行中 3已完成 4 已拒绝
                    fromSide: mapsAttr['fromSide'][2],
                    speakerName: 'zhaiharoan',
                    speakTitle: '电影人的梦想',
                    speakTimestamp: '2017-12-12 12:12',
                    speakDuration: 60,
                    ct: '2015-12-12 12:12',
                    chatUnreadQuantity: 2, // 对话信息数
                    schoolStatus: mapsAttr['schoolStatus'][2], // 学校进展状态
                    speakerStatus: mapsAttr['speakerStatus'][2], // 演讲者进展状态
                    reason: '不开心'
                }
            ],
            modal: {
                response: false
            },
            photos: [
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                },
                {
                    id: 1,
                    url: img
                }
            ]
        };
    },
    components: { Search, Operation, MessageBox, ResponseDialog },
    methods: {
        handleEdit(index, row) {
            console.log(index);
            console.log(row);
            this.modal_edit = true;
            this.form = Object.assign(row);
        },
        showResponse() {
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


