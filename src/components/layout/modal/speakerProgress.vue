<template>
    <div>
        <el-button type="text" v-popover:speakerpopover >
            {{attrs['speakerStatus'][scope.row.speakerStatus]}}
        </el-button>
        <el-popover class="offer-step" ref="speakerpopover">
            <el-steps direction="vertical" class="admin-step" :active="+scope.row.speakerStatus">
               <el-step @click.native="handleSetStatus(1)" title="待开课通知"></el-step>
                <el-step @click.native="handleSetStatus(2)" title="待上课"></el-step>
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
    methods: {
        ...mapMutations(['changeStatus']),
        /* 设置状态 */
        handleSetStatus(value) {
            this.changeStatus({
                act: 'modifyAppointmentProgressStatus',
                schoolStatus: +this.scope.row.schoolStatus,
                speakerStatus: +this.scope.row.speakerStatus,
                isMessage: true,
                successText: '邀约状态修改成功'
            });
        }
    }
};
</script>
<style lang="scss" scoped>

</style>


