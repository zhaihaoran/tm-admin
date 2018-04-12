<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>选择热门视频</span>
        </div>
        <el-row :gutter="10" class="video-wrapper" >
            <el-col :lg="16" >
                <div class="video-item" @mouseenter="handleHoverEnter($event)" @mouseleave="handleHoverLeave($event)" >
                    <img class="img-height" :src="videoList[0].previewUrl" >
                    <div class="video-mask index-video">
                        <h2 class="text-truncate">{{videoList[0].videoTitle}}</h2>
                        <p>{{videoList[0].speakerName}}</p>
                    </div>
                    <div class="vd-events">
                        <div class="e-box">
                            <div @click="handleChangeVideo(videoList[0].videoTypeId)" class="e-cube">
                                <i class="icon iconfont icon-changeVideo"></i>
                                <span>替换热门视频</span>
                            </div>
                            <div @click="handlePlayVideo(videoList[0].videoUrl)" class="e-cube border-left">
                                <i class="icon iconfont icon-play"></i>
                                <span>播放</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
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
            <!--  -->
            <el-col :lg="8" class="video-col" >
                <div class="video-item" @mouseenter="handleHoverEnter($event)" @mouseleave="handleHoverLeave($event)" >
                    <img class="img-height" :src="videoList[1].previewUrl" >
                    <div class="video-mask extra-video">
                        <h2 class="text-truncate">{{videoList[1].videoTitle}}</h2>
                        <p>{{videoList[1].speakerName}}</p>
                    </div>
                    <div class="vd-events">
                        <div class="e-box">
                            <div @click="handleChangeVideo(videoList[1].videoTypeId)" class="e-cube">
                                <i class="icon iconfont icon-changeVideo"></i>
                                <span>替换热门视频</span>
                            </div>
                            <div @click="handlePlayVideo(videoList[1].videoUrl)" class="e-cube border-left">
                                <i class="icon iconfont icon-play"></i>
                                <span>播放</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-item" @mouseenter="handleHoverEnter($event)" @mouseleave="handleHoverLeave($event)" >
                    <img class="img-height" :src="videoList[2].previewUrl" >
                    <div class="video-mask extra-video">
                        <h2 class="text-truncate">{{videoList[2].videoTitle}}</h2>
                        <p>{{videoList[2].speakerName}}</p>
                    </div>
                    <div class="vd-events">
                        <div class="e-box">
                            <div @click="handleChangeVideo(videoList[2].videoTypeId)" class="e-cube">
                                <i class="icon iconfont icon-changeVideo"></i>
                                <span>替换热门视频</span>
                            </div>
                            <div @click="handlePlayVideo(videoList[2].videoUrl)" class="e-cube border-left">
                                <i class="icon iconfont icon-play"></i>
                                <span>播放</span>
                            </div>
                        </div>
                    </div>
                </div>
                <SelectVideo v-on:modal="handleClose" title="查看详情" :modal="modal.selectVideo" ></SelectVideo>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import $ from 'jquery';
import index_video from 'assets/image/video_bg.png';
import SelectVideo from '@layout/modal/selectVideo.vue';

// image
import video_1 from 'assets/image/video_sm.png';
import video_2 from 'assets/image/video_sm1.png';

import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

