<template>
    <el-upload
        class="avatar-uploader"
        :action="action"
        list-type="picture-card"
        :show-file-list="false"
        :on-change="handlePicChange"
        >
        <img v-if="imageUrl" :src="imageUrl" class="img-fluid avatar">
        <i v-else class="el-icon-plus"></i>
    </el-upload>
</template>
<script>
export default {
    data() {
        return {
            // 用props初始化
            imageUrl: this.previewUrl
        };
    },
    // 验证
    props: {
        action: {
            type: String,
            required: true
        },
        previewUrl: {
            type: String,
            default: ''
        }
    },
    methods: {
        handlePicChange(file) {
            // 渲染图片
            this.imageUrl = file.url;
        }
    }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload--picture-card {
    width: 380px;
    height: 250px;
    line-height: 250px;
    overflow: hidden;
}
</style>


