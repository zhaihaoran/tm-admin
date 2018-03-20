<template>
    <div>
        <el-card class="mb-20" >
            <div slot="header" class="clearfix">
                <span>职业规划</span>
                <el-button @click="submitForm()" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="handleAddVideo(1)" type="primary" >选择视频</el-button>
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <VideoCard :video="video" ></VideoCard>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mb-20" >
            <div slot="header" class="clearfix">
                <span>兴趣爱好</span>
                 <el-button @click="submitForm()" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="modal.selectVideo = true" type="primary" >选择视频</el-button>
            <el-button class="mb-20" @click="handleAddVideo(2)"  >新增视频</el-button>
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <VideoCard :video="video" ></VideoCard>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mb-20" >
            <div slot="header" class="clearfix">
                <span>专业学习</span>
                 <el-button @click="submitForm()" class="card-header-save" >保存</el-button>
            </div>
            <el-button class="mb-20" @click="handleAddVideo(3)" type="primary" >选择视频</el-button>
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.id" >
                    <VideoCard :video="video" ></VideoCard>
                </el-col>
            </el-row>
        </el-card>
        <!-- 视频添加播放弹窗 -->
        <el-dialog title="新增视频" :visible.sync="modal.addVideo" :before-close="handleModalClose" >
            <el-form :model="addForm" :rules="addForm.rules" ref="addForm" label-width="100px" class="modal-form" >
                <el-form-item label="视频文件">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">视频文件最好小于100k</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="预览图片" >
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">视频文件最好小于100k</div>
                    </el-upload>
                    <div class="upload-image-box"></div>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="addForm.title" ></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-radio-group v-model="addForm.schoolRadio" size="small" >
                        <el-radio-button label="选择"></el-radio-button>
                        <el-radio-button label="填写"></el-radio-button>
                    </el-radio-group>
                    <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                        <i class="el-icon-question md-qs"></i>
                    </el-tooltip>
                    <el-input placeholder="请输入学校名称" class="mt-10" v-show="addForm.schoolRadio === '填写' " v-model="addForm.schoolName" ></el-input>
                    <el-select
                        class="modal_select mt-10"
                        v-model="addForm.schoolId"
                        v-show="addForm.schoolRadio === '选择' "
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                        placeholder="请选择">
                        <el-option
                            class="sl_option"
                            v-for="item in list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            <!-- value 控制选择色 -->
                            <div class="sl_image">
                                <img :src="item.url" class="img-fluid" alt="">
                            </div>
                            <div class="sl_body">
                                <h4 class="sl_title">{{item.label}}</h4>
                                <h5 class="sl_info">{{item.info}}</h5>
                                <p class="sl_p">{{item.context}}</p>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="演讲者">
                    <el-radio-group v-model="addForm.speakerRadio" size="small" >
                        <el-radio-button label="选择"></el-radio-button>
                        <el-radio-button label="填写"></el-radio-button>
                    </el-radio-group>
                    <el-tooltip class="item" effect="dark" content="没有数据？请手动填写，手动填写的学校无法查看主页，无法对其发起邀约" placement="right">
                        <i class="el-icon-question md-qs"></i>
                    </el-tooltip>
                    <el-input placeholder="请输入演讲者名称" class="mt-10" v-show="addForm.speakerRadio === '填写' " v-model="addForm.speakerName" ></el-input>
                    <el-select
                        class="modal_select mt-10"
                        v-model="addForm.speakerId"
                        v-show="addForm.speakerRadio === '选择' "
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                        placeholder="请选择">
                        <el-option
                            class="sl_option"
                            v-for="item in list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            <!-- value 控制选择色 -->
                            <div class="sl_image">
                                <img :src="item.url" class="img-fluid" alt="">
                            </div>
                            <div class="sl_body">
                                <h4 class="sl_title">{{item.label}}</h4>
                                <h5 class="sl_info">{{item.info}}</h5>
                                <p class="sl_p">{{item.context}}</p>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="演讲时间">
                    <el-date-picker
                        v-model="addForm.startTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="视频详情">
                    <el-input v-model="addForm.videoDetail" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="addForm.category" multiple placeholder="请选择">
                        <el-option
                        v-for="item in categoryTabs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="受益人次">
                    <el-input v-model="addForm.manCounts" type="number"></el-input>
                </el-form-item>
                <el-form-item label="播放次数">
                    <el-input v-model="addForm.playCounts" type="number" ></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select
                        v-model="addForm.tabs"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择">
                        <el-option
                        v-for="item in selfTabs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch
                        v-model="addForm.start"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.addVideo = false">取 消</el-button>
                <el-button type="primary" @click="modal.addVideo = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 选择视频 -->
        <el-dialog title="选择视频" :visible.sync="modal.selectVideo" width="80%" >
            <el-input suffix-icon="el-icon-search" class="mb-20" ></el-input>
            <el-table :data="slVideoList" border class="tm-table" >
                <el-table-column
                    align="center"
                    label="预览图"
                    >
                    <template slot-scope="scope">
                        <img :src="scope.row.previewUrl" class="img-fluid" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="title"
                    label="标题"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="school"
                    label="学校"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakerName"
                    label="演讲者"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="startTime"
                    label="演讲时间"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addTimeStamp"
                    label="上传时间"
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
                        <el-button type="primary" >选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                :current-page.sync="currentPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="200"
                class="flex-end"
            >
            </el-pagination>
            <div class="individar"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.selectVideo = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import VideoCard from '@layout/videoCard.vue';
