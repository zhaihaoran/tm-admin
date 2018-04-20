<!-- 查看/修改 -->
<template>
    <el-dialog :visible.sync="modal"
    :before-close="handleModalClose"
    width="800px"
     :title="title" >
        <el-form class="tm-form" :model="data" label-width="120px">
            <h2>演讲者基本信息（必填）</h2>
            <el-form-item label="姓名">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group size="small" v-model="data.sex">
                    <el-radio-button label="1">男</el-radio-button>
                    <el-radio-button label="2">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="公司/机构名称">
                <el-input v-model="data.company"></el-input>
            </el-form-item>
            <el-form-item label="工作岗位">
                <el-input v-model="data.title"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
                <el-input v-model="data.wechat"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="data.email"></el-input>
            </el-form-item>
            <el-form-item label="通信地址">
                <el-input v-model="data.address"></el-input>
                <span class="item-info" >用于证书，纪念品寄送</span>
            </el-form-item>
            <el-form-item label="可分享时间段">
                <el-input class="tm-textarea" type="textarea" v-model="data.idleTimeDesc"></el-input>
            </el-form-item>
            <el-form-item label="演讲内容公开">
                <el-switch
                    v-model="data.showVideoOnSite"
                    active-value="1"
                    inactive-value="0"
                >
                </el-switch>
                <span class="left-info" >是否愿意将演讲视频在途梦平台上公开展示</span>
            </el-form-item>
            <el-form-item label="您的照片" >
                <Upload filepathname="photoShortPathFilename" previewname="photoUrl" action="a" :preview="photoUrl" ></Upload>
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
                <el-input class="tm-textarea" type="textarea" v-model="data.educationBackground"></el-input>
                <span class="item-info" >请填写院校、专业、学业等</span>
            </el-form-item>
            <el-form-item label="介绍人">
                <el-input v-model="data.inviter"></el-input>
            </el-form-item>
            <el-form-item class="why-label" label="为什么申请途梦演讲者">
                <el-input type="textarea" v-model="data.whyChooseUs"></el-input>
            </el-form-item>
            <el-form-item label="受益人次">
                <el-input v-model="data.benefitPeopleTimesAdd"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer center">
            <el-button type="primary" @click="submitForm">保存</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Upload from '@layout/upload.vue';

export default {
    name: 'setting_edit',
    data() {
        return {};
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
            photoUrl: state => state.upload.photoUrl,
            photoShortPathFilename: state => state.upload.photoShortPathFilename
        })
    },
    components: {
        Upload
    },
    methods: {
        ...mapMutations(['formSubmit']),
        handleModalClose() {
            this.$emit('modal');
        },
        submitForm() {
            const cfg = Object.assign(this.data, {
                photoShortPathFilename: this.photoShortPathFilename
            });
            const data = {
                act: 'modifySpeakerApplication',
                ...cfg,
                onSuccess: res => {
                    this.handleModalClose();
                }
            };
            this.formSubmit(data);
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
    margin-left: 103%;
    min-width: 180px;
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
</style>


