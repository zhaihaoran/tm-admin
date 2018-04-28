<template>
    <div>
        <el-card v-for="(item,i) in videoTopList" :key="i" class="mb-20" >
            <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
                <el-button v-show="isShow[item.videoTypeId]" type="primary" @click="handleSave(item)" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="handleSelectVideo(item)" type="primary" >选择视频</el-button>
            <el-row :gutter="10">
                <el-col
                    class="tm-col-5" :sm="12" :md="8" :lg="6"
                    v-for="(video,index) in item.videoList"
                    v-dragging="{ item: video, list: item.videoList, group: 'video' }"
                    :key="video.videoId"
                    track-by="videoId"
                >
                    <div :class="[videoClass]" >
                        <div @click="handlePlayVideo(video.videoUrl)" class="card-image">
                            <img class="img-fluid min-images" :src="video.previewUrl">
                            <span class="vd-times badge">{{formatDuration(video.duration)}}</span>
                        </div>
                        <div class="card-content">
                            <span class="card-title grey-333">{{video.videoTitle}}</span>
                            <div class="vd-extra">
                                <span>演讲者：{{video.speakerName}}</span>
                                <span>学校：{{video.schoolName}}</span>
                                <span>{{dateformat(video.addTimestamp)}} <span class="text-right" >{{video.playTimes}} 次播放</span> </span>
                            </div>
                            <span v-if="+video.enable < 1" class="bages">未激活</span>
                            <span class="delete-icon" @click="deleteVideo(item,index)" ><i class="el-icon-delete"></i></span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 选择视频 -->
        <!-- point: 组件双向绑定！.sync -->
        <SelectVideo :videoTypeId.sync="selectTypeId" v-on:selectVideoId="handleSaveVideo" v-on:modal="handleClose" title="查看/修改" :modal="modal.selectVideo"  ></SelectVideo>
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
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    formatDuration,
    commonPageInit
} from '@comp/lib/api_maps.js';

import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

import SelectVideo from '@layout/modal/selectVideo.vue';
import VideoCard from '@layout/videoCard.vue';
import Upload from '@layout/upload.vue';

import image from '../../assets/image/logo/tsinghua.png';
export default {
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
            isShow: {},
            videoTopList: [], // 分类置顶列表
            videoIdStr: [], // 修改视频置信息 videoIdstr -- 中间值
            selectTypeId: '', // 当前添加视频所在的分类 videoTypeId -- 中间值
            videoClass: {
                video: true,
                active: true,
                'card-hover': true,
                hoverable: true
            }, // videoCard 样式
            videoIdOfRecommended: '',
            list: [],
            modal: {
                addVideo: false,
                selectVideo: false,
                video: false
            }
        };
    },
    components: {
        VideoCard,
        Upload,
        SelectVideo,
        videoPlayer
    },

    mounted() {
        this.init();
        this.$dragging.$on('dragged', ({ value }) => {
            console.log(value.item);
            console.log(value.list);
        });
    },
    methods: {
        dateformat,
        formatDuration,
        ...mapMutations(['getPageData', 'getArrayData', 'formSubmit']),
        /* 页面初始化 */
        init() {
            this.getArrayData({
                act: 'getVideoTopList',
                onSuccess: res => {
                    // 大块排序
                    this.videoTopList = res.data.data.videoTopList.sort(
                        (a, b) => {
                            return a.orderNum > b.orderNum;
                        }
                    );
                    this.videoTopList.forEach(el => {
                        // 隐藏处理
                        this.isShow[el.videoTypeId] = false;
                        // 单行row 排序
                        el.videoList.sort((a, b) => {
                            return a.addTimestamp - b.addTimestamp;
                        });
                    });
                }
            });
        },

        /* 选择视频 */
        handleSelectVideo(obj) {
            /* 如果数量超过4 */
            if (obj.videoList.length === 4) {
                return this.$message('最多只能添加4视频');
            }
            this.modal.selectVideo = true;
            this.selectTypeId = obj.videoTypeId;
            /* 渲染内部视频列表 */
            this.getPageData({
                act: 'getVideoList',
                videoTypeId: obj.videoTypeId
            });
        },

        handleClose() {
            this.modal.selectVideo = false;
        },
        /* 选择成功之后 保存视频 */
        handleSaveVideo(obj) {
            /* 找到选中的item */
            let typeItem = this.videoTopList.find(
                el => el.videoTypeId == this.selectTypeId
            );
            /* 将取到的video数据放进去 */
            typeItem.videoList.push(obj);
            this.isShow[this.selectTypeId] = true;
        },

        /* 删除 */
        deleteVideo(item, index) {
            item.videoList.splice(index, 1);
            console.log(item.videoList);
            this.isShow[item.videoTypeId] = true;
        },
        /* 唯一key 用于拖拽 */
        unique(typeId, id) {
            return `${typeId}_${id}`;
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

        /* 保存分类视频配置 */
        handleSave(item) {
            item.videoList.map(el => {
                this.videoIdStr.push(el.videoId);
                return el;
            });

            this.formSubmit({
                act: 'modifyVideoTop',
                videoTypeId: item.videoTypeId,
                videoIdStr: this.videoIdStr.join(',') || '',
                onSuccess: res => {
                    // 一定要记得回收
                    this.videoIdStr = [];
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped >
.tip-info {
    display: inline-block;
    margin-left: 20px;
}

.card-header-save {
    float: right;
    position: relative;
    bottom: 6px;
}

.bages {
    position: absolute;
    text-align: center;
    top: 8px;
    left: 12px;
    color: #fff;
    height: 26px;
    line-height: 26px;
    width: 60px;
    background: #bb2133;
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
    z-index: 50;
    i {
        margin: 0 5px;
    }
}

.delete-icon {
    display: none;
    position: absolute;
    top: 12px;
    right: 12px;
    color: #fff;
    font-size: 24px;
    margin-right: 10px;
    cursor: pointer;
    z-index: 50;
}

.min-images {
    min-height: 150px;
    min-width: 100%;
    background: #ececec;
}

.pic-cube {
    position: relative;
    height: 200px;
    background: #dedcdc;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    &:hover {
        .op_context {
            visibility: visible;
            .photo-cube {
            }
        }
    }
    .op_context {
        font-size: 24px;
        color: #fff;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        visibility: hidden;
        top: 0;
        left: 0;
        .photo-cube {
            margin: 5px 10px;
            cursor: pointer;
        }
    }
}
</style>


