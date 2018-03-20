<template>
    <el-tabs type="border-card">
        <el-tab-pane label="通用">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="setting-form" >
                <el-form-item label="头像">
                    <div class="avatar">
                        <img v-if="cropperConfig.url.length>0" :src="cropperConfig.url" class="img-fluid" alt="avatar">
                        <span v-if="cropperConfig.url.length==0" >暂无头像</span>
                    </div>
                    <el-button type="primary" @click="cropperConfig.modal=true" >上传头像</el-button>
                    <el-dialog :visible.sync="cropperConfig.modal" width="360px" title="头像" >
                        <Cropper
                            :config="cropperConfig"
                        ></Cropper>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="学校名称" prop="schoolName" >
                    河北实验中学
                </el-form-item>
                <el-form-item label="学校地址" prop="schoolPos" >
                    河北省石家庄市奕成县石家庄实验中学
                </el-form-item>
                <el-form-item label="简介" prop="des1" >
                    <el-input type="textarea" class="tm-textarea" v-model="form.des1"></el-input>
                </el-form-item>
                <el-form-item label="教学特色" prop="des2" >
                    <el-input type="textarea" class="tm-textarea" v-model="form.des2"></el-input>
                </el-form-item>
                <el-form-item label="学校状况" prop="des3" >
                    <el-input type="textarea" class="tm-textarea" v-model="form.des3"></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="相册">
            <div class="upload-pic">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="filelist"
                    list-type="picture">
                    <el-button type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip upload-tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <div class="individar"></div>
            <el-row :gutter="10">
                <el-col class="tm-col-5 pic-cube" :sm="12" :md="8" :lg="6" v-for="photo in photos" :key="photo.id" v-dragging="{ item: photo, list: photos, group: 'photo' }" >
                    <img ref="photo" :src="photo.url" class="img-fluid" alt="">
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="视频">
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <div :class="[videoClass,{active:video.personalPageRecommend}]" >
                        <div class="card-image">
                            <img class="img-fluid" :src="video.img">
                            <span class="vd-times badge">{{video.time}}</span>
                        </div>
                        <div class="card-content">
                            <span class="card-title grey-333">{{video.title}}</span>
                            <div class="vd-extra">
                                <span>演讲者：{{video.author}}</span>
                                <span>学校：{{video.school}}</span>
                                <span>{{video.startTime}} <span class="text-right" >{{video.count}} 次播放</span> </span>
                            </div>
                        </div>
                        <span @click="recommend(video)"  class="bages"  ><i class="el-icon-upload2"></i>推荐</span>
                        <div class="recommend-box">
                            <span>点亮按钮可设置为推荐视频</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-pagination
                :current-page.sync="current"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="100"
                class="photo-pagination"
            >
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import jQuery from 'jquery';
import Cropper from '@layout/modal/cropper.vue';
import '@comp/lib/velocity.min.js';
import '@comp/lib/materialbox.js';
import Util from '@comp/lib/utils.js';
export default {
    mounted() {
        this.$dragging.$on('dragged', ({ value }) => {
            console.log(value);
            console.log('hahaha');
        });
        $(this.$refs.photo).materialbox();
    },
    data() {
        return {
            videoClass: {
                video: true,
                'card-hover': true,
                hoverable: true
            },
            cropperConfig: {
                modal: false,
                url: ''
            },
            avatar: {
                dialog: true,
                src: ''
            },
            example2: {
                img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
                info: true,
                size: 1,
                outputType: 'jpeg',
                canScale: false,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 300,
                autoCropHeight: 250,
                // 开启宽度和高度比例
                fixed: true,
                fixedNumber: [4, 3]
            },
            current: 3,
            filelist: [
                {
                    name: 'food.jpeg',
                    url:
                        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                },
                {
                    name: 'food2.jpeg',
                    url:
                        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],
            form: {
                schoolName: '',
                schoolPos: '',
                dest1: '',
                dest2: '',
                dest3: ''
            },
            rules: {
                schoolName: [],
                schoolPos: '',
                dest1: '',
                dest2: '',
                dest3: ''
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
            photos: [
                // 在static下的文件不经过处理，引用必须用绝对路径
                {
                    id: 1,
                    url: '/static/image/guests/guest1.png'
                },
                {
                    id: 2,
                    url: '/static/image/guests/guest2.png'
                },
                {
                    id: 3,
                    url: '/static/image/guests/guest3.png'
                },
                {
                    id: 4,
                    url: '/static/image/guests/guest4.png'
                },
                {
                    id: 5,
                    url: '/static/image/guests/guest1.png'
                },
                {
                    id: 6,
                    url: '/static/image/guests/guest2.png'
                },
                {
                    id: 7,
                    url: '/static/image/guests/guest3.png'
                },
                {
                    id: 8,
                    url: '/static/image/guests/guest4.png'
                },
                {
                    id: 9,
                    url: '/static/image/guests/guest1.png'
                },
                {
                    id: 10,
                    url: '/static/image/guests/guest2.png'
                }
            ]
        };
    },
    methods: {
        recommend(value) {
            value.personalPageRecommend = 1;
            // if (+value.id < 2) {
            //     return false;
            // }
            // this.videos = Util.moveToTop(value, array, 'id');
        },
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    console.log('OK');
                } else {
                    console.log('error submit! please try agin');
                    return false;
                }
            });
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.avatar.src = file.url;
            this.avatar.dialog = true;
        },
        beforeAvatarUpload(file, m) {
            // 打开弹窗
            this.avatar.dialog = true;
            // 填充url
        }
    },
    components: {
        Cropper
    }
};
</script>
<style lang="scss" >
.avatar {
    width: 200px;
    height: 200px;
    display: flex;
    margin: 10px 0;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(220, 223, 230);
}
.setting-form {
    max-width: 500px;
}
.photo-pagination {
    float: right;
}
.el-upload__tip.upload-tip {
    padding-left: 20px;
    display: inline-block;
}
.el-upload-list {
    display: flex;
    flex-wrap: wrap;
}
.el-upload-list--picture .el-upload-list__item {
    max-width: 300px;
    margin-right: 10px;
}
.pic-cube {
    margin: 5px 0;
}

.video {
    position: relative;
}

.hoverable.card-hover.active {
    .bages {
        opacity: 1;
        background: #bb2133;
    }
}

.recommend-box {
    opacity: 0;
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    width: calc(100% - 86px);
    height: 26px;
    line-height: 26px;
    color: #fff;
    padding: 8px;
    font-size: 12px;
    padding-left: 78px;
}
.bages {
    opacity: 0;
    position: absolute;
    top: 8px;
    left: 10px;
    color: #fff;
    z-index: 50;
    height: 26px;
    line-height: 26px;
    width: 60px;
    background: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
    z-index: 50;
    i {
        margin: 0 5px;
    }
}

.admin-cropper {
    width: 500px;
    height: 500px;
}
.picture-card {
    display: none;
}
</style>


