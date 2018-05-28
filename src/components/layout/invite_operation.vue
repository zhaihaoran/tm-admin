<template>
    <div class="cell" >
        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
        <el-button size="mini" class="tm-btn-border" @click="handledelete(scope.row)" >删除</el-button>
        <!--  -->
        <el-button v-if="+scope.row.schoolStatus === 100 && +scope.row.speakerStatus === 100" size="mini" type="primary" @click="handleEmit" >完成</el-button>
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
        ...mapMutations(['deleteSubmit']),
        handleEmit() {
            this.$emit('done', this.scope.row);
        },
        handledelete(obj) {
            this.$confirm('确认要删除此次邀约?', '提示', {
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
        }
    }
};
</script>

