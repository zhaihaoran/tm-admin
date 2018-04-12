<template>
    <el-dialog
        :visible.sync="modal"
        :title="title"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="演讲者" >
                <span>{{form.speakerName}}</span>
            </el-form-item>
            <el-form-item label="演讲主题"  show-overflow-tooltip >
                <el-input placeholder="演讲主题"  show-overflow-tooltip v-model="form.speakTitle" ></el-input>
            </el-form-item>
            <el-form-item label="演讲时间" >
                <el-date-picker
                    v-model.number="speakTimestamp"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="演讲时长">
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
        ...mapMutations(['submit', 'setDateValue', 'closeModal']),
        dateformat,
        handleSubmitForm() {
            console.log(this.form);
            console.log(this.speakTimestamp);

            this.submit({
                act: 'createAppointment',
                speakerId: this.form.speakerId,
                speakTitle: this.form.speakTitle,
                speakTimestamp: this.speakTimestamp / 1000,
                speakDuration: this.form.speakDuration,
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
<style lang="scss">

</style>


