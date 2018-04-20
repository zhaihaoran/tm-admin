<template>
    <div>
        <el-card v-for="item in videoTopList" :key="item.$index" class="mb-20" >
            <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
                <el-button @click="handleSave(item)" class="card-header-save" >保存</el-button>
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
                        <a :href="video.linkUrl" class="card-image">
                            <img class="img-fluid min-images" :src="video.previewUrl">
                            <span class="vd-times badge">{{formatDuration(video.duration)}}</span>
                        </a>
                        <div :href="video.linkUrl" class="card-content">
                            <span class="card-title grey-333">{{video.videoTitle}}</span>
                            <div class="vd-extra">
                                <span>演讲者：{{video.speakerName}}</span>
                                <span>学校：{{video.schoolName}}</span>
                                <span>{{dateformat(video.addTimestamp)}} <span class="text-right" >{{video.playTimes}} 次播放</span> </span>
                            </div>
                            <span v-if="+video.enable < 0" class="bages">未激活</span>
                            <span class="delete-icon" @click="deleteVideo(item,index)" ><i class="el-icon-delete"></i></span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 选择视频 -->
        <!-- point: 组件双向绑定！.sync -->
        <SelectVideo :videoTypeId.sync="selectTypeId" v-on:selectVideoId="handleSaveVideo" v-on:modal="handleClose" title="查看详情" :modal="modal.selectVideo"  ></SelectVideo>
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

import SelectVideo from '@layout/modal/selectVideo.vue';
import VideoCard from '@layout/videoCard.vue';
import Upload from '@layout/upload.vue';

import image from '../../assets/image/logo/tsinghua.png';
export default {
    data() {
        return {
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
        SelectVideo
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
                    console.log(res.data.data);
                    this.videoTopList = res.data.data.videoTopList;
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

            // 提交
            // this.handleSave(typeItem);
        },

        /* 删除 */
        deleteVideo(item, index) {
            item.videoList.splice(index, 1);
            console.log(item.videoList);
            // 提交
            // this.handleSave(item);
        },
        /* 唯一key 用于拖拽 */
        unique(typeId, id) {
            return `${typeId}_${id}`;
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
                    // 成功之后重新取数据刷新;
                    this.init();
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


