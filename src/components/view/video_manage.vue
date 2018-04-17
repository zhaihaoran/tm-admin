<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <el-select class="search-input" v-model="searchCfg.videoTypeId" placeholder="全部分类" >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="sr-context">
                    <div class="sr-input">
                        <el-input v-model="searchCfg.speakTitle" placeholder="标题" ></el-input>
                    </div>
                    <div class="sr-input">
                        <el-input placeholder="学校名称" v-model="searchCfg.schoolName" suffix-icon="el-icon-search" ></el-input>
                    </div>
                    <div class="sr-input">
                        <el-input placeholder="演讲者名称" v-model="searchCfg.speakerName" suffix-icon="el-icon-search" ></el-input>
                    </div>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <div class="flex-end mb-20">
                <el-button type="primary" @click="modal.addVideo = true" >添加</el-button>
            </div>
            <Table v-loading="tableLoading" :data="data" >
                <el-table-column width="200" prop="previewUrl" label="预览图" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.previewUrl" class="img-fluid" :alt="scope.row.videoTitle">
                    </template>
                </el-table-column>
                <el-table-column prop="videoTitle" label="标题" align="center"></el-table-column>
                <el-table-column prop="schoolName" label="学校" align="center"></el-table-column>
                <el-table-column prop="speakerName" label="演讲者" align="center"></el-table-column>
                <el-table-column prop="speakTimestamp" width="140px" label="演讲时间" align="center">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column prop="addTimestamp" width="140px" label="上传时间" align="center">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column prop="videoTypeIdStr" label="分类" align="center"></el-table-column>
                <el-table-column prop="intro" label="推荐位" align="center"></el-table-column>
                <el-table-column prop="enable" label="启用" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.enable"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template class="cubes" slot-scope="scope">
                        <el-button type="primary" @click="handlePlayVideo(scope.row.videoUrl)" >播放</el-button>
                        <el-button @click="handleGetVideoInfo(scope.row)" type="text" >查看/修改</el-button>
                        <el-button @click="handleDelete(scope.row)" class="tm-btn-border" type="primary" >删除</el-button>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>

            <!-- 添加视频 -->
            <VideoDialog v-on:modal="handleClose('addVideo')" title="添加视频" action="addVideo" :modal="modal.addVideo" ></VideoDialog>
            <!-- 修改视频 -->
            <VideoDialog :data="formData" v-on:modal="handleClose('editVideo')" action="modifyVideo"  title="修改信息" :modal="modal.editVideo" ></VideoDialog>
            <!-- 视频播放弹窗 -->
            <el-dialog width="1200px" :visible.sync="modal.video" :before-close="handleVideoClose" >
                <div class="video-player">
                    <video-player
                        class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                    >
                    </video-player>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import Pagination from '@layout/pagination.vue';
import SlRemote from '@layout/slremote.vue';
import VideoDialog from '@layout/modal/VideoDialog.vue';

import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

import image from '../../assets/image/logo/tsinghua.png';

export default {
    name: 'video_manage',
    data() {
        return {
            playerOptions: {
                autoplay: true,
                sources: [
                    {
                        type: 'video/mp4',
                        src: ''
                    }
                ],
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                poster: '' //封面
            },
            formData: {
                title: 'as',
                photoUrl:
                    'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                manCounts: 1,
                playCounts: 1,
                schoolRadio: '选择',
                schoolId: '',
                speakerRadio: '填写',
                speakerId: '',
                tabs: [],
                category: [],
                start: false
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            searchCfg: {
                act: 'getVideoList',
                orderType: 0,
                speakTitle: '',
                schoolName: '',
                speakerName: '',
                videoTypeId: '', //视频类型id
                speakerName: '',
                enable: 0,
                recommend: 0
            },
            modal: {
                editVideo: false,
                addVideo: false,
                video: false
            }
        };
    },
    components: {
        Table,
        VideoDialog,
        SlRemote,
        Search,
        Pagination,
        videoPlayer
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
        }),
        orderType: {
            set(value) {
                this.updateValue({
                    orderType: value
                });
            },
            get() {
                return this.$store.state.search.orderType;
            }
        }
    },
    mounted() {
        commonPageInit(this, {
            act: 'getVideoList'
        });
    },
    methods: {
        formatAttr,
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'showModal',
            'getRejectDesc',
            'getModalData'
        ]),
        /* 获取视频详情 */
        handleGetVideoInfo(obj) {
            this.modal.editVideo = true;
            this.getModalData({
                act: 'getVideo',
                videoId: obj.videoId
            });
        },
        handleClose(modalName) {
            this.modal[modalName] = false;
        },
        /* 删除 */
        handleDelete(obj) {
            this.$confirm('您确认要删除视频吗？, 是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteSubmit({
                        act: 'removeVideo',
                        videoId: obj.videoId
                    });
                })
                .catch(() => {});
        },

        // 播放视频
        handlePlayVideo(videourl) {
            this.modal.video = true;
            console.log('videoURL', videourl);
            this.playerOptions.sources[0].src = videourl;
        },
        handleVideoClose() {
            this.$refs.videoPlayer.player.pause();
            this.modal.video = false;
        }
    }
};
</script>
<style lang="scss">
@import '../../scss/variable/_video.scss';

.search-btn {
    position: absolute;
    right: 20px;
    top: 20px;
}

.sr-context {
    margin-top: 10px;
    .sr-input {
        display: inline-block;
        margin-right: 5px;
    }
}
</style>

