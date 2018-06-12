<template>
    <div class="cell" >
        <!--
            todo:  把modal抽离出来，防止渲染多次
         -->
        <div>
            <el-button v-show="+scope.row.authStatus !== 3" size="mini" type="danger" class="tm-btn" @click="modal.agree=true" >通过</el-button>
            <el-button size="mini" class="tm-btn-border" @click="modal.refuse=true" >驳回</el-button>
        </div>
        <!-- modal -->
        <el-dialog
            :visible.sync="modal.agree"
            width="500px"
            class="agree-modal"
            >
            <h3 class="text-center modal-title" >确定通过审核吗？</h3>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.agree=false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleOk(scope.row)" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="modal.refuse"
            width="500px"
        >
            <h3 class="text-center modal-title" >确定驳回申请吗？</h3>
            <span class="mb-20">请填写驳回原因</span>
            <el-form ref="form" >
                <el-form-item class="no-margin" >
                    <el-input type="textarea" v-model="rejectDesc" class="tm-textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.refuse = false">取 消</el-button>
                <el-button class="tm-btn" :disabled="rejectDesc.length == 0" type="primary" @click="handleRefuse(scope.row)">确 定</el-button>
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
                agree: false,
                refuse: false
            },
            rejectDesc: ''
        };
    },
    props: {
        scope: {
            type: Object
        },
        handleEdit: {
            type: Function
        },
        action: {
            type: Object
        },
        type: {
            type: String
        },
        isHidden: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapMutations(['Ok', 'refuse', 'updatelist', 'deleteRow']),
        handleOk(obj) {
            this.modal.agree = false;
            const type = this.type;
            this.Ok({
                act: this.action.ok,
                [type]: this.scope.row[type],
                onSuccess: res => {
                    if (this.isHidden) {
                        this.deleteRow({
                            type: type,
                            value: this.scope.row[type]
                        });
                    } else {
                        this.updatelist(
                            Object.assign(this.scope.row, {
                                authStatus: 3
                            })
                        );
                    }
                }
            });
        },
        handleRefuse(obj) {
            this.modal.refuse = false;
            const type = this.type;
            this.refuse({
                act: this.action.refuse,
                [type]: this.scope.row[type],
                rejectDesc: this.rejectDesc,
                onSuccess: res => {
                    if (this.isHidden) {
                        this.deleteRow({
                            type: type,
                            value: this.scope.row[type]
                        });
                    } else {
                        this.updatelist(
                            Object.assign(this.scope.row, {
                                authStatus: 4
                            })
                        );
                    }
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.agree-modal .el-dialog__body {
    padding: 10px;
}
</style>


