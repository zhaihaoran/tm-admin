<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>选择热门视频</span>
        </div>
        <el-row :gutter="3" class="video-wrapper" >
            <el-col :lg="16" class="index-video" >
                <div class="big-item"
                    @mouseenter="handleHoverEnter($event)"
                    @mouseleave="handleHoverLeave($event)"
                >
                    <div class="cover-image" :style="{ backgroundImage: 'url(' + videoRecommend[0].previewUrl + ')'}" ></div>
                    <div class="video-mask index-video">
                        <h2 class="text-truncate">{{videoRecommend[0].videoTitle}}</h2>
                        <p>{{videoRecommend[0].speakerName}}</p>
                    </div>
                    <div :class="op_class">
                        <div class="e-box">
                            <div @click="handleChangeVideo(0,videoRecommend[0].videoId)" class="e-cube">
                                <i class="icon iconfont icon-changeVideo"></i>
                                <span>替换热门视频</span>
                            </div>
                            <div @click="handlePlayVideo(videoRecommend[0].videoUrl)" class="e-cube border-left">
                                <i class="icon iconfont icon-play"></i>
                                <span>播放</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :lg="8" class="extra-video" >
                <div class="video-item" @mouseenter="handleHoverEnter($event)" @mouseleave="handleHoverLeave($event)" >
                    <div class="cover-image" :style="{backgroundImage: 'url(' + videoRecommend[1].previewUrl + ')'}" ></div>
                    <div class="video-mask extra-video">
                        <h2 class="text-truncate">{{videoRecommend[1].videoTitle}}</h2>
                        <p>{{videoRecommend[1].speakerName}}</p>
                    </div>
                    <div :class="op_class">
                        <div class="e-box">
                            <div @click="handleChangeVideo(1,videoRecommend[1].videoId)" class="e-cube">
                                <i class="icon iconfont icon-changeVideo"></i>
                                <span>替换热门视频</span>
                            </div>
                            <div @click="handlePlayVideo(videoRecommend[1].videoUrl)" class="e-cube border-left">
                                <i class="icon iconfont icon-play"></i>
                                <span>播放</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-item mt-col" @mouseenter="handleHoverEnter($event)" @mouseleave="handleHoverLeave($event)" >
                    <div class="cover-image" :style="{backgroundImage: 'url(' + videoRecommend[2].previewUrl + ')'}" ></div>
                    <div class="video-mask extra-video">
                        <h2 class="text-truncate">{{videoRecommend[2].videoTitle}}</h2>
                        <p>{{videoRecommend[2].speakerName}}</p>
                    </div>
                    <div :class="op_class">
                        <div class="e-box">
                            <div @click="handleChangeVideo(2,videoRecommend[2].videoId)" class="e-cube">
                                <i class="icon iconfont icon-changeVideo"></i>
                                <span>替换热门视频</span>
                            </div>
                            <div @click="handlePlayVideo(videoRecommend[2].videoUrl)" class="e-cube border-left">
                                <i class="icon iconfont icon-play"></i>
                                <span>播放</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
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
        <!-- 替换视频 -->
        <SelectVideo :videoId="videoId" v-on:selectVideoId="handleModifyVideoRecommend" v-on:modal="handleClose" title="查看详情" :modal="modal.selectVideo" ></SelectVideo>
    </el-card>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

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
            videoId: '', //  中间值 - 选中的id
            pos: 1, //  中间值 - 选中的位置
            videoIdStr: [], // 接口所需的参数配置
            op_class: {
                'vd-events': true,
                active: false
            },
            videoRecommend: [
                {
                    previewUrl: ''
                },
                {
                    previewUrl: ''
                },
                {
                    previewUrl: ''
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
    mounted() {
        this.init();
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
            feedList: state => state.search.feedList,
            schoolProgress: state => state.progress.schoolProgress,
            speakerProgress: state => state.progress.speakerProgress
        })
    },
    methods: {
        ...mapMutations(['getPageData', 'getArrayData', 'formSubmit']),
        /* 页面初始化 */
        init() {
            this.getArrayData({
                act: 'getVideoRecommend',
                onSuccess: res => {
                    /* 如果为空，要做判断处理 */
                    /* map 是返回新数组！ */
                    this.videoRecommend = this.videoRecommend.map(
                        (el, index) => {
                            return res.data.data.videoRecommend[index] || {};
                        }
                    );
                    this.videoIdStr = [
                        this.videoRecommend[0].videoId,
                        this.videoRecommend[1].videoId,
                        this.videoRecommend[2].videoId
                    ];
                    console.log(this.videoRecommend);
                }
            });
        },
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
        /* 当点击替换视频时，就去拿视频列表 */
        /* pos 代表替换的是哪个位置的视频 */
        handleChangeVideo(pos, videoId) {
            this.modal.selectVideo = true;
            this.videoId = videoId;
            this.pos = pos;
            /* 渲染内部视频列表 */
            this.getPageData({
                act: 'getVideoList'
            });
        },
        /* 提交修改过后的推荐视频列表 */
        handleModifyVideoRecommend(obj) {
            this.videoIdStr[this.pos] = obj.videoId;
            const cfg = this.videoIdStr.join(',');
            this.formSubmit({
                act: 'modifyVideoRecommend',
                videoIdStr: cfg,
                successText: '替换成功',
                onSuccess: res => {
                    this.init();
                }
            });
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

    .video-item {
        position: relative;
        overflow: hidden;
    }

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
.mt-col {
    margin-top: 3px;
}
</style>
