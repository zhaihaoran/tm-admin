<template>
    <div class="cell" >
        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
        <el-button size="mini" class="tm-btn-border" @click="handledelete(scope.row)" >删除</el-button>
        <el-button v-if="+scope.row.status === 3" size="mini" type="primary" @click="handleFinish(scope.row)" >完成</el-button>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            rejectDesc: ''
        };
    },
    props: ['scope', 'handleEdit'],
    methods: {
        ...mapMutations(['deleteSubmit', 'finishInvite']),
        handledelete(obj) {
            this.$confirm('您确认要删除此次邀约, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteSubmit({
                        act: 'removeAppointment',
                        appointmentId: obj.appointmentId
                    });
                })
                .catch(() => {});
        },
        handleFinish(obj) {
            this.finishInvite({
                act: 'finishAppointment',
                appointmentId: obj.appointmentId
            });
        }
    }
};
</script>

