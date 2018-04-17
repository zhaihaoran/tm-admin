<template>
<div>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :disabled="disabled"
        :list-type="liststyle"
        :with-credentials="true"
        :auto-upload="false"
        :on-change="handlePicChange"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip upload-tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
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
        }
    },
    methods: {
        ...mapMutations(['update', 'commonUpload']),
        handlePicChange(file, fileList) {
            let formCfg = new FormData();
            formCfg.append('file', file.raw);
            // 上传
            this.commonUpload({
                formCfg,
                previewname: this.previewname
            });
        }
    }
};
</script>


