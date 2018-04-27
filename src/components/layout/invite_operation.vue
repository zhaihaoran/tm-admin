<template>
    <div class="cell" >
        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
        <el-button size="mini" class="tm-btn-border" @click="handledelete(scope.row)" >删除</el-button>
        <el-button v-if="+scope.row.status === 3" size="mini" type="primary" @click="modal.finish=true" >完成</el-button>
        <!-- 完成 提示 -->
        <el-dialog
            :visible.sync="modal.finish"
            width="400px"
        >
            <h3 class="text-center modal-title" >确定完成邀约吗？</h3>
            <span class="mb-20">完成邀约后，邀约将不在此列表中显示并且演讲者和学校双方的邀约将进入“已完成”列表</span>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.finish = false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleFinish(scope.row)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            rejectDesc: '',
            modal: {
                finish: false
            }
        };
    },
    props: ['scope', 'handleEdit'],
    methods: {
        ...mapMutations(['deleteSubmit', 'finishInvite']),
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

