<template>
    <el-dialog :title="title" :visible.sync="modal" :before-close="handleModalClose" >
        <el-form :model="form" ref="form" label-width="80px" class="modal-form" >
            <el-form-item label="视频文件">
                <el-upload
                    action="/admin/logout"
                    :limit="1"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="tip-info">视频文件最好小于100k</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="预览图片" >
                <Upload action="/admin/logout" :previewUrl="form.photoUrl" ></Upload>
                <div class="upload-image-box"></div>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title" ></el-input>
            </el-form-item>
            <el-form-item label="学校">
                <el-radio-group v-model="schoolRadio" size="small" >
                    <el-radio-button label="0">选择</el-radio-button>
                    <el-radio-button label="1">填写</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                    <i class="el-icon-question md-qs"></i>
                </el-tooltip>
                <el-input placeholder="请输入学校名称" class="mt-10" v-show="+schoolRadio ===1" v-model="form.schoolName" ></el-input>
                <SlRemote v-show="+schoolRadio ===0" placeholder="学校名称" v-on:id="handleUpdateSchoolId" :id="form.schoolId" action="getSchoolListForInput" >
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
            <el-form-item label="演讲者">
                <el-radio-group v-model="speakerRadio" size="small" >
                    <el-radio-button label="0">选择</el-radio-button>
                    <el-radio-button label="1">填写</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                    <i class="el-icon-question md-qs"></i>
                </el-tooltip>
                <el-input placeholder="请输入演讲者名称" class="mt-10" v-show="+speakerRadio === 1 " v-model="form.speakerName" ></el-input>
                <SlRemote v-show="+speakerRadio === 0 " placeholder="演讲者名称" v-on:id="handleUpdateSpeakerId" :id="form.speakerId" action="getSpeakerListForInput" >
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
                    v-model="form.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="视频详情">
                <el-input v-model="form.videoDetail" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="form.category" multiple placeholder="请选择">
                    <el-option
                    v-for="item in categoryTabs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="受益人次">
                <el-input v-model="form.manCounts" type="number"></el-input>
            </el-form-item>
            <el-form-item label="播放次数">
                <el-input v-model="form.playCounts" type="number" ></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                    v-model="form.tabs"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择">
                    <el-option
                    v-for="item in selfTabs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="启用">
                <el-switch
                    v-model="form.start"
                >
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="center dialog-footer">
            <el-button @click="modal = false">取 消</el-button>
            <el-button width="200px" type="primary" placeholder="请输入关键词查询" @click="submitVideo">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import Upload from '@layout/upload.vue';
import SlRemote from '@layout/slremote.vue';

import image from 'assets/image/logo/tsinghua.png';

export default {
    name: 'modal_video_add',
    data() {
        return {
            schoolRadio: 0,
            speakerRadio: 1,
            form: {},
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
            selfTabs: [
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'CSS',
                    label: 'CSS'
                },
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }
            ],
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
            fileList: []
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
    components: {
        Upload,
        SlRemote
    },
    methods: {
        ...mapMutations(['formSubmit']),
        submitVideo() {
            this.formSubmit({
                act: this.action,
                ...this.form
            });
        },
        handleModalClose() {
            // 通过$emit 实现子组件与父组件进行沟通
            this.$emit('modal');
        },

        handleUpdateSchoolId(cfg) {
            this.form.schoolId = cfg.schoolId;
        },

        handleUpdateSpeakerId(cfg) {
            this.form.speakerId = cfg.speakerId;
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
</style>


