<!-- 查看/修改 -->
<template>
    <el-dialog :visible.sync="modal"
    :before-close="handleModalClose"
    :close-on-click-modal="false"
    width="800px"
     :title="title" >
        <el-form class="tm-form" :model="data" label-width="120px">
            <h3 class="info-h3" >学校基本信息（必填）</h3>
            <el-form-item label="学校名称">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="学校地址">
                <el-input v-model="data.address"></el-input>
            </el-form-item>
            <el-form-item label="责任老师">
                <el-input v-model="data.teacher"></el-input>
            </el-form-item>
            <el-form-item
                align="center"
                label="联系电话">
                <el-input v-model="data.teacherPhone"></el-input>
            </el-form-item>
            <el-form-item label="学校图片" >
                <Upload filepathname="schoolPhotoShortPathFilename" previewname="schoolPhotoUrl" action="asd" :preview="schoolPhotoUrl" ></Upload>
            </el-form-item>
            <el-form-item label="开课教室图片" >
                <Upload filepathname="classroomPhotoShortPathFilename" previewname="classroomPhotoUrl" action="as"  :preview="classroomPhotoUrl" ></Upload>
            </el-form-item>
            <div class="individar"></div>
            <h3 class="info-h3" >贫困学校申请</h3>
            <p class="info-p">普通学校可以享受3次免费演讲分享，之后将收取费用用于公益事业</p>
            <p class="info-p">贫困学校可以完全享受免费的演讲分享</p>
            <p class="info-p">如果您的学校符合贫困条件，请填写相关信息</p>
            <el-form-item prop="poorDesc" label-width="0" >
                <el-input type="textarea" :rows="row" class="info-textarea" v-model="data.poorDesc"></el-input>
            </el-form-item>
            <el-form-item prop="isPoor" label="贫困用户认证" >
                <el-switch
                    v-model="data.isPoor"
                    active-value="1"
                    inactive-value="0"
                >
                </el-switch>
            </el-form-item>
            <div class="individar"></div>
            <h3>附加信息（选填）</h3>
            <p class="info-p">以下信息填写的越详细，越有助于我们快速审核开通你的账号</p>
                <h5 class="info-h5" >您的学校是否具有以下硬件设施</h5>
                <div class="info-table">
                    <div class="info-table-col" style="max-width:250px;" >
                        <div class="cube-big">
                            <img :src="img_pc" alt="">
                        </div>
                        <div class="cube">
                            <img :src="img_class" alt="">
                        </div>
                        <div class="cube-big">
                            <img :src="img_camera" alt="">
                        </div>
                    </div>
                    <div class="info-table-col">
                        <div class="cube">
                            <p>1.电脑</p>
                            <el-radio-group v-model="data.havePC">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>2.网络</p>
                            <el-radio-group v-model="data.haveNet">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>3.多媒体教师（有投影或显示设备）</p>
                            <el-radio-group v-model="data.haveMultimediaClassroom">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>4.摄像头</p>
                            <el-radio-group v-model="data.haveCamera">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>5.麦克风</p>
                            <el-radio-group v-model="data.haveMic">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <h5 class="info-h5">学生情况</h5>
                <el-form-item prop="studentStatus"  label-width="0" >
                    <el-input type="textarea" :rows="row" class="info-textarea"  v-model="data.studentStatus"></el-input>
                </el-form-item>
                <h5 class="info-h5">为什么选择途梦？希望途梦为学生带来什么</h5>
                <el-form-item prop="whyChooseUs"  label-width="0" >
                    <el-input type="textarea" :rows="row" class="info-textarea" v-model="data.whyChooseUs"></el-input>
                </el-form-item>
            <el-form-item label="课程剩余">
                <el-input v-model="data.classQuantity"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer center">
            <el-button class="tm-btn-border" @click="handleModalClose">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import Upload from '@layout/upload.vue';
