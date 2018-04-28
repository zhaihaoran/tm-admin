<template>
    <el-card>
        <div class="flex-end">
            <el-button @click="modal.add=true" class="tm-btn mb-20" >添加</el-button>
        </div>
        <Table :data="data" :loading="tableLoading" >
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
                        disabled
                        active-value="1"
                        inactive-value="0"
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
        <el-dialog title="修改分类" width="400px" :visible.sync="modal.edit" >
            <el-form label-width="80px" :model="submitForm" >
                <el-form-item label="分类名称" >
                    <el-input v-model="submitForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="顺序号">
                    <el-input type="number" v-model="submitForm.orderNum" ></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="enable"
                        @change="handleChange"
                        active-value="1"
                        inactive-value="0"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.edit = false">取 消</el-button>
                <el-button @click="handleEditVideoType" type="primary" >保存</el-button>
            </span>
        </el-dialog>
        <!-- 新增分类 -->
        <el-dialog title="新增分类" width="400px" :visible.sync="modal.add" >
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
                        active-value="1"
                        inactive-value="0"
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
import { formatAttr, dateformat } from '@comp/lib/api_maps.js';
import Table from '@layout/table.vue';
export default {
    data() {
        return {
            enable: '0',
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
        this.getVideoTypeData({
            act: 'getVideoTypeList',
            onSuccess: res => {
                this.sortData('orderNum');
            }
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
        ...mapMutations([
            'getVideoTypeData',
            'sortData',
            'updateRow',
            'addRow',
            'deleteRow',
            'formSubmit'
        ]),
        handleEdit(data) {
            this.submitForm = Object.assign(this.submitForm, data);
            this.enable = this.submitForm.enable;
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
                        successText: '删除成功',
                        onSuccess: res => {
                            this.deleteRow({
                                type: 'videoTypeId',
                                value: obj.videoTypeId
                            });
                        }
                    });
                })
                .catch(() => {});
        },
        /* 添加分类 */
        handleAddVideoType() {
            this.formSubmit({
                act: 'addVideoType',
                name: this.addForm.name,
                orderNum: this.addForm.orderNum,
                enable: this.addForm.enable,
                successText: '添加成功',
                onSuccess: res => {
                    this.getVideoTypeData({
                        act: 'getVideoTypeList'
                    });
                    this.modal.add = false;
                }
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
                successText: '修改成功',
                onSuccess: res => {
                    this.updateRow({
                        type: 'videoTypeId',
                        value: this.submitForm.videoTypeId,
                        name: this.submitForm.name,
                        orderNum: this.submitForm.orderNum,
                        enable: this.submitForm.enable
                    });
                    this.modal.edit = false;
                }
            });
        },
        /* change */
        handleChange(val) {
            this.submitForm.enable = val;
        }
    }
};
</script>
<style lang="scss">

</style>


