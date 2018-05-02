<template>
    <div>
        <Search center-text="演讲时间" right-text="上传时间" :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <el-select @change="handleSearch" class="search-input" v-model="searchCfg.videoTypeId" placeholder="全部分类" >
                    <el-option
                        v-for="item in videoTypeList"
                        :key="item.videoTypeId"
                        :label="item.name"
                        :value="item.videoTypeId">
                    </el-option>
                </el-select>
                <el-radio-group class="search-input" @change="handleSearch" v-model="searchCfg.enable">
                    <el-radio-button :label="undefined">全部</el-radio-button>
                    <el-radio-button label="1">已启用</el-radio-button>
                    <el-radio-button label="0">未启用</el-radio-button>
                </el-radio-group>
                <div class="sr-context">
                    <div class="sr-input">
                        <el-input @keyup.native.enter="handleSearch" v-model="searchCfg.videoTitle" placeholder="标题" ></el-input>
                    </div>
                    <div class="sr-input">
                        <el-input @keyup.native.enter="handleSearch" placeholder="学校名称" v-model="searchCfg.schoolName" suffix-icon="el-icon-search" ></el-input>
                    </div>
                    <div class="sr-input">
                        <el-input @keyup.native.enter="handleSearch" placeholder="演讲者名称" v-model="searchCfg.speakerName" suffix-icon="el-icon-search" ></el-input>
                    </div>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <div class="flex-end mb-20">
                <el-button type="primary" @click="handleAddVideo" >添加</el-button>
            </div>
            <Table v-loading="tableLoading" :data="data" >
                <el-table-column width="200" prop="previewUrl" label="预览图" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.previewUrl" class="img-fluid" :alt="scope.row.videoTitle">
                    </template>
                </el-table-column>
                <el-table-column prop="videoTitle" label="标题" align="center"></el-table-column>
                <el-table-column prop="schoolName" label="学校" align="center"></el-table-column>
                <el-table-column prop="speakerName" label="演讲者" align="center"></el-table-column><el-table-column
                    prop="schoolName"
                    align="center"
                    label="学校">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.schoolName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    label="演讲者">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSpeakerHome(scope.row.speakerId)">{{scope.row.speakerName}}</a>
                    </template>
                </el-table-column>
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
                <el-table-column width="100" prop="videoTypeIdStr" label="分类" align="center">
                    <template slot-scope="scope">
                        <span class="item" v-for="item in handleFormatter(scope.row.videoTypeIdStr)" :key="item.$index" >{{item}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="enable" label="启用" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.enable"
                            disabled
                            active-value="1"
                            inactive-value="0"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="120" >
                    <template class="cubes" slot-scope="scope">
                        <el-button type="primary" @click="handlePlayVideo(scope.row.videoUrl)" >播放</el-button>
                        <el-button class="no-margin" @click="handleGetVideoInfo(scope.row)" type="text" >查看/修改</el-button>
                        <el-button @click="handleDelete(scope.row)" class="tm-btn-border" type="primary" >删除</el-button>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>

            <!-- 添加视频 -->
            <VideoDialog v-on:modal="handleClose('addVideo')" title="添加视频" action="addVideo" :modal="modal.addVideo" ></VideoDialog>
            <!-- 修改视频 -->
            <VideoDialog v-on:modal="handleClose('editVideo')" action="modifyVideo"  title="修改信息" :modal="modal.editVideo" ></VideoDialog>
            <!-- 视频播放弹窗 -->
            <el-dialog width="1200px" :visible.sync="modal.video" :before-close="handleVideoClose" >
                <div class="video-player">
                    <video-player
                        width="1200px"
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
    toSpeakerHome,
    toSchoolHome,
    commonPageInit
} from '@comp/lib/api_maps.js';

import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import Pagination from '@layout/pagination.vue';
import SlRemote from '@layout/slremote.vue';
import VideoDialog from '@layout/modal/VideoDialog.vue';

import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

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
            videoTypeList: [],
            searchCfg: {
                act: 'getVideoList',
                orderType: 0,
                speakTitle: '',
                schoolName: '',
                speakerName: '',
                videoTypeId: '', //视频类型id
                speakerName: ''
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
        this.handleGetVideoTypes();
    },
    methods: {
        formatAttr,
        dateformat,
        toSpeakerHome,
        toSchoolHome,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'showModal',
            'getRejectDesc',
            'getModalData',
            'getArrayData',
            'deleteSubmit',
            'formSubmit',
            'deleteRow',
            'setOption',
            'update',
            'clearForm'
        ]),
        /* 添加视频 */
        handleAddVideo() {
            this.clearForm();
            this.modal.addVideo = true;
        },
        /* 获取视频分类信息 */
        handleGetVideoTypes() {
            this.getArrayData({
                act: 'getVideoTypeList',
                onSuccess: res => {
                    this.videoTypeList = res.data.data.videoTypeList;
                }
            });
        },
        /* 格式化表单 -- 视频分类信息展示 */
        handleFormatter(idStr = '') {
            return idStr.split(',').map(el => {
                let formater =
                    this.videoTypeList.find(item => item.videoTypeId == el) ||
                    {};
                return formater ? `${formater['name']}` : 'hh';
            });
        },
        /* 获取视频详情 */
        handleGetVideoInfo(obj) {
            this.modal.editVideo = true;
            this.getModalData({
                act: 'getVideo',
                videoId: obj.videoId,
                onSuccess: res => {
                    /* 更新图片state */
                    this.update({
                        previewUrl: res.data.data.video.previewUrl,
                        videoShortPathFilename:
                            res.data.data.video.videoShortPathFilename,
                        previewShortPathFilename:
                            res.data.data.video.previewShortPathFilename,
                        originFilename: res.data.data.video.videoOriginFilename
                    });
                    this.setOption(res.data.data.video);
                }
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
                    this.formSubmit({
                        act: 'removeVideo',
                        videoId: obj.videoId,
                        onSuccess: res => {
                            this.deleteRow({
                                type: 'videoId',
                                value: obj.videoId
                            });
                        }
                    });
                })
                .catch(() => {});
        },

        // 播放视频
        handlePlayVideo(videourl) {
            this.modal.video = true;
            this.playerOptions.sources[0].src = videourl;
        },
        handleVideoClose() {
            this.$refs.videoPlayer.player.pause();
            this.modal.video = false;
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
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

.item {
    display: inline-block;
    padding: 4px;
}
</style>

