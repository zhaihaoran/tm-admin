<template>
    <el-dialog
        :visible.sync="modal"
        :title="title"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="学校名称" >
                <span>{{form.schoolName}}</span>
            </el-form-item>
            <el-form-item label="演讲主题"  show-overflow-tooltip >
                <el-input v-model="form.speakTitle" ></el-input>
            </el-form-item>
            <el-form-item label="演讲时间" >
                <el-date-picker
                    v-model.number="speakTimestamp"
                    type="datetime"
                    value-format="timestamp"
                    format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                    :default-value="defaultValue"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="演讲时长" width="80" >
                <el-input v-model="form.speakDuration" >
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
            <el-form-item label="邀约时间" >
                <span>{{dateformat(form.addTimestamp)}}</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="tm-modal-footer">
            <el-button class="tm-btn" type="primary" @click="handleSubmitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

export default {
    data() {
        return {
            defaultValue: ''
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            form: state => state.modal.form,
            modal: state => state.modal.modal
        }),
        speakTimestamp: {
            set(value) {
                console.log(value);
                this.$store.commit('setDateValue', {
                    speakTimestamp: value / 1000
                });
            },
            get() {
                return this.$store.state.modal.speakTimestamp * 1000;
            }
        }
    },
    methods: {
        ...mapMutations([
            'formSubmit',
            'setDateValue',
            'closeModal',
            'updatelist'
        ]),
        dateformat,
        handleSubmitForm() {
            let cfg = {
                appointmentId: this.form.appointmentId,
                speakTitle: this.form.speakTitle,
                speakTimestamp: this.speakTimestamp / 1000,
                speakDuration: this.form.speakDuration,
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
        },
        handleClose() {
            this.closeModal();
        }
    }
};
</script>

