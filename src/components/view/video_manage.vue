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
                <el-button type="primary" @click="searchForm()" class="sr-search-btn" >检索</el-button>
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
                <el-button type="primary" >添加</el-button>
            </div>
            <el-table :data="list" border class="tm-table">
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
            </el-table>
            <!-- 查看/修改 -->
            <el-dialog :visible.sync="modal.edit" title="查看/修改信息" width="860px" >
                <el-form class="tm-form" :model="submitForm" label-width="120px">
                    <h2>演讲者基本信息（必填）</h2>
                    <el-form-item label="姓名">
                        <el-input v-model="submitForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group size="small" v-model="submitForm.sex">
                            <el-radio-button label="2">男</el-radio-button>
                            <el-radio-button label="1">女</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="公司/机构名称">
                        <el-input v-model="submitForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="工作岗位">
                        <el-input v-model="submitForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号">
                        <el-input v-model="submitForm.wechat"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="submitForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="通信地址">
                        <el-input v-model="submitForm.address"></el-input>
                        <span class="item-info" >用于证书，纪念品寄送</span>
                    </el-form-item>
                    <el-form-item label="可分享时间段">
                        <el-input class="tm-textarea" type="textarea" v-model="submitForm.idleTimeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="演讲内容公开">
                        <el-switch
                            v-model="submitForm.showVideoOnSite"
                        >
                        </el-switch>
                        <span class="left-info" >是否愿意将演讲视频在涂梦平台上公开展示</span>
                    </el-form-item>
                    <el-form-item label="您的照片">
                            <el-upload class="certifi-upload"  action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="pic-info">
                            <h3>请拍摄能够清晰的看到正脸的照片</h3>
                            <p class="info-p">图片类型：JPG、PNG</p>
                            <p class="info-p">图片大小：不超过5M</p>
                            <h3 class="mm">样例</h3>
                            <img src="/static/image/banner.png" class="img-fluid" alt="demo">
                        </div>
                    </el-form-item>
                    <div class="individar"></div>
                    <h2>附加信息（选填）</h2>
                    <el-form-item label="教育背景">
                        <el-input class="tm-textarea" type="textarea" v-model="submitForm.educationBackground"></el-input>
                        <span class="item-info" >请填写院校、专业、学业等</span>
                    </el-form-item>
                    <el-form-item label="介绍人">
                        <el-input v-model="submitForm.inviter"></el-input>
                    </el-form-item>
                    <el-form-item label="志愿者类型">
                        <el-input v-model="submitForm.catogory"></el-input>
                        <span class="item-info" >嘉宾前期准备需约6小时，1次分享1小时</span>
                    </el-form-item>
                    <el-form-item class="why-label" label="为什么申请涂梦演讲者">
                        <el-input v-model="submitForm.whyChooseUs"></el-input>
                    </el-form-item>
                    <div class="individar"></div>
                    <el-form-item label="驳回原因">
                        <el-input class="tm-textarea" type="textarea" v-model="submitForm.rejectDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="冻结原因">
                        <el-input class="tm-textarea" type="textarea" v-model="submitForm.suspendDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="课程剩余">
                        <el-input v-model="submitForm.remainCount"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer center">
                    <el-button type="primary" @click="modal.edit = false">保 存</el-button>
                    <el-button @click="modal.edit = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import image from '../../assets/image/logo/tsinghua.png';
export default {
    data() {
        return {
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
                edit: false
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
            ],
            submitForm: {
                speakerId: '',
                name: 'zhaihr',
                sex: 1,
                company: 'zhaihr',
                title: 'zhaihr',
                wechat: 'zhaihr',
                phone: 'zhaihr',
                address: 'zhaihr',
                idleTimeDesc: 'zhaihr',
                showVideoOnSite: 1,
                photoUrl: 'zhaihr',
                educationBackground: 'zhaihr',
                inviter: 'zhaihr',
                whyChooseUs: 'zhaihr',
                rejectDesc: 'zhaihr',
                suspendDesc: 'zhaihr',
                benefitPeopleTimesAdd: 1
            }
        };
    },
    methods: {
        handleUpdate(data) {
            this.modal.edit = true;
        }
    }
};
</script>
<style lang="scss">
.why-label {
    label.el-form-item__label {
        line-height: 20px;
    }
}
.tm-form {
    width: 550px;
}
.item-info {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 105%;
    min-width: 200px;
    line-height: 20px;
}
.left-info {
    margin-left: 10px;
}

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

