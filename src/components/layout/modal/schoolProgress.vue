<template>
    <div>
        <el-button type="text" v-popover:schoolpopover >
            {{attrs['schoolStatus'][scope.row.schoolStatus]}}
        </el-button>
        <el-popover class="offer-step" ref="schoolpopover">
            <el-steps direction="vertical" class="admin-step" :active="+scope.row.schoolStatus">
                <el-step @click.native="handleSetStatus(1)" title="待开课通知"></el-step>
                <el-step @click.native="handleSetStatus(2)" title="待上课"></el-step>
                <el-step @click.native="handleSetStatus(3)" title="待课后反馈提交"></el-step>
                <el-step @click.native="handleSetStatus(4)" title="待课后反馈确认"></el-step>
                <el-step @click.native="handleSetStatus(100)" title="完成"></el-step>
            </el-steps>
        </el-popover>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { attrs } from '@comp/lib/api_maps.js';

export default {
    data() {
        return {
            attrs
        };
    },
    props: {
        scope: {
            type: Object
        }
    },
    computed: {
        ...mapState({
            schoolProgress: state => state.progress.schoolProgress,
            speakerProgress: state => state.progress.speakerProgress
        })
    },
    methods: {
        ...mapMutations(['changeStatus', 'updatelist']),
        /* 设置状态 */
        handleSetStatus(value) {
            this.changeStatus({
                act: 'modifyAppointmentProgressStatus',
                appointmentId: this.scope.row.appointmentId,
                schoolStatus: value,
                speakerStatus: this.scope.row.speakerStatus,
                isMessage: true,
                successText: '邀约状态修改成功',
                onSuccess: res => {
                    let newRow = Object.assign(this.scope.row, {
                        schoolStatus: value
                    });
                    this.updatelist(newRow);
                }
            });
        },

        handleShowImage(row) {
            this.$emit('feed', row);
        }
    }
};
</script>
<style lang="scss" scoped>

</style>


