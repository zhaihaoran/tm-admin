<template>
    <div class="cell" >
        <el-button size="mini" type="danger" class="tm-btn" @click="modal.agree=true" >通过</el-button>
        <el-button size="mini" class="tm-btn-border" @click="modal.refuse=true" >驳回</el-button>
        <!-- modal -->
        <el-dialog
            :visible.sync="modal.agree"
            width="30%"
            >
            <h3 class="text-center modal-title" >你确定同意邀约吗？</h3>
            <span>同意邀约后，邀约信息将进入"进入中"列表，途梦平台工作人员将会联系您和演讲者处理进一步事宜</span>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.agree=false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleOk(scope.$index,scope.row)" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="modal.refuse"
            width="30%"
        >
            <h3 class="text-center modal-title" >确定拒绝邀约吗？</h3>
            <span>请填写拒绝原因，用于告知邀请者</span>
            <el-form ref="form" >
                <el-form-item class="no-margin" >
                    <el-input type="textarea" class="tm-textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.refuse = false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleRefuse()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modal: {
                agree: false,
                delete: false,
                refuse: false
            }
        };
    },
    props: ['scope', 'handleEdit'],
    methods: {
        handleOk() {
            this.modal.agree = false;
        },
        handleRefuse() {
            this.modal.delete = false;
        },
        handledelete() {
            this.$confirm('您确认要删除此次邀约, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {});
        }
    }
};
</script>

