<template>
    <div>
        <el-table :data="tableData" border class="tm-table" >
            <el-table-column
                prop="date"
                align="center"
                label="日期">
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="地址">
            </el-table-column>
            <el-table-column label="消息" align="center" >
                <template slot-scope="scope">
                    <MessageBox :scope="scope" ></MessageBox>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <Operation :scope="scope"></Operation>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="提示"
            :visible.sync="convertion"
            width="30%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="convertion = false">取 消</el-button>
            <el-button type="primary" @click="convertion = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="150"
            layout="total, prev, pager, next"
            :total="1000"
            class="offer-pagination"
        >
        </el-pagination>
    </div>
</template>

<script>
import Operation from '@layout/operation.vue';
import MessageBox from '@layout/modal/message.vue';
export default {
    data() {
        return {
            currentPage: 2,
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    state: 1,
                    chatUnreadQuantity: 2
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    state: 0,
                    chatUnreadQuantity: 2
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    state: 0,
                    chatUnreadQuantity: 2
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    state: 0,
                    chatUnreadQuantity: 2
                }
            ],
            convertion: false
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    components: { MessageBox, Operation }
};
</script>

<style>
.offer-pagination {
    display: flex;
    justify-content: flex-end;
}
</style>


