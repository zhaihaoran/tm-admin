<template>
    <div>
        <Search :searchConfig="searchConfig" ></Search>
        <div class="tm-card">
            <el-table :data="tableData" class="tm-table" border>
                <el-table-column
                    align="center"
                    prop="teacherName"
                    label="演讲者"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="primary"
                    label="演讲主题"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="startTime"
                    label="演讲时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="times"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="ct"
                    label="发起邀约时间">
                </el-table-column>
                <el-table-column label="消息" prop="messages"  align="center" >
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column align="center" min-width="160px" label="操作">
                    <template slot-scope="scope">
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="进展"
                >
                    <template slot-scope="scope">
                        <Progress :progress="scope.row.progress" ></Progress>
                    </template>
                </el-table-column>
            </el-table>
            <!-- modal edit -->
            <el-dialog
                :visible.sync="modal.edit"
                width="30%"
            >
                <el-form ref="form" :model="form" label-width="80px" >
                    <el-form-item label="演讲者" >
                        <span>{{form.teacherName}}</span>
                    </el-form-item>
                    <el-form-item label="演讲主题" >
                        <el-input v-model="form.primary" ></el-input>
                    </el-form-item>
                    <el-form-item label="演讲时间" >
                        <el-date-picker
                            v-model="form.startTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="演讲时长" >
                        <el-input v-model="form.times" >
                            <template slot="append">分钟</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邀约时间" >
                        <span>2017-12-12 12:12</span>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="tm-modal-footer">
                    <el-button class="tm-btn" type="primary" @click="modal.edit = false">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
import Search from '@layout/search.vue';
import Progress from '@layout/modal/progress.vue';
import Operation from '@layout/operation.vue';
import MessageBox from '@layout/modal/message.vue';

export default {
    data() {
        return {
            searchConfig: {
                input: [973822200000, 973908600000],
                category: 'right'
            },
            replay: {
                message: '3333'
            },
            modal: {
                edit: false
            },
            form: {
                times: 40,
                startTime: '',
                theme: '学习'
            },
            dialogVisible: true,
            search: 'left',
            input: 'zhaihaoran',
            tableData: [
                {
                    teacherName: '王小虎',
                    primary: '电影人的梦想',
                    startTime: '2017-12-30 20:20',
                    times: 60,
                    progress: 1,
                    state: 1,
                    ct: '2017-12-12 20:20'
                },
                {
                    teacherName: '王阿萨德',
                    primary: '建筑师的使命',
                    startTime: '2015-2-12 20:20',
                    times: 60,
                    progress: 2,
                    state: 1,
                    ct: '2017-12-12 10:20'
                },
                {
                    teacherName: '王额',
                    primary: '蓝天梦',
                    startTime: '2017-12-12 20:20',
                    times: 60,
                    progress: 3,
                    state: 0,
                    ct: '2017-12-12 11:20'
                },
                {
                    teacherName: '收到小虎',
                    primary: '电影人的梦想',
                    startTime: '2017-12-12 20:20',
                    times: 60,
                    progress: 4,
                    state: 0,
                    ct: '2017-12-12 20:20'
                }
            ],
            gridData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ]
        };
    },
    methods: {
        handleEdit(index, row) {
            this.modal.edit = true;
            this.form = Object.assign(row);
        }
    },
    components: {
        Search,
        Progress,
        Operation,
        MessageBox
    }
};
</script>


