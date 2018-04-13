<template>
    <el-popover class="offer-step" :ref="ref" trigger="click">
        <el-steps direction="vertical" class="admin-step" :active="active">
            <el-step @click.native="handleSetStatus(1)" title="待开课通知"></el-step>
            <el-step @click.native="handleSetStatus(2)" title="待上课"></el-step>
            <el-step @click.native="handleSetStatus(100)" title="完成"></el-step>
        </el-steps>
    </el-popover>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        active: {
            type: Number,
            default: 0
        },
        ref: {
            type: String,
            default: 'schoolpopover'
        }
    },
    computed: {
        ...mapState({
            schoolProgress: state => state.progress.schoolProgress,
            speakerProgress: state => state.progress.speakerProgress
        })
    },
    methods: {
        ...mapMutations(['changeStatus']),
        /* 设置状态 */
        handleSetStatus() {
            this.changeStatus({
                act: 'modifyAppointmentProgressStatus',
                schoolStatus: this.schoolProgress,
                speakerStatus: this.speakerProgress,
                isMessage: true,
                successText: '邀约状态修改成功'
            });
        }
    }
};
</script>
<style lang="scss" scoped>

</style>