import img_class from '@image/admin/class.png';
import schoolDemo from '@image/admin/school.png';
import classlDemo from '@image/admin/class.png';
import img_pc from '@image/admin/pc.png';
import img_camera from '@image/admin/camera.png';

export default {
    name: 'setting_edit',
    data() {
        return {
            row: 8,
            img_class,
            img_pc,
            img_camera,
            classlDemo,
            schoolDemo
        };
    },
    props: {
        title: {
            type: String,
            default: '选择视频'
        },
        modal: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object
        }
    },
    computed: {
        ...mapState({
            schoolPhotoUrl: state => state.upload.schoolPhotoUrl,
            classroomPhotoUrl: state => state.upload.classroomPhotoUrl,
            classroomPhotoShortPathFilename: state =>
                state.upload.classroomPhotoShortPathFilename,
            schoolPhotoShortPathFilename: state =>
                state.upload.schoolPhotoShortPathFilename
        })
    },
    components: {
        Upload
    },
    methods: {
        ...mapMutations(['formSubmit', 'updateRow']),
        handleModalClose() {
            this.$emit('modal');
        },
        submitForm() {
            const cfg = Object.assign(this.data, {
                schoolPhotoShortPathFilename: this.schoolPhotoShortPathFilename,
                classroomPhotoShortPathFilename: this
                    .classroomPhotoShortPathFilename
            });
            const data = {
                act: 'modifySchoolApplication',
                ...cfg,
                onSuccess: res => {
                    this.updateRow({
                        type: 'schoolId',
                        value: cfg.schoolId,
                        ...cfg
                    });
                    this.handleModalClose();
                }
            };
            this.formSubmit(data);
        }
    }
};
</script>
<style lang="scss" scoped>
.why-label {
    label.el-form-item__label {
        line-height: 20px;
    }
}
.tm-form {
    width: 650px;
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
.pic-info {
    width: 150px;
    position: absolute;
    top: 0;
    left: 400px;
    h3 {
        margin: 0;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .mm {
        margin-top: 10px;
    }
    .info-p {
        margin: 0;
        font-size: 14px;
        line-height: 25px;
        color: #606266;
    }
}

.info-p {
    margin: 0;
    font-size: 14px;
    line-height: 25px;
    color: #606266;
}

.info-h3 {
    font-weight: bold;
}

.info-h5 {
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    margin: 0;
}
.info-textarea {
    margin-top: 20px;
    max-width: 800px;
}

.info-table {
    display: flex;
    margin: 25px 0;
    max-width: 800px;
}

.info-table .info-table-col {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.info-table .info-table-col > div {
    justify-content: center;
    align-items: center;
    display: flex;
    border: 1px solid #e2e2e2;
    flex-direction: column;
}

.info-table .info-table-col .cube {
    flex: 1;
    height: 110px;
}

.info-table .info-table-col .cube-big {
    flex: 2;
    height: 220px;
}

.cube p,
.cube .el-radio-group {
    width: 100%;
    padding-left: 60px;
}

.certifi-info.invite-send {
    background: rgb(249, 242, 232);
    border: 1px solid #e97a50;
}

.certifi-info.invite-send .card-image {
    display: flex;
    width: auto;
    padding: 10px;
    align-items: center;
    justify-content: center;
}

.certifi-info.invite-send .card-wrapper p {
    max-width: 750px;
    line-height: 28px;
    margin-top: 10px;
}
.certifi-info.invite-send .card-wrapper h2 {
    margin-bottom: 10px;
}
.invite-send.tm-card {
    display: flex;
    flex-direction: row;
}
.invite-send .card-image {
    width: 160px;
    overflow: hidden;
}
.invite-send .card-wrapper {
    flex: 1;
    color: #6e6e6e;
    padding-left: 20px;
}
.invite-send .card-wrapper p {
    max-height: 66px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.invite-send .card-wrapper p .num {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
}

.invite-send .card-wrapper p .teacher-name {
    font-size: 22px;
    font-weight: bold;
    color: #000;
    margin-right: 20px;
}
</style>


