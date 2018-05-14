<template>
    <div :class="boxClass" id="cropper">
        <el-upload
            :class="classes"
            :action="action"
            list-type="picture-card"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="change"
            >
            <img v-if="previewUrl" :src="previewUrl" class="img-fluid">
            <i v-else class="el-icon-plus"></i>
        </el-upload>
        <!-- 遮罩层 -->
        <div class="container" v-show="panel">
            <img id="image" class="img-fluid" :src="url" alt="Picture">
            <el-button id="cancel" @click="cancel">取 消</el-button>
            <el-button type="primary" id="button" @click="commit" >确 定</el-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Cropper from 'cropperjs';

export default {
    props: {
        previewUrl: {
            type: String
        },
        filepathname: {
            type: String
        },
        previewname: {
            type: String
        },
        boxClass: {
            type: String,
            default: 'box'
        },
        croppable: {
            type: Boolean,
            default: true
        },
        classes: {
            type: String,
            default: 'avatar-uploader'
        },
        accept: {
            type: String,
            default: 'image/gif, image/jpeg, image/png, image/jpg'
        },
        aspectRatio: {
            type: String,
            default: '1'
        },
        background: {
            type: Boolean,
            default: true
        },
        zoomable: {
            type: Boolean,
            default: true
        },
        action: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            picValue: '',
            blob: '', // canvas Blob 文件
            cropper: '',
            panel: false,
            url: ''
        };
    },
    mounted() {
        //初始化这个裁剪框
        var self = this;
        var image = document.getElementById('image');
        this.cropper = new Cropper(image, {
            aspectRatio: this.aspectRatio, // 比例1:1
            viewMode: 1,
            background: this.background,
            zoomable: this.zoomable,
            rotatable: true,
            autoCropArea: false, // 是否允许自动剪裁
            ready: function() {
                self.croppable = true;
            }
        });
    },
    methods: {
        ...mapMutations(['update', 'commonUpload']),
        //取消上传
        cancel() {
            this.panel = false;
        },
        //创建url路径
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        //input框change事件，获取到上传的文件
        change(mmm) {
            let files = mmm.raw;
            if (!files.size) return;
            let type = files.type; //文件的类型，判断是否是图片
            let size = files.size; //文件的大小，判断图片的大小
            if (this.accept.indexOf(type) == -1) {
                this.$message({
                    message: '请选择我们支持的图片格式！',
                    type: 'error',
                    showClose: true,
                    duration: 3000
                });
                return false;
            }
            if (size > 5242880) {
                this.$message({
                    message: '请选择5M以内的图片！',
                    type: 'error',
                    showClose: true,
                    duration: 3000
                });
                return false;
            }
            this.picValue = files;
            this.url = this.getObjectURL(this.picValue);
            //每次替换图片要重新得到新的url
            if (this.cropper) {
                this.cropper.replace(this.url);
            }
            this.panel = true;
        },
        //确定提交
        commit() {
            this.panel = false;

            var croppedCanvas;
            var roundedCanvas;
            if (!this.croppable) {
                return;
            }
            // Crop
            croppedCanvas = this.cropper.getCroppedCanvas();
            // Round
            roundedCanvas = this.getRoundedCanvas(croppedCanvas);
            this.url = roundedCanvas.toDataURL();
            // 经过剪裁之后，如何将canvas的数据传递给接口？
            // canvas转Blob后，file文件类型本身也是blob二进制类型，通过blob来作为接口数据传递
            roundedCanvas.toBlob(
                blob => {
                    this.blob = blob;
                    //上传图片
                    this.postImg();
                },
                'image/jpeg',
                0.5
            );
        },
        //canvas画图
        getRoundedCanvas(sourceCanvas) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            let width, height;
            if (this.width) {
                width = this.width;
                height = this.width / this.aspectRatio;
            } else {
                width = sourceCanvas.width;
                height = sourceCanvas.height;
            }

            canvas.width = width;
            canvas.height = height;
            context.imageSmoothingEnabled = true;
            context.drawImage(sourceCanvas, 0, 0, width, height);
            context.globalCompositeOperation = 'destination-in';
            context.beginPath();
            // 这边是控制canvas画圆还是方的
            // context.arc(
            //     width / 2,
            //     height / 2,
            //     Math.min(width, height) / 2,
            //     0,
            //     2 * Math.PI,
            //     true
            // );
            context.fill();
            return canvas;
        },
        //提交上传函数
        postImg() {
            let formCfg = new FormData();
            // this.blob = Object.assign(this.picValue, this.blob);

            formCfg.append('file', this.blob, this.picValue.name);

            this.commonUpload({
                formCfg,
                filepathname: this.filepathname,
                previewname: this.previewname,
                onSuccess: res => {
                    this.$emit('update', {
                        fileUrl: res.data.data.fileUrl,
                        shortPathFilename: res.data.data.shortPathFilename
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
@import '../../../scss/cropper.scss';

#cropper {
    #button,
    #cancel {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background: white;
        color: #000;
    }

    #cancel {
        left: 10px;
    }

    .show {
        width: 200px;
        height: 200px;
        overflow: hidden;
        position: relative;
        border: 1px solid #d5d5d5;
    }

    .container {
        z-index: 1239;
        position: fixed;
        padding-top: 60px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 1);
    }
    .upload-btn {
        margin: 10px 0;
    }
}
</style>
