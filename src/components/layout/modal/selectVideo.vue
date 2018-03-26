<template>
    <el-dialog :title="title" :before-close="handleModalClose" :visible.sync="modal" width="80%" >
        <el-input placeholder="请输入" suffix-icon="el-icon-search" class="mb-20" ></el-input>
        <Table :data="data" :page="page" :perPage="per_page" :totalCount="totalCount" >
            <el-table-column
                align="center"
                label="预览图"
                >
                <template slot-scope="scope">
                    <img :src="scope.row.previewUrl" class="avatar img-fluid" alt="">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="title"
                label="标题"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="school"
                label="学校"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="speakerName"
                label="演讲者"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="startTime"
                label="演讲时间"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="addTimeStamp"
                label="上传时间"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="isStart"
                label="启用"
                >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isStart"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="submitVideo(scope.row)" type="primary" >选择</el-button>
                </template>
            </el-table-column>
        </Table>
        <span slot="footer" class="center dialog-footer">
            <el-button @click="handleModalClose">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import image from 'assets/image/logo/tsinghua.png';

import axios from 'axios';
import Table from '@layout/table.vue';
export default {
    name: 'select_video_modal',
    data() {
        return {
            per_page: 10,
            page: 1,
            totalCount: 110,
            data: [
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: true
                },
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: false
                },
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: true
                }
            ]
        };
    },
    props: {
        title: {
            type: String,
            default: '选择视频'
        },
        modal: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Table
    },
    methods: {
        handleModalClose() {
            // 通过$emit 实现子组件与父组件进行沟通
            this.$emit('modal');
        }
    }
};
</script>
<style lang="scss">
.el-dialog__header {
    padding: 20px 30px 10px;
    .el-dialog__title {
        font-size: 16px;
    }
    .el-dialog__headerbtn {
        top: 30px;
        right: 30px;
    }
}
.avatar {
    width: 70px;
    padding: 10px;
}
</style>


