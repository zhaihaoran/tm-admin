<template>
    <div class="tm-card info-box">
        <el-form ref="form" :status-icon="inline" :inline-message="inline" :model="form" label-width="80px">
            <h3>基本信息</h3>
            <el-form-item label="学校名称" prop="name" >
                <el-input disabled v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="学校地址" prop="region" >
                <el-input disabled v-model="form.region"></el-input>
            </el-form-item>
            <el-form-item label="责任老师" prop="teacher" >
                <el-input disabled v-model="form.teacher"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone" >
                <el-input disabled v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="学校图片" props="schoolSrc" >
                <img :src="form.schoolSrc" class="img-fluid" alt="school">
            </el-form-item>
            <el-form-item label="开课教室图片" props="classSrc" >
                <img :src="form.classSrc" class="img-fluid" alt="school">
            </el-form-item>
            <div class="individar"></div>
            <h3 class="info-h3" >贫困学校申请</h3>
            <p class="info-p">普通学校可以享受6次免费演讲分享，之后将收取费用用于公益事业</p>
            <p class="info-p">贫困学校可以完全享受免费的演讲分享</p>
            <p class="info-p">如果您的学校符合贫困条件，请填写相关信息</p>
            <el-form-item prop="freeinfo" label-width="0" required >
                <el-input disabled type="textarea" class="info-textarea" v-model="form.freeinfo"></el-input>
            </el-form-item>
            <div class="individar"></div>
            <h3>附加信息</h3>
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
                            <el-radio disabled :label="3">是</el-radio>
                            <el-radio disabled :label="6">否</el-radio>
                            <el-radio disabled :label="9">不确定</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="cube">
                        <p>2.网络</p>
                        <el-radio-group v-model="form.radios">
                            <el-radio disabled :label="3">是</el-radio>
                            <el-radio disabled :label="6">否</el-radio>
                            <el-radio disabled :label="9">不确定</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="cube">
                        <p>3.多媒体教师（有投影或显示设备）</p>
                        <el-radio-group v-model="form.radios">
                            <el-radio disabled :label="3">是</el-radio>
                            <el-radio disabled :label="6">否</el-radio>
                            <el-radio disabled :label="9">不确定</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="cube">
                        <p>4.摄像头</p>
                        <el-radio-group v-model="form.radios">
                            <el-radio disabled :label="3">是</el-radio>
                            <el-radio disabled :label="6">否</el-radio>
                            <el-radio disabled :label="9">不确定</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="cube">
                        <p>5.麦克风</p>
                        <el-radio-group v-model="form.radios">
                            <el-radio disabled :label="3">是</el-radio>
                            <el-radio disabled :label="6">否</el-radio>
                            <el-radio disabled :label="9">不确定</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <h5 class="info-h5">学生情况</h5>
            <el-form-item prop="freeinfo"  label-width="0" >
                <el-input disabled type="textarea" class="info-textarea"  v-model="form.freeinfo"></el-input>
            </el-form-item>
            <h5 class="info-h5">为什么选择涂梦？希望涂梦为学生带来什么</h5>
            <el-form-item prop="freeinfo"  label-width="0" >
                <el-input disabled type="textarea" class="info-textarea" v-model="form.freeinfo"></el-input>
            </el-form-item>
            <el-form-item prop="radio" label-width="0" >
                <el-checkbox disabled v-model="form.radio">我已阅读并同意涂梦 <a class="tm-a" href="#">用户规约</a></el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import img_class from '@image/admin/class.png';
import img_pc from '@image/admin/pc.png';
import img_camera from '@image/admin/camera.png';

export default {
    data() {
        return {
            inline: true,
            form: {
                radios: 3,
                name: 'zhaihaoran',
                region: 'zhaihaoran',
                teacher: 'zhaihaoran',
                telephone: 'zhaihaoran',
                delivery: false,
                type: [],
                resource: 'asdsad',
                freeinfo: 'asdasd',
                schoolSrc: '/static/image/admin/camera.png',
                classSrc: '/static/image/admin/camera.png',
                radio: true
            },
            dialogImageUrl: '',
            dialogVisible: false,
            img_class,
            img_pc,
            img_camera
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style>
.info-box .el-input {
    max-width: 500px;
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
    max-width: 600px;
}
.info-textarea textarea {
    min-height: 100px !important;
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
</style>


