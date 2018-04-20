<template>
    <el-dialog :title="title" :visible.sync="modal" :before-close="handleModalClose" >
        <el-form :model="form" ref="form" label-width="80px" class="modal-form" >
            <el-form-item label="视频文件">
                <Upload
                    v-on:uploading="handleUploading"
                    :disabled="uploadState"
                    v-on:end="handleUploadEnd"
                    liststyle="" filepathname="videoShortPathFilename" ></Upload>
                <el-input type="number" v-model="form.duration" placeholder="视频时长"  >
                    <template slot="append">秒</template>
                </el-input>
            </el-form-item>
            <el-form-item label="预览图片" >
                <Cropper
                    classes="card-uploader"
                    v-on:update="handleUpdateCropperUrl"
                    filepathname="previewShortPathFilename"
                    previewname="previewUrl"
                    :previewUrl="previewUrl"
                    aspectRatio="1.5"
                ></Cropper>
                <div class="upload-image-box"></div>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.videoTitle" ></el-input>
            </el-form-item>

            <!-- 学校 -->
            <el-form-item label="学校">
                <el-radio-group v-model="form.schoolInfoType" size="small" >
                    <el-radio-button label="1">选择</el-radio-button>
                    <el-radio-button label="2">填写</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                    <i class="el-icon-question md-qs"></i>
                </el-tooltip>
                <el-input placeholder="请输入学校名称" class="mt-10" v-show="form.schoolInfoType == 2" v-model="form.schoolName" ></el-input>
                <SlRemote :defaults="form.schoolName" v-show="form.schoolInfoType == 1" placeholder="学校名称" v-on:id="handleUpdateSchoolId"  action="getSchoolListForInput" >
                    <template slot-scope="scope" >
                        <div class="d-center sl_option">
                            <div class="sl_image">
                                <img :src="scope.option.profilePhotoUrl" class="img-fluid" alt="">
                            </div>
                            <div class="sl_body">
                                <h4 class="sl_title">{{scope.option.name}}</h4>
                                <h5 class="sl_info">{{scope.option.schoolShortDesc}}</h5>
                            </div>
                        </div>
                    </template>
                </SlRemote>
            </el-form-item>
            <!-- 演讲者 -->
            <el-form-item label="演讲者">
                <el-radio-group v-model="form.speakerInfoType" size="small" >
                    <el-radio-button label="1">选择</el-radio-button>
                    <el-radio-button label="2">填写</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                    <i class="el-icon-question md-qs"></i>
                </el-tooltip>
                <el-input placeholder="请输入演讲者名称" class="mt-10" v-show="form.speakerInfoType == 2 " v-model="form.speakerName" ></el-input>

                <SlRemote :defaults="form.speakerName" v-show="form.speakerInfoType == 1" placeholder="演讲者名称" v-on:id="handleUpdateSpeakerId"  action="getSpeakerListForInput" >
                    <template slot-scope="scope" >
                        <div class="d-center sl_option">
                            <div class="sl_image">
                                <img :src="scope.option.profilePhotoUrl" class="img-fluid" alt="">
                            </div>
                            <div class="sl_body">
                                <h4 class="sl_title">{{scope.option.name}}</h4>
                                <h5 class="sl_info">{{scope.option.speakerShortDesc}}</h5>
                            </div>
                        </div>
                    </template>
                </SlRemote>

            </el-form-item>
            <el-form-item label="演讲时间">
                <el-date-picker
                    v-model="speakTimestamp"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期时间"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="视频详情">
                <el-input v-model="form.videoDesc" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="分类">
                <el-select v-model="category" multiple placeholder="请选择">
                    <el-option
                    v-for="item in videoTypeList"
                    :key="item.videoTypeId"
                    :label="item.name"
                    :value="item.videoTypeId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="受益人次">
                <el-input v-model="form.benefitPeopleTimes" type="number"></el-input>
            </el-form-item>
            <el-form-item label="播放次数">
                <el-input v-model="form.playTimes" type="number" ></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                    v-model="tab"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择">
                </el-select>
            </el-form-item>
            <el-form-item label="启用">
                <el-switch
                    v-model="form.enable"
                    active-value="1"
                    inactive-value="0"
                >
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="center dialog-footer">
            <el-button @click="handleModalClose">取 消</el-button>
            <el-button :disabled="uploadState" width="200px" type="primary" placeholder="请输入关键词查询" @click="submitVideo">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import Upload from '@layout/videoUpload.vue';
