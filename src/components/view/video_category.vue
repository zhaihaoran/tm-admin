<template>
    <el-card>
        <div class="flex-end">
            <el-button @click="modal.add=true" class="tm-btn mb-20" >添加</el-button>
        </div>
        <Table :data="data" :loading="tableLoading" >
            <el-table-column
                type="index"
                align="center"
                width="40"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="分类名"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="videoQuantity"
                label="视频数量"
                >
            </el-table-column>
            <el-table-column
                align="center"
                prop="orderNum"
                label="排序"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="enable"
                label="启用"
                >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.enable"
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
                    <el-button @click="handleDelete(scope.row)" class="tm-btn-border" >删除</el-button>
                </template>
            </el-table-column>
        </Table>
        <!-- 修改分类 -->
        <el-dialog title="修改分类" :visible.sync="modal.edit" >
            <el-form label-width="80px" :model="submitForm" >
                <el-form-item label="分类名称" >
                    <el-input v-model="submitForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="submitForm.orderNum" ></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="submitForm.enable"
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
                    <el-input v-model="addForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="addForm.orderNum" ></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="addForm.enable"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.add = false">取 消</el-button>
                <el-button @click="handleAddVideoType" type="primary" >保存</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { formatAttr, dateformat, commonPageInit } from '@comp/lib/api_maps.js';
import Table from '@layout/table.vue';
export default {
    data() {
        return {
            loading: false,
            modal: {
                edit: false,
                add: false
            },
            addForm: {},
            submitForm: {}
        };
    },
    mounted() {
        commonPageInit(this, {
            act: 'getVideoTypeList'
        });
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            tableLoading: state => state.search.tableLoading
        })
    },
    components: {
        Table
    },
    methods: {
        ...mapMutations(['updateValue', 'getPageData', 'formSubmit']),
        handleEdit(data) {
            console.log(data);
            this.submitForm = Object.assign(this.submitForm, data);
            this.modal.edit = true;
        },
        handleDelete(obj) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.formSubmit({
                        act: 'removeVideoType',
                        videoTypeId: obj.videoTypeId,
                        successText: '删除成功'
                    });
                })
                .catch(() => {});
        },
        /* 添加分类 */
        handleAddVideoType() {
            this.formSubmit({
                act: 'addVideoType',
                name: this.submitForm.name,
                orderNum: this.submitForm.orderNum,
                enable: this.submitForm.enable,
                successText: '添加成功'
            });
        },
        /* 修改分类 */
        handleEditVideoType() {
            this.formSubmit({
                act: 'modifyVideoType',
                videoTypeId: this.submitForm.videoTypeId,
                name: this.submitForm.name,
                orderNum: this.submitForm.orderNum,
                enable: this.submitForm.enable,
                successText: '修改成功'
            });
        }
    }
};
</script>
<style lang="scss">

</style>


