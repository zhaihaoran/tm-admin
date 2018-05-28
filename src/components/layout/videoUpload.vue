<template>
<div>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :disabled="disabled"
        :limit="1"
        :list-type="liststyle"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :with-credentials="true"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :on-change="handlePicChange"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip upload-tip">上传文件格式为 mp4 文件，且不超过500MB</div>
    </el-upload>
    <el-progress class="v-progress" v-if="isUpload" :text-inside="true" :stroke-width="18" :percentage="progress"></el-progress>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            fileList: [],
            isUpload: false, // 是否显示进度条
            progress: 0 // 上传进度
        };
    },
    props: {
        action: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        liststyle: {
            type: String,
            default: ''
        },
        preview: {
            type: String,
            default: ''
        },
        previewname: {
            type: String,
            default: ''
        },
        filename: {
            type: String,
            default: ''
        },
        filepathname: {
            type: String,
            default: ''
        }
    },
    watch: {
        filename(val) {
            if (val) {
                this.fileList = [
                    {
                        name: val,
                        url: this.videoShortPathFilename
                    }
                ];
            } else {
                this.fileList = [];
            }
        }
    },
    computed: {
        ...mapState({
            videoShortPathFilename: state => state.upload.videoShortPathFilename
        })
    },
    methods: {
        ...mapMutations(['update', 'commonUpload']),
        // 限制上传类型
        beforeUpload(file) {
            const isMP4 = file.type === 'video/mp4';
            const isLt500M = file.size / 1024 / 1024 < 500;

            if (!isMP4) {
                this.$message({
                    message: '上传视频必须是MP4格式',
                    type: 'error'
                });
            }
            if (!isLt500M) {
                this.$message({
                    message: '上传视频大小不能超过 500MB',
                    type: 'error'
                });
            }
            return isMP4 && isLt500M;
        },

        handlePicChange(file, fileList) {
            let _this = this;
            if (this.beforeUpload(file.raw)) {
                /* 禁用按钮，并给提示 */
                this.$emit('uploading');
                let formCfg = new FormData();
                formCfg.append('file', file.raw);
                // 按300000 byte/s速度算上传时间，设置定时器
                let hasUpload = 0; // 已上传byte
                let speed = 300000;
                this.isUpload = true;

                let timer = setInterval(() => {
                    hasUpload += speed;
                    _this.progress =
                        ~~(hasUpload / file.raw.size * 100) > 100
                            ? 100
                            : ~~(hasUpload / file.raw.size * 100) > 100;
                }, 1000);

                // 上传
                this.commonUpload({
                    formCfg,
                    previewname: this.previewname,
                    filepathname: this.filepathname,
                    onSuccess: res => {
                        clearInterval(timer);
                        _this.progress = 100;
                        setTimeout(() => {
                            _this.isUpload = false;
                            this.$emit('end', res.data.data.originFilename);
                        }, 2000);
                    }
                });
            } else {
                this.fileList = [];
            }
        },

        progressTimer(speed) {},

        handleExceed(files, fileList) {
            this.$message.warning(`如需变更，请清除文件后再上传`);
        }
    }
};
</script>
<style scoped>
.el-upload__tip {
    line-height: 20px;
}
.v-progress {
    margin-top: 10px;
}
</style>


