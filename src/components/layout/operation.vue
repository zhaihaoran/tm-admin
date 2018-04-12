<template>
    <div class="cell" >
        <div v-if="scope.row.status == 1 && scope.row.fromSide == 2" >
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
            <el-button size="mini" class="tm-btn-border" @click="handledelete(scope.row)" >删除</el-button>
        </div>
        <div v-if="scope.row.status == 1 && scope.row.fromSide == 1" >
            <el-button size="mini" type="danger" class="tm-btn" @click="modal.agree=true" >通过</el-button>
            <el-button size="mini" class="tm-btn-border" @click="modal.refuse=true" >驳回</el-button>
        </div>

        <!-- modal -->
        <el-dialog
            :visible.sync="modal.agree"
            width="30%"
            >
            <h3 class="text-center modal-title" >你确定通过邀约？</h3>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.agree=false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleOk(scope.row)" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="modal.refuse"
            width="30%"
        >
            <h3 class="text-center modal-title" >确定驳回邀约吗？</h3>
            <span>请填写驳回原因，用于告知邀请者</span>
            <el-form ref="form" >
                <el-form-item class="no-margin" >
                    <el-input type="textarea" v-model="rejectDesc" class="tm-textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.refuse = false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleRefuse(scope.row)">确 定</el-button>
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
                delete: false,
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
        }
    },
    methods: {
        ...mapMutations(['deleteSubmit', 'Ok', 'refuse']),
        handleOk(obj) {
            this.modal.agree = false;
            this.Ok({
                act: this.action.Ok,
                [this.type]: this.scope.row[this.type]
            });
        },
        handleRefuse(obj) {
            this.modal.refuse = false;
            this.refuse({
                act: this.action.refuse,
                [this.type]: this.scope.row[this.type],
                rejectDesc: this.rejectDesc
            });
        },
        handledelete(obj) {
            this.$confirm('您确认要删除此次邀约, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteSubmit({
                        act: this.action.delete,
                        [this.type]: this.scope.row[this.type]
                    });
                })
                .catch(() => {});
        }
    }
};
</script>

