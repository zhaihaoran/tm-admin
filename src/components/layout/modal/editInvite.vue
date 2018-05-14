<template>
    <el-dialog
        :visible.sync="modal"
        :title="title"
        :close-on-click-modal="false"
        width="500px"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="学校名称" >
                <span>{{form.schoolName}}</span>
            </el-form-item>
            <el-form-item label="演讲主题">
                <el-input v-model="form.speakTitle" ></el-input>
            </el-form-item>
            <el-form-item label="演讲时间" >
                <el-date-picker
                    v-model="timestamp"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="演讲时长" width="80" >
                <el-input type="number" v-model="d_duration" >
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
            <el-form-item label="邀约时间" >
                <span>{{dateformat(form.addTimestamp)}}</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="tm-modal-footer">
            <el-button class="tm-btn-border" @click="handleClose">取 消</el-button>
            <el-button class="tm-btn" type="primary" @click="handleSubmitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { attrs, formatAttr, dateformat } from '@comp/lib/api_maps.js';

export default {
    data() {
        return {
            timestamp: '',
            d_duration: ''
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    watch: {
        'form.speakTimestamp'(val) {
            this.timestamp = !!val ? new Date(+val * 1000) : '';
        },
        'form.speakDuration'(val = 0) {
            this.d_duration = val / 60;
        }
    },
    computed: {
        ...mapState({
            form: state => state.modal.form,
            modal: state => state.modal.modal
        })
    },
    methods: {
        ...mapMutations(['formSubmit', 'closeModal', 'updatelist']),
        dateformat,
        handleSubmitForm() {
            /* 必须全部填满值才可以提交 */
            if (this.form.speakTitle && this.timestamp && this.d_duration) {
                if (this.form.speakTitle.length > 25) {
                    this.$message({
                        showClose: true,
                        message: '演讲标题长度不能超过25个字',
                        type: 'warning'
                    });
                    return false;
                }
                let cfg = {
                    appointmentId: this.form.appointmentId,
                    speakTitle: this.form.speakTitle,
                    speakTimestamp: Math.floor(
                        new Date(this.timestamp).getTime() / 1000
                    ),
                    speakDuration: this.d_duration * 60,
                    addTimestamp: this.form.addTimestamp
                };

                this.formSubmit({
                    act: 'modifyAppointment',
                    ...cfg,
                    successText: '修改成功',
                    errorText: '修改失败',
                    onSuccess: res => {
                        this.updatelist(cfg);
                        this.handleClose();
                    }
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '请填写相关信息，不可空缺',
                    type: 'warning'
                });
            }
        },
        handleClose() {
            this.closeModal();
        }
    }
};
</script>

