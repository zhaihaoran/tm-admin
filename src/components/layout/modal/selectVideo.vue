<template>
    <el-dialog :title="title" :before-close="handleModalClose" :visible.sync="modal" width="80%" >
        <el-input v-model="searchCfg.videoTitle" @change="handleSearch" placeholder="请输入" suffix-icon="el-icon-search" class="mb-20" ></el-input>
        <Table :data="data" :loading="tableLoading" >
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
                prop="schoolName"
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
                prop="speakTimestamp"
                width="140px"
                label="演讲时间"
                >
                <template slot-scope="scope">
                    {{dateformat(scope.row.speakTimestamp)}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="addTimeStamp"
                width="140px"
                label="上传时间"
                >
                <template slot-scope="scope">
                    {{dateformat(scope.row.addTimeStamp)}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="enable"
                label="启用"
                >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.enable"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作"
                width="180px"
                >
                <template slot-scope="scope">
                    <el-button @click="handleSelectVideo(scope.row)" type="primary" >选择</el-button>
                </template>
            </el-table-column>
        </Table>
        <Pagination :cfg="searchCfg" :count="count" ></Pagination>
        <span slot="footer" class="center dialog-footer">
            <el-button @click="handleModalClose">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { dateformat } from '@comp/lib/api_maps.js';

import image from 'assets/image/logo/tsinghua.png';

import Table from '@layout/table.vue';
export default {
    name: 'select_video_modal',
    data() {
        return {
            searchCfg: {
                act: 'getVideoList',
                videoTitle: '11'
            }
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
    computed: {
        dateformat,
        ...mapState({
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage
        })
    },
    components: {
        Table
    },
    methods: {
        ...mapMutations(['getPageData', 'formSubmit']),
        /* 查询 */
        handleSearch() {
            this.getPageData(this.searchCfg);
        },
        /* 选择该视频 */
        /* ???? */
        handleSelectVideo(obj) {
            this.formSubmit({
                act: 'modifyVideoTop',
                videoIdStr: obj.videoId,
                videoTypeId: obj.videoTypeIdStr,
                successText: '替换成功'
            });
        },
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


