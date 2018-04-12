<template>
    <div>
        <div class="tm-card">
            <el-form class="sr-wrapper" label-width="40px" :model="searchForm" >
                <div class="sr-item">
                    <el-form-item label-width="0" >
                        <el-input v-model="searchForm.speakTitle" placeholder="标题" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" >
                        <el-select v-model="searchForm.value" placeholder="全部分类" >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="sr-item">
                    <el-form-item label-width="0" >
                        <el-input v-model="searchForm.schoolName" placeholder="学校" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" >
                        <el-select v-model="searchForm.value" placeholder="全部分类" >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="sr-item">
                    <el-form-item label-width="0" >
                        <el-input v-model="searchForm.speakerName" placeholder="演讲者" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" >
                        <el-select v-model="searchForm.value" placeholder="全部分类" >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-button type="primary" @click="handleSearch" class="sr-search-btn" >检索</el-button>
            </el-form>
            <div class="sr-radio" >
                <el-radio-group @change="handleSearch" v-model="searchForm.orderType" class="radio-group" >
                    <el-radio-button label="0">综合排序</el-radio-button>
                    <el-radio-button label="1">最近演讲</el-radio-button>
                    <el-radio-button label="2">最近上传</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="tm-card">
            <div class="flex-end mb-20">
                <el-button type="primary" @click="modal.addVideo = true" >添加</el-button>
            </div>
            <Table v-loading="tableLoading" :data="data" >
                <el-table-column prop="previewUrl" label="预览图" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.previewUrl" class="img-fluid" :alt="scope.row.title">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="schoolName" label="学校" align="center"></el-table-column>
                <el-table-column prop="speakerName" label="演讲者" align="center"></el-table-column>
                <el-table-column prop="speakTimestamp" label="演讲时间" align="center">

                </el-table-column>
                <el-table-column prop="addTimeStamp" width="140px" label="上传时间" align="center"></el-table-column>
                <el-table-column prop="category" label="分类" align="center"></el-table-column>
                <el-table-column prop="intro" label="推荐位" align="center"></el-table-column>
                <el-table-column prop="intro" label="启用" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isStart"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template class="cubes" slot-scope="scope">
                        <el-button type="primary" @click="handleSuspendUser" >冻结</el-button>
                        <el-button @click="handleUpdate(scope.row)" type="text" >查看/修改</el-button>
                        <el-button @click="handleDelete(scope.row)" class="tm-btn-border" type="primary" >删除</el-button>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>

            <!-- 添加视频 -->
            <VideoDialog v-on:modal="handleClose('addVideo')" title="添加视频" :modal="modal.addVideo" ></VideoDialog>
            <!-- 修改视频 -->
            <VideoDialog :data="formData" v-on:modal="handleClose('editVideo')" title="修改信息" :modal="modal.editVideo" ></VideoDialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import Table from '@layout/table.vue';
import Pagination from '@layout/pagination.vue';
import VideoDialog from '@layout/modal/VideoDialog.vue';

import image from '../../assets/image/logo/tsinghua.png';

export default {
    name: 'video_manage',
    data() {
        return {
            formData: {
                title: 'as',
                photoUrl:
                    'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                manCounts: 1,
                playCounts: 1,
                schoolRadio: '选择',
                schoolId: '',
                speakerRadio: '填写',
                speakerId: '',
                tabs: [],
                category: [],
                start: false
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            searchForm: {
                act: 'getVideoList',
                orderType: 0,
                speakTitle: '',
                schoolName: '',
                speakerName: '',
                videoTypeId: '', //视频类型id
                speakerName: '',
                enable: 0,
                recommend: 0
            },
            modal: {
                editVideo: false,
                addVideo: false
            }
        };
    },
    components: {
        Table,
        VideoDialog,
        Pagination
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage,
            status: state => state.search.status
        }),
        orderType: {
            set(value) {
                this.updateValue({
                    orderType: value
                });
            },
            get() {
                return this.$store.state.search.orderType;
            }
        }
    },
    mounted() {
        commonPageInit(this, {
            act: 'getVideoList'
        });
    },
    methods: {
        formatAttr,
        handleUpdate(data) {
            const id = data.id;
            this.modal.editVideo = true;
        },
        handleClose(modalName) {
            this.modal[modalName] = false;
        },
        /* 查询 */
        handleSearch() {
            this.getPageData(this.searchForm);
        },
        /* 删除 */
        handleDelete(obj) {
            this.$confirm('您确认要删除视频吗？, 是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteSubmit({
                        act: 'removeVideo',
                        videoId: obj.videoId
                    });
                })
                .catch(() => {});
        },
        // ????? 到底冻结学校还是演讲者
        /* 冻结 */
        handleSuspendUser(obj) {
            this.refuse({
                act: 'suspendUser',
                userId: obj.appointmentId,
                suspendDesc: this.suspendDesc
            });
        }
    }
};
</script>
<style lang="scss">
.sr-wrapper {
    display: flex;
    position: relative;
    .sr-item {
        width: 200px;
        padding: 0 8px;
        .el-form-item {
            margin-bottom: 15px;
        }
    }
    .sr-search-btn {
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>

