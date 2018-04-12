<template>
    <el-dialog
        :visible.sync="modal"
        :title="title"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="学校名称" >
                <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="演讲主题"  show-overflow-tooltip >
                <el-input placeholder="演讲主题"  show-overflow-tooltip v-model="form.speakTitle" ></el-input>
            </el-form-item>
            <el-form-item label="演讲时间" >
                <el-date-picker
                    v-model.number="time"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    :default-value="defaultValue"
                    value-format="timestamp"
                    format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="演讲时长" >
                <el-input placeholder="60分钟以上" v-model="form.speakDuration" >
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
            defaultValue: '',
            pickerOptions1: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            }
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
            modal: state => state.modal.modal,
            speakTimestamp: state => state.modal.speakTimestamp
        }),
        time: {
            set(value) {
                this.setDateValue({
                    speakTimestamp: value / 1000
                });
            },
            get() {
                return this.speakTimestamp * 1000;
            }
        }
    },
    methods: {
        ...mapMutations(['formSubmit', 'setDateValue', 'closeModal']),
        dateformat,
        handleSubmitForm() {
            this.formSubmit({
                act: 'createAppointment',
                schoolId: this.form.schoolId,
                speakTitle: this.form.speakTitle,
                speakTimestamp: this.speakTimestamp / 1000,
                speakDuration: this.form.speakDuration,
                successText: '邀约成功',
                errorText: '邀约失败',
                onSuccess: res => {
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


