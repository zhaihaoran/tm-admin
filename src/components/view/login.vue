<template>
    <div class="login-box">
        <div class="login-title">途梦后台登陆</div>
        <el-form :model="form" ref="form" :rules="formRules" label-width="100px" class="login-form" label-position="top" >
            <el-form-item label="用户名"  prop="username" >
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password" >
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit" >登录</el-button>
        </el-form>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            form: {
                username: 'zhaihaoran',
                password: 123456
            },
            formRules: {
                username: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 18,
                        message: '长度在 3 到 18 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 18,
                        message: '长度在 3 到 18 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        submit() {
            this.login();
            const path = this.$route.query.redirect || '/check/school';
            this.$router.push({ path });
        },
        ...mapMutations(['login'])
    }
};
</script>
<style lang="scss">
.login-box {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    margin: auto;
    width: 360px;
    padding: 2px;
    height: 400px;
    display: flex;
    flex-direction: column;
    .login-title {
        text-align: center;
        font-size: 30px;
        margin: 30px 0;
    }
    .el-button {
        width: 100%;
    }
}
</style>

