<!-- 查看/修改 -->
<template>
    <el-dialog :visible.sync="modal"
    :before-close="handleModalClose"
    width="800px"
     :title="title" >
        <el-form class="tm-form" :model="form" label-width="120px">
            <h3 class="info-h3" >学校基本信息（必填）</h3>
            <el-form-item label="学校名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="学校地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="责任老师">
                <el-input v-model="form.teacher"></el-input>
            </el-form-item>
            <el-form-item
                align="center"
                label="联系电话">
                <el-input v-model="form.teacherPhone"></el-input>
            </el-form-item>
            <el-form-item label="学校图片" >
                <Upload action="/admin/logout" :previewUrl="form.pic1" ></Upload>
                <div class="pic-info">
                    <h3>请拍摄学校的外景，尽量包含学校的名字</h3>
                    <p class="info-p">图片类型：JPG、PNG</p>
                    <p class="info-p">图片大小：不超过5M</p>
                    <h3 class="mm">样例</h3>
                    <img src="/static/image/banner.png" class="img-fluid" alt="demo">
                </div>
            </el-form-item>
            <el-form-item label="开课教室图片" >
                <Upload action="/admin/logout" :previewUrl="form.pic2" ></Upload>
            </el-form-item>
            <div class="individar"></div>
            <h3 class="info-h3" >贫困学校申请</h3>
            <p class="info-p">普通学校可以享受6次免费演讲分享，之后将收取费用用于公益事业</p>
            <p class="info-p">贫困学校可以完全享受免费的演讲分享</p>
            <p class="info-p">如果您的学校符合贫困条件，请填写相关信息</p>
            <el-form-item prop="freeinfo" label-width="0" >
                <el-input type="textarea" :rows="row" class="info-textarea" v-model="form.freeinfo"></el-input>
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
                            <el-radio-group v-model="form.radios">
                                <el-radio :label="3">是</el-radio>
                                <el-radio :label="6">否</el-radio>
                                <el-radio :label="9">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>2.网络</p>
                            <el-radio-group v-model="form.radios">
                                <el-radio :label="3">是</el-radio>
                                <el-radio :label="6">否</el-radio>
                                <el-radio :label="9">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>3.多媒体教师（有投影或显示设备）</p>
                            <el-radio-group v-model="form.radios">
                                <el-radio :label="3">是</el-radio>
                                <el-radio :label="6">否</el-radio>
                                <el-radio :label="9">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>4.摄像头</p>
                            <el-radio-group v-model="form.radios">
                                <el-radio :label="3">是</el-radio>
                                <el-radio :label="6">否</el-radio>
                                <el-radio :label="9">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>5.麦克风</p>
                            <el-radio-group v-model="form.radios">
                                <el-radio :label="3">是</el-radio>
                                <el-radio :label="6">否</el-radio>
                                <el-radio :label="9">不确定</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <h5 class="info-h5">学生情况</h5>
                <el-form-item prop="freeinfo"  label-width="0" >
                    <el-input type="textarea" :rows="row" class="info-textarea"  v-model="form.freeinfo"></el-input>
                </el-form-item>
                <h5 class="info-h5">为什么选择涂梦？希望涂梦为学生带来什么</h5>
                <el-form-item prop="freeinfo"  label-width="0" >
                    <el-input type="textarea" :rows="row" class="info-textarea" v-model="form.freeinfo"></el-input>
                </el-form-item>
            <el-form-item label="课程剩余">
                <el-input v-model="form.remainCount"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer center">
            <el-button type="primary" @click="submitForm">提 交</el-button>
            <el-button @click="handleModalClose">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import Upload from '@layout/upload.vue';
import img_class from '@image/admin/class.png';
import img_pc from '@image/admin/pc.png';
import img_camera from '@image/admin/camera.png';

export default {
    name: 'setting_edit',
    data() {
        return {
            mm: {
                radios: 3,
                name: '',
                address: '',
                teacher: '',
                teacherPhone: '',
                pic1: '',
                pic2: '',
                delivery: false,
                type: [],
                resource: '',
                freeinfo: '',
                radio: true
            },
            row: 8,
            img_class,
            img_pc,
            img_camera,
            form: this.data
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
    components: {
        Upload
    },
    methods: {
        handleModalClose() {
            // 通过$emit 实现子组件与父组件进行沟通
            this.$emit('modal');
        },
        submitForm() {
            console.log('object');
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


