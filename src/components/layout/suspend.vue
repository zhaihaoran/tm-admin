<template>
    <div>
        <div v-show="+scope.row.suspend>0" >
            <span>已冻结</span>
            <el-button size="mini" type="text" @click="showReason(scope.row.suspendDesc)" v-show="scope.row.suspend>0">查看原因</el-button>
            <el-button size="mini" v-show="scope.row.suspend>0" class="tm-btn-border" @click="handleUnsuspend(scope.row)" >解冻</el-button>
        </div>
        <el-button size="mini" v-show="+scope.row.suspend==0" type="primary" class="tm-btn" @click="modal.suspend = true" >冻结</el-button>
        <el-dialog
            :visible.sync="modal.suspend"
            width="30%"
        >
            <h3 class="text-center modal-title" >确定冻结吗？</h3>
            <span>请填写冻结原因</span>
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
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        },
        /* 解冻 */
        handleUnsuspend(obj) {
            this.formSubmit({
                act: 'unsuspendUser',
                userId: obj.schoolId || obj.speakerId,
                isMessage: true,
                successText: '冻结成功'
            });
        },
        /* 冻结 */
        handleSuspend(obj) {
            this.formSubmit({
                act: 'suspendUser',
                userId: obj.schoolId || obj.speakerId,
                suspendDesc: this.suspendDesc,
                isMessage: true,
                successText: '冻结成功'
            });
        }
    }
};
</script>


