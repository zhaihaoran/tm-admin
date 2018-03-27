<template>
    <el-dialog
        :visible.sync="modal"
        :before-close="handleModalClose"
        width="30%"
        center
    >
        <div class="title">
            <h3>你确定拒绝邀约吗?</h3>
            <p>请填写拒绝原因，用于告知邀请者</p>
            <el-input type="textarea" class="tm-textarea" ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">提 交</el-button>
            <el-button @click="handleModalClose">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: {
        modal: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleModalClose() {
            // 通过$emit 实现子组件与父组件进行沟通
            this.$emit('modal');
        },
        submitForm() {
            console.log('object');
        }
    }
};
</script>
<style lang="scss">
.el-dialog--center .el-dialog__body {
    padding-top: 0;
    h3 {
        text-align: center;
    }
}
</style>

