<template>
    <div>
        <div class="tm-card">
            <el-radio-group v-model="orderType" class="radio-group" >
                <el-radio-button label="0">综合排序</el-radio-button>
                <el-radio-button label="1">申请时间</el-radio-button>
            </el-radio-group>
            <div class="search-input">
                <el-input placeholder="学校名称" v-model="schoolName" suffix-icon="el-icon-search" ></el-input>
            </div>
        </div>
        <div class="tm-card">
            <Table v-loading="loading" :isPagination="false" :data="data" >
                <el-table-column
                    prop="name"
                    align="center"
                    label="学校名称">
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    label="学校地址">
                </el-table-column>
                <el-table-column
                    prop="teacher"
                    align="center"
                    label="责任老师">
                </el-table-column>
                <el-table-column
                    prop="teacherPhone"
                    align="center"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    align="center"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="classQuantity"
                    align="center"
                    label="课程剩余">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="详细原因">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showReason(scope.row.reason)" >查看/修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="90px"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <Operation></Operation>
                    </template>
                </el-table-column>
            </Table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Table from '@layout/table.vue';
import Operation from '@layout/op_manage.vue';

export default {
    data() {
        return {
            loading: true,
            orderType: 0,
            schoolName: 11,
            data: [
                {
                    name: '石家庄实验中学',
                    address: '河北省石家庄栾城县',
                    teacher: '电影人的梦想',
                    teacherPhone: 13888888888,
                    addTimestamp: 60,
                    classQuantity: 3
                }
            ]
        };
    },
    mounted() {
        axios.get('/admin/applist').then(res => {
            console.log(res);
            const datas = res.data.data.schoolList;
            this.data = datas;
            this.loading = false;
        });
    },
    components: { Operation, Table },
    methods: {
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        }
    }
};
</script>


