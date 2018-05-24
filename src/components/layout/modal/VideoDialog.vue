<template>
    <el-dialog width="560px" :title="title" :visible.sync="modal" class="video-dialog" :before-close="handleModalClose" >
        <el-form ref="form" :rules="rules" :model="form"  label-width="80px" class="modal-form" >
            <el-form-item prop="videoOriginFilename" label="视频文件">
                <Upload
                    v-on:uploading="handleUploading"
                    :disabled="uploadState"
                    v-on:end="handleUploadEnd"
                    :filename="form.videoOriginFilename"
                    liststyle="" filepathname="videoShortPathFilename" >
                </Upload>
            </el-form-item>
            <el-form-item prop="duration" label="视频时长">
                <el-input-number class="dialog-duration-min" v-model="min" :controls="false" label="分钟" :min="0" :max="500">
                    <template slot="append">分钟</template>
                </el-input-number>
                <el-input-number class="dialog-duration-sec" v-model="sec" :controls="false" label="秒" :min="0" :max="60">
                    <template slot="append">秒</template>
                </el-input-number>
            </el-form-item>
            <el-form-item prop="previewShortPathFilename" label="预览图片" >
                <Cropper
                    classes="card-uploader"
                    v-on:update="handleUpdateCropperUrl"
                    filepathname="previewShortPathFilename"
                    previewname="previewUrl"
                    :previewUrl="previewUrl"
                    aspectRatio="1.5"
                    width="900"
                ></Cropper>
                <div class="upload-image-box"></div>
            </el-form-item>
            <el-form-item prop="videoTitle" label="标题">
                <el-input v-model="form.videoTitle" ></el-input>
            </el-form-item>

            <!-- 学校 -->
            <el-form-item label="学校">
                <el-radio-group @change="handleChangeRadio('sc_option')" v-model="form.schoolInfoType" size="small" >
                    <el-radio-button label="1">选择</el-radio-button>
                    <el-radio-button label="2">填写</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                    <i class="el-icon-question md-qs"></i>
                </el-tooltip>
                <el-input placeholder="请输入学校名称" class="mt-10" v-show="form.schoolInfoType == 2" v-model="form.schoolName" ></el-input>
                <SlRemote
                    :dption="sc_option" v-show="form.schoolInfoType == 1"
                    placeholder="学校名称"
                    v-on:id="handleUpdateSchoolId"
                    action="getSchoolListForInput"
                >
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
            <!-- 梦享家 -->
            <el-form-item label="梦享家">
                <el-radio-group @change="handleChangeRadio('sp_option')" v-model="form.speakerInfoType" size="small" >
                    <el-radio-button label="1">选择</el-radio-button>
                    <el-radio-button label="2">填写</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的梦享家无法查看主页，无法对其发起邀约" placement="right">
                    <i class="el-icon-question md-qs"></i>
                </el-tooltip>
                <el-input placeholder="请输入梦享家名称" class="mt-10" v-show="form.speakerInfoType == 2 " v-model="form.speakerName" ></el-input>

                <SlRemote
                    :dption="sp_option"
                    v-show="form.speakerInfoType == 1"
                    placeholder="梦享家名称"
                    v-on:id="handleUpdateSpeakerId"
                    action="getSpeakerListForInput"
                >
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
            <el-form-item prop="speakTimestamp" label="演讲时间">
                <el-date-picker
                    v-model="timestamp"
                    format="yyyy-MM-dd HH:mm"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期时间"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="videoDesc" label="视频详情">
                <el-input v-model="form.videoDesc" :autosize="{minRows: 3, maxRows: 8}" type="textarea"></el-input>
            </el-form-item>

            <el-form-item prop="benefitPeopleTimes" label="受益人次">
                <el-input v-model="form.benefitPeopleTimes" type="number">
                    <template slot="append">次</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="playTimes" label="播放次数">
                <el-input v-model="form.playTimes" type="number" >
                    <template slot="append">次</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="category" label="分类">
                <el-select v-model="category" multiple placeholder="请选择">
                    <el-option
                    v-for="item in videoTypeList"
                    :key="item.videoTypeId"
                    :label="item.name"
                    :value="item.videoTypeId">
                    </el-option>
                </el-select>
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
            <el-button :disabled="uploadState" width="200px" type="primary" placeholder="请输入关键词查询" @click="submitVideo('form')">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import code from '@comp/lib/codes';
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
            category: [],
            isClear: false,
            timestamp: '',
            min: 0,
            sec: 0,
            rules: {
                videoTitle: [
                    {
                        required: true,
                        message: '请输入视频标题',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '视频标题长度在20字以内',
                        trigger: 'blur'
                    }
                ],
                duration: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '请输入视频时长'
                    }
                ],
                videoOriginFilename: [
                    {
                        required: true,
                        message: '请上传视频',
                        trigger: 'blur'
                    }
                ],
                benefitPeopleTimes: [
                    {
                        required: true,
                        message: '受益人次为必填项',
                        trigger: 'blur'
                    }
                ],
                speakTimestamp: [
                    {
                        required: true,
                        message: '演讲时间为必填项',
                        trigger: 'blur'
                    }
                ],
                previewShortPathFilename: [
                    {
                        required: true,
                        message: '封面图片为必填项',
                        trigger: 'blur'
                    }
                ],
                playTimes: [
                    {
                        required: true,
                        message: '播放次数为必填项',
                        trigger: 'blur'
                    }
                ],
                videoDesc: [
                    {
                        required: true,
                        message: '视频详情为必填项',
                        trigger: 'blur'
                    },
                    {
                        min: 10,
                        max: 1000,
                        message: '视频详情长度在10~1000字以内',
                        trigger: 'blur'
                    }
                ]
            }
        };
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
            sc_option: state => state.modal.sc_option,
            sp_option: state => state.modal.sp_option,
            videoTypeIdStr: state => state.modal.videoTypeIdStr,
            form: state => state.modal.form
        }),
        tab: {
            set(value) {
                this.$store.commit('changeTags', value);
            },
            get() {
                return this.tagstab || [];
            }
        }
    },
    watch: {
        /**
         * TODO: Needs refactorying
         */
        'form.speakTimestamp'(val) {
            this.timestamp = !!val ? new Date(+val * 1000) : '';
        },
        timestamp(val) {
            this.updateFormValue({
                type: 'speakTimestamp',
                value: val ? ~~(new Date(val).getTime() / 1000) : ''
            });
        },
        videoTypeIdStr(val) {
            /* 避免出现 [""] */
            this.category = val ? val.split(',') : [];
        },
        'form.duration'(val = 0) {
            this.min = ~~(val / 60);
            this.sec = val % 60;
        },
        min(val) {
            let durations = val * 60 + this.sec || 0;
            this.updateFormValue({
                type: 'duration',
                value: durations || ''
            });
        },
        sec(val) {
            let durations = (this.min || 0) * 60 + val;
            this.updateFormValue({
                type: 'duration',
                value: durations || ''
            });
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
            'clearModalData',
            'clearPhotoData',
            'clearOption',
            'getArrayData',
            'getPageData',
            'updateFormValue',
            'update'
        ]),
        submitVideo(form) {
            /* 手动校验 */
            let cfg = {
                act: this.action,
                videoId: this.form.videoId,
                videoShortPathFilename: this.videoShortPathFilename,
                videoOriginFilename: this.form.videoOriginFilename,
                previewShortPathFilename: this.previewShortPathFilename,
                videoTitle: this.form.videoTitle,
                speakerInfoType: this.form.speakerInfoType,
                speakerId: this.form.speakerId,
                speakerName: this.form.speakerName,
                schoolInfoType: this.form.schoolInfoType,
                schoolId: this.form.schoolId,
                schoolName: this.form.schoolName,
                duration: this.form.duration,
                speakTimestamp: this.form.speakTimestamp,
                videoDesc: this.form.videoDesc,
                videoTypeIdStr: this.category.join(','),
                benefitPeopleTimes: this.form.benefitPeopleTimes,
                playTimes: this.form.playTimes,
                tag: this.tab.join(','),
                enable: this.form.enable
            };
            /* 如果是添加视频，不需要videoId */
            if (!this.form.videoId) {
                delete cfg.videoId;
            }

            /* 校验 */
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formSubmit({
                        ...cfg,
                        isMessage: true,
                        successText: '成功',
                        onSuccess: res => {
                            /* 添加 */
                            this.getPageData({
                                act: 'getVideoList'
                            });
                            this.handleModalClose();
                        },
                        onError: res => {
                            this.$message({
                                type: 'warning',
                                message:
                                    code[res.data.code] + ' ，必填项不可空缺'
                            });
                        }
                    });
                } else {
                    return false;
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
            // 清空所有的值
            this.clearPhotoData();
            this.clearModalData();
        },

        handleUpdateSchoolId(cfg) {
            this.updateFormValue({
                type: 'schoolId',
                value: cfg ? cfg.schoolId : this.form.schoolId
            });
        },

        handleUpdateSpeakerId(cfg) {
            this.updateFormValue({
                type: 'speakerId',
                value: cfg ? cfg.speakerId : this.form.speakerId
            });
        },
        /* 设置cropperUrl */
        handleUpdateCropperUrl(obj) {
            this.updateFormValue({
                type: 'previewShortPathFilename',
                value: obj.shortPathFilename
            });
            this.update({
                previewShortPathFilename: obj.shortPathFilename
            });
        },
        /* 添加图片 */
        handleUploadVideo(file) {
            let formCfg = new FormData();
            formCfg.append('file', file.raw);

            this.commonUpload({
                formCfg,
                filepathname: this.filepathname,
                previewname: this.previewname,
                onSuccess: res => {}
            });
        },

        /* 上传中，禁用按钮 */
        handleUploading() {
            this.uploadState = true;
            this.$message('上传中');
        },

        /* 上传中，禁用按钮 */
        handleUploadEnd(videofilename) {
            this.uploadState = false;
            this.updateFormValue({
                type: 'videoOriginFilename',
                value: videofilename || this.form.videoOriginFilename
            });
            this.$message({ type: 'success', message: '上传成功' });
        },

        handleChangeRadio(val) {
            this.clearOption(val);
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
.video-dialog {
    .dialog-duration-min {
        width: 105px;
        position: absolute;
        .el-input.el-input-group {
            display: inline-table;
        }
        .el-input__inner {
            height: 36px;
        }
        .el-input-group__append {
            padding: 0 10px;
        }
    }
    .dialog-duration-sec {
        width: 90px;
        position: absolute;
        left: 120px;
        .el-input.el-input-group {
            display: inline-table;
        }
        .el-input__inner {
            height: 36px;
        }
        .el-input-group__append {
            padding: 0 10px;
        }
    }
}
</style>


