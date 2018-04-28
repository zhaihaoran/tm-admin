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
        :on-change="handlePicChange"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip upload-tip">只能上传 mp4 /avi 文件，且不超过500MB</div>
    </el-upload>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            fileList: []
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
            default: 'picture-card'
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
            console.log(val);
            if (val) {
                this.fileList = [
                    {
                        name: val,
                        url: this.videoShortPathFilename
                    }
                ];
                console.log(this.fileList);
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
        handlePicChange(file, fileList) {
            /* 禁用按钮，并给提示 */
            this.$emit('uploading');
            let formCfg = new FormData();
            formCfg.append('file', file.raw);
            // 上传
            console.log(this.previewname);
            this.commonUpload({
                formCfg,
                previewname: this.previewname,
                filepathname: this.filepathname,
                onSuccess: res => {
                    this.$emit('end', res.data.data.originFilename);
                }
            });
        },
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
</style>