import Cropper from '@layout/modal/Cropper.vue';
import SlRemote from '@layout/slremote.vue';

import image from 'assets/image/logo/tsinghua.png';

export default {
    name: 'modal_video_add',
    data() {
        return {
            uploadState: false, //上传状态
            videoTypeList: [],
            loading: false,
            pickerOptions1: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
            category: []
        };
    },
    watch: {
        videoTypeIdStr(val) {
            this.category = val.split(',');
        }
    },
    props: {
        modal: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '选择视频'
        },
        action: {
            type: String
        }
    },
    mounted() {
        this.handleGetVideoTypes();
    },
    computed: {
        ...mapState({
            pathfilename: state => state.upload.pathfilename,
            previewUrl: state => state.upload.previewUrl,
            originFilename: state => state.upload.originFilename,
            previewShortPathFilename: state =>
                state.upload.previewShortPathFilename,
            videoShortPathFilename: state =>
                state.upload.videoShortPathFilename,
            tagstab: state => state.modal.tagstab,
            videoTypeIdStr: state => state.modal.videoTypeIdStr,
            form: state => state.modal.form
        }),
        speakTimestamp: {
            set(value) {
                this.$store.commit('setDateValue', {
                    speakTimestamp: value / 1000
                });
            },
            get() {
                return this.$store.state.modal.speakTimestamp * 1000;
            }
        },
        tab: {
            set(value) {
                this.$store.commit('changeTags', value);
            },
            get() {
                return this.tagstab;
            }
        }
    },
    components: {
        Upload,
        SlRemote,
        Cropper
    },
    methods: {
        ...mapMutations([
            'formSubmit',
            'getArrayData',
            'setDateValue',
            'updateFormValue'
        ]),
        submitVideo() {
            let cfg = {
                act: this.action,
                videoId: this.form.videoId,
                videoShortPathFilename: this.videoShortPathFilename,
                videoOriginFilename: this.originFilename,
                previewShortPathFilename: this.previewShortPathFilename,
                videoTitle: this.form.videoTitle,
                speakerInfoType: this.form.speakerInfoType,
                speakerId: this.form.speakerId,
                speakerName: this.form.speakerName,
                schoolInfoType: this.form.schoolInfoType,
                schoolId: this.form.schoolId,
                schoolName: this.form.schoolName,
                duration: this.form.duration,
                speakTimestamp: Math.floor(this.speakTimestamp / 1000),
                videoDesc: this.form.videoDesc,
                videoTypeIdStr: this.category.join(','),
                benefitPeopleTimes: this.form.benefitPeopleTimes,
                playTimes: this.form.playTimes,
                tag: this.tab.join(','),
                enable: this.form.enable,
                duration: this.form.duration
            };
            console.log(cfg);
            if (!this.form.videoId) {
                delete cfg.videoId;
            }
            this.formSubmit({
                ...cfg,
                isMessage: true,
                successText: '成功',
                onSuccess: res => {
                    this.handleModalClose();
                }
            });
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
        handleModalClose() {
            // 通过$emit 实现子组件与父组件进行沟通
            this.$emit('modal');
        },

        handleUpdateSchoolId(cfg) {
            this.updateFormValue({
                type: 'schoolId',
                value: cfg ? cfg.schoolId : ''
            });
        },

        handleUpdateSpeakerId(cfg) {
            this.updateFormValue({
                type: 'speakerId',
                value: cfg ? cfg.speakerId : ''
            });
        },
        /* 设置cropperUrl */
        handleUpdateCropperUrl(obj) {
            this.form.previewUrl = obj.fileUrl;
            this.form.pathFilename = obj.pathFilename;
        },
        /* 添加图片 */
        handleUploadVideo(file) {
            let formCfg = new FormData();
            formCfg.append('file', file.raw);

            this.commonUpload({
                formCfg,
                filepathname: this.filepathname,
                previewname: this.previewname,
                onSuccess: res => {
                    console.log(res);
                }
            });
        },

        /* 上传中，禁用按钮 */
        handleUploading() {
            this.uploadState = true;
            this.$message('上传中');
        },

        /* 上传中，禁用按钮 */
        handleUploadEnd() {
            this.uploadState = false;
            this.$message({ type: 'success', message: '上传成功' });
        }
    }
};
</script>
<style lang="scss">
.md-qs {
    margin-left: 10px;
    font-size: 20px;
    position: relative;
    top: 5px;
}
.modal-form {
    width: 460px;
}
</style>


