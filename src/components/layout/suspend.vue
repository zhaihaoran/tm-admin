<template>
    <div>
        <div v-if="scope.row.suspend && +scope.row.suspend > 0" >
            <span>已冻结</span>
            <el-button size="mini" class="no-ml" type="text" @click="showReason(scope.row.suspendDesc)" >查看原因</el-button>
            <el-button size="mini" class="tm-btn-border no-ml" @click="handleUnsuspend(scope.row)" >解冻</el-button>
        </div>
        <el-button size="mini" v-else type="primary" class="tm-btn" @click="modal.suspend = true" >冻结</el-button>
        <el-dialog
            :visible.sync="modal.suspend"
            width="30%"
        >
            <h3 class="text-center modal-title" >确定冻结账号吗？</h3>
            <span class="mb-20" >请填写冻结原因</span>
            <el-form ref="form" >
                <el-form-item class="no-margin" >
                    <el-input type="textarea" v-model="suspendDesc" class="tm-textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.suspend = false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleSuspend(scope.row)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            modal: {
                suspend: false
            },
            suspendDesc: ''
        };
    },
    props: {
        scope: {
            type: Object
        }
    },
    methods: {
        ...mapMutations(['formSubmit', 'updateRow']),
        showReason(reason) {
            this.$alert(reason, '冻结原因').catch(() => {});
        },
        /* 解冻 */
        handleUnsuspend(obj) {
            this.$confirm('确认解冻', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.formSubmit({
                        act: 'resumeUser',
                        userId: obj.schoolId || obj.speakerId,
                        isMessage: true,
                        successText: '解冻成功',
                        onSuccess: res => {
                            this.modal.suspend = false;
                            this.updateRow({
                                type: 'addTimestamp',
                                value: obj.addTimestamp,
                                suspend: 0
                            });
                        }
                    });
                })
                .catch(() => {});
        },
        /* 冻结 */
        handleSuspend(obj) {
            this.formSubmit({
                act: 'suspendUser',
                userId: obj.schoolId || obj.speakerId,
                suspendDesc: this.suspendDesc,
                isMessage: true,
                successText: '冻结成功',
                onSuccess: res => {
                    this.modal.suspend = false;
                    this.updateRow({
                        type: 'addTimestamp',
                        value: obj.addTimestamp,
                        suspend: 1,
                        suspendDesc: this.suspendDesc
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss">
.no-ml {
    margin-left: 0 !important;
}
</style>



