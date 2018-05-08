<template>
<div>
    <el-upload
        :class="classes"
        :action="action"
        :disabled="disabled"
        list-type="picture-card"
        :with-credentials="true"
        :show-file-list="false"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :on-change="handlePicChange"
        >
        <img v-if="preview" :src="preview" class="img-fluid avatar">
        <i v-else class="el-icon-plus"></i>
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
        classes: {
            type: String,
            default: 'avatar-uploader'
        },
        preview: {
            type: String,
            default: ''
        },
        filepathname: {
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
        // 限制上传类型
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message({
                    message: '上传图片必须是JPG/PNG 格式!',
                    type: 'error'
                });
            }
            if (!isLt2M) {
                this.$message({
                    message: '上传图片大小不能超过 2MB!',
                    type: 'error'
                });
            }
            return (isJPG || isPNG) && isLt2M;
        },
        handlePicChange(file, fileList) {
            if (this.beforeUpload(file.raw)) {
                let formCfg = new FormData();
                formCfg.append('file', file.raw);
                this.commonUpload({
                    formCfg,
                    filepathname: this.filepathname,
                    previewname: this.previewname
                });
            }
        }
    }
};
</script>


