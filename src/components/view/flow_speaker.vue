<template>
  <div class="tm-card">
        <el-steps direction="vertical" class="flow-step" >
            <el-step title="注册账号"></el-step>
            <el-step title="填写申请表"></el-step>
            <el-step title="邀约学校/被学校邀约"></el-step>
            <el-step title="登录管理中心与学校处理邀约事宜"></el-step>
            <el-step class="step-click" title="下载ClassIn教学工具" @click.native="redirect('https://www.baidu.com')" ></el-step>
            <el-step title="等待途梦联系处理上课流程"></el-step>
            <el-step title="上课"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
  </div>
</template>
<script>
export default {
    methods: {
        redirect(url) {
            window.location.href = url;
        }
    }
};
</script>
<style lang="scss">
.flow-step {
    height: 800px;
    padding: 40px;
    .step-click.el-step.is-vertical {
        .el-step__title {
            color: #bb2133;
            text-decoration: underline;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
.el-step.is-vertical {
    .el-step__head {
        width: auto;
        color: #bb2133;
        border-color: #bb2133;
        .el-step__line {
            background-color: #bb2133;
        }
    }
    .el-step__icon.is-text {
        padding: 20px;
        font-size: 20px;
    }
    .el-step__line {
        left: 50%;
        margin-left: -1px;
    }
    .el-step__title {
        line-height: 44px;
        color: #333;
    }
    .el-step__main {
        padding-left: 30px;
    }
}
</style>


