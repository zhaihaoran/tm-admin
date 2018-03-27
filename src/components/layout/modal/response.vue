<template>
    <el-dialog :visible.sync="modal" :before-close="handleModalClose" :title="title">
        <div class="photos">
            <el-row :gutter="10" >
                <el-col class="img-box" :span="8" v-for="photo in photos" :key="photo.$index" >
                    <img :src="photo.photoUrl" class="img-fluid" alt="">
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="tm-modal-footer res-footer">
            <el-button class="tm-btn" type="primary" @click="handleModalClose">关闭</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: {
        modal: {
            type: Boolean,
            default: false
        },
        photos: {
            type: Array
        },
        title: {
            type: String,
            default: '查看反馈'
        }
    },
    methods: {
        handleModalClose() {
            // 通过$emit 实现子组件与父组件进行沟通
            this.$emit('modal');
        }
    }
};
</script>
<style lang="scss" scoped>
.photos {
    max-height: 700px;
    overflow-y: auto;
    overflow-x: hidden;
}
.img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
}
.res-footer {
    margin-top: 20px;
}
</style>


