<template>
    <div>
        <div class="tm-card">
            <el-form class="sr-wrapper" label-width="40px" :model="searchForm" >
                <div class="sr-item">
                    <el-form-item label-width="0" >
                        <el-input v-model="searchForm.title" placeholder="标题" ></el-input>
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
                        <el-input v-model="searchForm.school" placeholder="学校" ></el-input>
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
                        <el-input v-model="searchForm.speaker" placeholder="演讲者" ></el-input>
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
                <el-button type="primary" @click="searchFormSubmit" class="sr-search-btn" >检索</el-button>
            </el-form>
            <div class="sr-radio" >
                <el-radio-group v-model="searchForm.category" class="radio-group" >
                    <el-radio-button label="1">综合排序</el-radio-button>
                    <el-radio-button label="2">演讲时间</el-radio-button>
                    <el-radio-button label="3">上传时间</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="tm-card">
            <div class="flex-end mb-20">
                <el-button type="primary" @click="modal.addVideo = true" >添加</el-button>
            </div>
            <Table v-loading="loading" :isPagination="false" :data="list" >
                <el-table-column prop="previewUrl" label="预览图" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.previewUrl" class="img-fluid" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="school" label="学校" align="center"></el-table-column>
                <el-table-column prop="speakerName" label="演讲者" align="center"></el-table-column>
                <el-table-column prop="startTime" label="演讲时间" align="center"></el-table-column>
                <el-table-column prop="addTimeStamp" label="上传时间" align="center"></el-table-column>
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
                        <el-button type="primary" >冻结</el-button>
                        <el-button @click="handleUpdate(scope.row)" type="text" >查看/修改</el-button>
                        <el-button class="tm-btn-border" type="primary" >删除</el-button>
                    </template>
                </el-table-column>
            </Table>

            <!-- 添加视频 -->
            <VideoDialog v-on:modal="handleClose('addVideo')" title="添加视频" :modal="modal.addVideo" ></VideoDialog>
            <!-- 修改视频 -->
            <VideoDialog :data="formData" v-on:modal="handleClose('editVideo')" title="修改信息" :modal="modal.editVideo" ></VideoDialog>
        </div>
    </div>
</template>
<script>
import Table from '@layout/table.vue';
import VideoDialog from '@layout/modal/VideoDialog.vue';
import { formatAttr } from '@comp/lib/api_maps.js';

import image from '../../assets/image/logo/tsinghua.png';
export default {
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
            loading: false,
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
                category: 1,
                speaker: '',
                school: '',
                title: '',
                value: ''
            },
            modal: {
                editVideo: false,
                addVideo: false
            },
            list: [
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    category: 1,
                    intro: '首页第一推荐位',
                    isStart: true
                },
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    category: 1,
                    intro: '首页第一推荐位',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: true
                }
            ]
        };
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
        searchFormSubmit() {
            console.log('提交表单');
        }
    },
    components: {
        Table,
        VideoDialog
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

