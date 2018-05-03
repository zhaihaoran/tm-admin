<template>
    <el-dialog :title="title" :before-close="handleModalClose" :visible.sync="modal" width="80%" >
        <el-input v-model="searchCfg.videoTitle" @change="handleSearch" placeholder="视频标题" suffix-icon="el-icon-search" class="mb-20" ></el-input>
        <Table :data="data" :loading="tableLoading" >
            <el-table-column
                align="center"
                label="预览图"
                >
                <template slot-scope="scope">
                    <img :src="scope.row.previewUrl" class="video-avatar img-fluid" alt="">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="videoTitle"
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
                label="梦享家"
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
                prop="addTimestamp"
                width="140px"
                label="上传时间"
                >
                <template slot-scope="scope">
                    {{dateformat(scope.row.addTimestamp)}}
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
                        active-value="1"
                        inactive-value="0"
                        disabled
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
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import image from 'assets/image/logo/tsinghua.png';

import Table from '@layout/table.vue';
import Pagination from '@layout/pagination.vue';

export default {
    name: 'select_video_modal',
    data() {
        return {
            searchCfg: {
                act: 'getVideoList',
                videoTypeId: '',
                videoTitle: ''
            }
        };
    },
    /* qs: 如何确保props绑定到data中的数据能实时更新 */
    /* as: 如何让data 和props 同步！ 如下！
     通过watch监听props的值，然后赋值给searchCfg，直接在data里声明是不行的！ */
    watch: {
        videoTypeId(val) {
            this.searchCfg.videoTypeId = val;
        }
    },
    props: {
        title: {
            type: String,
            default: '选择视频'
        },
        modal: {
            type: Boolean,
            default: false
        },
        videoId: {
            type: String,
            default: ''
        },
        videoTypeId: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage
        })
    },
    components: {
        Table,
        Pagination
    },
    methods: {
        dateformat,
        ...mapMutations(['getPageData']),
        /* 查询 */
        handleSearch() {
            this.getPageData(this.searchCfg);
        },
        /* 选择该视频 */
        handleSelectVideo(obj) {
            this.$emit('selectVideoId', obj);
            this.handleModalClose();
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
}
.video-avatar {
    width: 70px;
    padding: 10px;
}
</style>


