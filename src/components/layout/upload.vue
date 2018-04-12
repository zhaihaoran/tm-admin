<template>
<div>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :disabled="disabled"
        list-type="picture-card"
        :with-credentials="true"
        :show-file-list="false"
        :auto-upload="false"
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
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
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
        handlePicChange(file, fileList) {
            let formCfg = new FormData();
            // 创建formData
            // 这里记住一定要是file的源文件，本身传过来的file是被element ui包了一层
            formCfg.append('file', file.raw);
            // append的值在控制台里是看不到的（formData原型），但是可以通过formCfg.get('file')来取

            // 上传
            this.commonUpload({
                formCfg,
                filepathname: this.filepathname,
                previewname: this.previewname
            });
        }
    }
};
</script>


