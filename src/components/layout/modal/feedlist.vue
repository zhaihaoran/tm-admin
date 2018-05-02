<template>
    <el-dialog :close-on-click-modal="false" :visible.sync="modal" :before-close="handleClose" title="查看反馈" >
        <div class="photos">
            <el-row :gutter="10" >
                <el-col class="img-box" :span="8" v-for="photo in feedList" :key="photo.$index" >
                    <img :src="photo.photoUrl" class="img-fluid" alt="">
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer center">
            <el-button class="tm-btn-border" @click="handleClose">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            preview: false,
            imageUrl: '',
            files: []
        };
    },
    watch: {
        feedList(array) {
            array.map((el, index) => {
                el['id'] = el.appointmentFeedbackId;
                el['url'] = el.photoUrl;
            });
            return array;
        }
    },
    computed: {
        ...mapState({
            feedList: state => state.search.feedList
        })
    },
    props: {
        modal: {
            type: Boolean,
            default: false
        },
        currentId: {
            type: String,
            default: ''
        }
    },
    methods: {
        ...mapMutations([
            'updateValue',
            'formSubmit',
            'photoUpload',
            'getFeedList'
        ]),
        handleClose() {
            this.$emit('close');
        },
        /* 上传照片 */
        handleChange(file) {
            let formCfg = new FormData();
            formCfg.append('act', 'uploadFeedback');
            formCfg.append('appointmentId', this.currentId);
            formCfg.append('file', file.raw);

            this.photoUpload({
                formCfg,
                onSuccess: res => {
                    this.getFeedList({
                        act: 'getFeedbackList',
                        appointmentId: this.currentId
                    });
                }
            });
        },

        handleRemove(obj) {
            this.formSubmit({
                act: 'removeFeedback',
                appointmentFeedbackId: obj.appointmentFeedbackId
            });
        },

        handlePreview(file) {
            this.imageUrl = file.url;
            this.preview = true;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除？`);
        },
        handleSubmitFeedList() {
            this.formSubmit({
                act: 'submitFeedback',
                appointmentId: this.currentId,
                onSuccess: res => {
                    this.handleClose();
                }
            });
        }
    }
};
</script>