import image from '../../assets/image/logo/tsinghua.png';
export default {
    data() {
        return {
            pickerOptions1: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
            loading: false,
            schools: [
                {
                    value: '1',
                    url: image,
                    label: '清华大学',
                    info: '简称清华，全国重点大学',
                    context:
                        'hahahahahahahahahahahahaahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha'
                },
                {
                    value: '2',
                    url: image,
                    label: '湖南大学',
                    info: '简称清华，全国重点大学',
                    context:
                        'hahahahahahaahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha'
                },
                {
                    value: '3',
                    url: image,
                    label: '北京大学',
                    info: '简称清华，全国重点大学',
                    context: 'hahahahahahahahahahahahahahaha'
                }
            ],
            currentPage: 1,
            list: [],
            categoryTabs: [
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
            selfTabs: [
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'CSS',
                    label: 'CSS'
                },
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }
            ],
            modal: {
                addVideo: false,
                selectVideo: false
            },
            slVideoList: [
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: true
                },
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: false
                },
                {
                    title: 'zhaihaoran',
                    previewUrl: image,
                    school: '石家庄实验小学',
                    speakerName: '张小山',
                    startTime: 123123,
                    addTimeStamp: 123123,
                    isStart: true
                }
            ],
            videos: [
                {
                    id: '1',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: '成为更好的自己',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 1
                },
                {
                    id: '2',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha1',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                },
                {
                    id: '3',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha2',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                },
                {
                    id: '4',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha3',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                },
                {
                    id: '5',
                    time: '12:58',
                    img: '/static/image/card.png',
                    title: 'haha4',
                    author: '周程程',
                    count: 9999,
                    startTime: '2017-12-30',
                    school: '华中师范大学附属中学',
                    personalPageRecommend: 0
                }
            ],
            addForm: {
                title: '',
                manCounts: 1,
                playCounts: 1,
                schoolRadio: '选择',
                schoolId: '',
                speakerRadio: '填写',
                speakerId: '',
                tabs: [],
                category: [],
                start: false,
                rules: {}
            },
            fileList: []
        };
    },
    components: {
        VideoCard
    },

    methods: {
        handlePreview(file) {
            console.log(file);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleAddVideo() {
            this.modal.addVideo = true;
        },
        // 清空表单？
        handleModalClose() {
            this.modal.addVideo = false;
            console.log('haha');
        },
        // 远程select
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.list = this.schools.filter(item => {
                        return (
                            item.label
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    });
                }, 200);
            } else {
                this.list = [];
            }
        }
    }
};
</script>
<style lang="scss">
.md-qs {
    margin-left: 10px;
    font-size: 20px;
    position: relative;
    top: 5px;
}

.modal_select {
    width: 100%;
}

.sl_option {
    display: flex;
    height: 110px;
    width: 600px;
    padding: 0;
    .sl_image {
        max-width: 80px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .sl_body {
        flex: 1;
        max-width: 475px;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        .sl_title {
            line-height: 26px;
            margin: 0;
        }
        .sl_info {
            margin: 0;
        }
        .sl_p {
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 26px;
        }
    }
}

.card-header-save {
    float: right;
    position: relative;
    bottom: 6px;
}
</style>


