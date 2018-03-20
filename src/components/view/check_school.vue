<template>
    <div>
        <Search :searchConfig="searchConfig" ></Search>
        <div class="tm-card">
            <el-table :data="list" border class="tm-table" >
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
                        <Operation ></Operation>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Search from '@layout/search.vue';
import Operation from '@layout/op_manage.vue';
import mapsAttr from '@comp/lib/api_maps.js';

export default {
    data() {
        return {
            searchConfig: {
                input: 'zhaihaoran',
                category: 'right'
            },
            list: [
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
    components: { Search, Operation },
    methods: {
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        }
    }
};
</script>


