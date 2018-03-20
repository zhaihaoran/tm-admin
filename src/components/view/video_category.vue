<template>
    <el-card>
        <div class="flex-end">
            <el-button @click="modal.add=true" class="tm-btn mb-20" >添加</el-button>
        </div>
        <el-table :data="list" border >
            <el-table-column
                align="center"
                prop="category"
                label="分类名"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="videoCounts"
                label="视频数量"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="index"
                label="顺序号"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="isStart"
                label="启用"
                >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isStart"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" >修改</el-button>
                    <el-button @click="handleDelete" class="tm-btn-border" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 修改分类 -->
        <el-dialog title="修改分类" :visible.sync="modal.edit" >
            <el-form label-width="80px" :model="submitForm" >
                <el-form-item label="分类名称" >
                    <el-input v-model="submitForm.category" ></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="submitForm.index" ></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="submitForm.isStart"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.edit = false">取 消</el-button>
                <el-button @click="modal.edit = false" type="primary" >保存</el-button>
            </span>
        </el-dialog>
        <!-- 新增分类 -->
        <el-dialog title="新增分类" :visible.sync="modal.add" >
            <el-form label-width="80px" :model="addForm" >
                <el-form-item label="分类名称" >
                    <el-input v-model="addForm.category" ></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="addForm.index" ></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="addForm.isStart"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.add = false">取 消</el-button>
                <el-button @click="modal.add = false" type="primary" >保存</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            modal: {
                edit: false,
                add: false
            },
            addForm: {
                isStart: true,
                category: 'zhaihaoran',
                index: 11
            },
            submitForm: {
                id: 0,
                isStart: true,
                category: 'zhaihaoran',
                index: 11
            },
            list: [
                {
                    id: 1,
                    category: 2,
                    videoCounts: 100,
                    index: 1,
                    isStart: false
                },
                {
                    id: 2,
                    category: 3,
                    videoCounts: 100,
                    index: 1,
                    isStart: true
                }
            ]
        };
    },
    methods: {
        handleEdit(data) {
            console.log(data);
            this.submitForm = Object.assign(data);
            this.modal.edit = true;
        },
        handleDelete() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
<style lang="scss">

</style>


