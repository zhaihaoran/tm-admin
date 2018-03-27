<template>
    <div>
        <el-card class="mb-20" >
            <div slot="header" class="clearfix">
                <span>职业规划</span>
                <el-button @click="submitForm()" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="handleAddVideo(1)" type="primary" >选择视频</el-button>
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <VideoCard :video="video" ></VideoCard>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mb-20" >
            <div slot="header" class="clearfix">
                <span>兴趣爱好</span>
                 <el-button @click="submitForm()" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="modal.selectVideo = true" type="primary" >选择视频</el-button>
            <el-button class="mb-20" @click="handleAddVideo(2)"  >新增视频</el-button>
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <VideoCard :video="video" ></VideoCard>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mb-20" >
            <div slot="header" class="clearfix">
                <span>专业学习</span>
                 <el-button @click="submitForm()" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="handleAddVideo(3)" type="primary" >选择视频</el-button>
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <VideoCard :video="video" ></VideoCard>
                </el-col>
            </el-row>
        </el-card>
        <!-- 视频添加播放弹窗 -->
        <VideoDialog v-on:modal="handleClose" title="添加视频" :modal="modal.addVideo" ></VideoDialog>
        <SelectVideo v-on:modal="handleClose" title="查看详情" :modal="modal.selectVideo"  ></SelectVideo>
    </div>
</template>
<script>
import axios from 'axios';
import SelectVideo from '@layout/modal/selectVideo.vue';
import VideoCard from '@layout/videoCard.vue';
import VideoDialog from '@layout/modal/VideoDialog.vue';
import Upload from '@layout/upload.vue';

import image from '../../assets/image/logo/tsinghua.png';
export default {
    data() {
        return {
            schools: [
                {
                    value: '1',
                    url: image,
                    label: '清华大学',
                    info: '简称清华，全国重点大学',
                    context:
                        'hahahahahahahahahahahahaahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha'
                },
                {
                    value: '2',
                    url: image,
                    label: '湖南大学',
                    info: '简称清华，全国重点大学',
                    context:
                        'hahahahahahaahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha'
                },
                {
                    value: '3',
                    url: image,
                    label: '北京大学',
                    info: '简称清华，全国重点大学',
                    context: 'hahahahahahahahahahahahahahaha'
                }
            ],
            currentPage: 1,
            list: [],
            categoryTabs: [
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
            modal: {
                addVideo: false,
                selectVideo: false
            },
            videos: [
                {
                    id: '1',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: '成为更好的自己',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 1
                },
                {
                    id: '2',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha1',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                },
                {
                    id: '3',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha2',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                },
                {
                    id: '4',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha3',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                },
                {
                    id: '5',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha4',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                }
            ],
            addForm: {
                title: '',
                manCounts: 1,
                playCounts: 1,
                schoolRadio: '选择',
                schoolId: '',
                speakerRadio: '填写',
                speakerId: '',
                tabs: [],
                category: [],
                start: false,
                rules: {}
            }
        };
    },
    components: {
        VideoCard,
        Upload,
        SelectVideo,
        VideoDialog
    },

    methods: {
        handleAddVideo() {
            this.modal.addVideo = true;
        },

        handleClose() {
            this.modal.selectVideo = false;
            this.modal.addVideo = false;
        },

        submitForm() {
            console.log('haha');
        }
    }
};
</script>
<style lang="scss">
.tip-info {
    display: inline-block;
    margin-left: 20px;
}

.card-header-save {
    float: right;
    position: relative;
    bottom: 6px;
}
</style>