export default {
    data() {
        return {
            videoList: [
                {
                    videoTypeId: '1',
                    recommendPos: 0,
                    previewUrl: index_video,
                    videoTitle: '知识改变命运',
                    speakerName: 'Franscisco',
                    schoolName: '', // 学校名字，用于自定义文本信息类型
                    speakTimestamp: 123, // 演讲时间戳
                    publishTimestamp: 123, // 发布时间戳
                    videoTypeIdStr: '', // 分类字符串，逗号分隔
                    videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4', // 视频文件地址，不包含域名等不确定前缀
                    enable: 1, // 启用：0=否；1=是
                    recommendPos: 0 // 推荐位置：0=没有;
                },
                {
                    videoTypeId: '2',
                    recommendPos: 1,
                    previewUrl: video_1,
                    videoTitle: '知识改变命运',
                    speakerName: 'Franscisco',
                    schoolName: '', // 学校名字，用于自定义文本信息类型
                    speakTimestamp: 123, // 演讲时间戳
                    publishTimestamp: 123, // 发布时间戳
                    videoTypeIdStr: '', // 分类字符串，逗号分隔
                    videoUrl:
                        'http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L', // 视频文件地址，不包含域名等不确定前缀
                    enable: 1, // 启用：0=否；1=是
                    recommendPos: 0 // 推荐位置：0=没有;
                },
                {
                    videoTypeId: '3',
                    recommendPos: 2,
                    previewUrl: video_2,
                    videoTitle: '知识改变命运',
                    speakerName: 'Franscisco',
                    schoolName: '', // 学校名字，用于自定义文本信息类型
                    speakTimestamp: 123, // 演讲时间戳
                    publishTimestamp: 123, // 发布时间戳
                    videoTypeIdStr: '', // 分类字符串，逗号分隔
                    videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4', // 视频文件地址，不包含域名等不确定前缀
                    enable: 1, // 启用：0=否；1=是
                    recommendPos: 0 // 推荐位置：0=没有;
                }
            ],
            modal: {
                video: false,
                videoUrl: '',
                selectVideo: false
            },
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
            }
        };
    },
    methods: {
        handleHoverEnter(event) {
            const $target = $(event.target);
            $target.find('.vd-events').addClass('active');
        },
        handleHoverLeave(event) {
            const $target = $(event.target);
            $target.find('.vd-events').removeClass('active');
        },
        handlePlayVideo(videourl) {
            this.modal.video = true;
            this.playerOptions.sources[0].src = videourl;
        },
        handleVideoClose() {
            this.$refs.videoPlayer.player.pause();
            this.modal.video = false;
        },
        handleClose() {
            this.modal.selectVideo = false;
        },
        handleChangeVideo(id) {
            console.log(id);
            this.modal.selectVideo = true;
        }
    },
    components: {
        videoPlayer,
        SelectVideo
    }
};
</script>
<style lang="scss">
@import '../../scss/variable/_video.scss';

.img-height {
    height: 100%;
}

// video 响应式
.video-js {
    width: 100%;
    height: auto;
    margin: 0 auto;
}

.video-js .vjs-tech {
    //这行代码最为关键，这样视频播放器的外层容器都由视频内容本身撑大
    position: relative;
}

.video-player {
    width: 100%;
    overflow: hidden;
    position: relative;
    top: 0;
}

.video-wrapper {
    display: flex;
    max-width: 950px;
    .video-col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .video-item {
        position: relative;
        overflow: hidden;

        .vd-events {
            display: none;
            top: 0;
            position: absolute;
            transition: all 0.3s ease;
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            height: 100%;
            z-index: 10;
            justify-content: center;
            align-items: center;
            &.active {
                display: flex;
            }
            .e-box {
                display: flex;
                text-align: center;
                color: #fff;
                .e-cube {
                    cursor: pointer;
                    padding: 0 40px;
                    display: flex;
                    flex-direction: column;
                    &.border-left {
                        border-left: 1px solid;
                    }
                    i {
                        font-size: 40px;
                    }
                    span {
                        font-size: 16px;
                        line-height: 40px;
                    }
                }
            }
        }
    }
    .video-mask {
        width: 100%;
        color: white;
        box-sizing: border-box;
        z-index: 5;
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        bottom: 0;
        padding: 15px 10px 15px 20px;
        &.extra-video {
            padding: 0 20px;
            height: 65px;
            width: 100%;
            bottom: 0;
            h2 {
                margin: 10px 0 5px;
                font-size: 20px;
            }
            p {
                font-size: 14px;
                margin: 0;
            }
        }
        &.index-video {
            padding: 15px 40px;
            height: 100px;
        }
        h2 {
            font-size: 28px;
            font-weight: bold;
            margin: 5px 0;
        }
        p {
            margin: 10px 0;
        }
    }
}
</style>
