<template>
    <div>
        <el-container class="admin-context login" >
            <el-main class="admin-wrapper" >
                <div class="login-box">
                    <div class="login-title">途梦后台登陆</div>
                    <el-form :model="form" ref="form" :rules="formRules" label-width="100px" class="login-form" label-position="top" >
                        <el-form-item label="用户名"  prop="username" >
                            <el-input @keyup.native.enter="submit" placeholder="用户名" v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码"  prop="password" >
                            <el-input @keyup.native.enter="submit" placeholder="密码" type="password" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="submit" >登录</el-button>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import codes from '@comp/lib/codes';

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            formRules: {
                username: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'change'
                    },
                    {
                        min: 3,
                        max: 18,
                        message: '长度在 3 到 18 个字符',
                        trigger: 'change'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'change'
                    },
                    {
                        min: 3,
                        max: 18,
                        message: '长度在 3 到 18 个字符',
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: '登陆中'
                    });
                    this.login({
                        ...this.form,
                        onSuccess: res => {
                            setTimeout(() => {
                                loading.close();
                                this.$router.push({
                                    path:
                                        this.$route.query.redirect ||
                                        '/common/check_school'
                                });
                            }, 1000);
                        },
                        onError: res => {
                            loading.close();
                            this.$message.error(
                                `登陆失败，原因：${codes[res.data.code]}`
                            );
                        }
                    });
                }
            });
        },
        ...mapMutations(['login'])
    }
};
</script>
<style lang="scss">
.login-box {
    position: absolute;
    top: 200px;
    right: 0;
    left: 0;
    margin: auto;
    width: 360px;
    padding: 2px;
    height: 400px;
    display: flex;
    flex-direction: column;
    .el-form-item__label {
        line-height: 20px;
    }
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

