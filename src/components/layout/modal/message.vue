<template>
    <div>
        <el-button type="text" @click="modal=true" class="tm-a" >对话<span v-if="scope.row.chatUnreadQuantity>0" > ({{scope.row.chatUnreadQuantity}})</span></el-button>
        <el-dialog
            :visible.sync="modal"
            class="message-modal"
            width="500px"
        >
            <div class="message-box">
                <div class="left mb-15">
                    <p class="speaker no-margin" ><span class="name">张小山</span><span class="time">2017-12-12 12:12</span></p>
                    <p class="message">
                        我很擅长英语方面的知识，想要给你们学校做一个演讲，方便吗
                    </p>
                </div>
                <div class="right mb-15">
                    <p class="school no-margin" ><span class="name">河北实验中学</span><span class="time">2017-12-12 12:12</span></p>
                    <p class="message">
                        我很擅长英语方面的知识，想要给你们学校做一个演讲，方便吗
                    </p>
                </div>
                <div class="left mb-15">
                    <p class="tumeng no-margin" ><span class="name">涂梦小助手</span><span class="time">2017-12-12 12:12</span></p>
                    <p class="message">
                        感谢您在涂梦的分享
                    </p>
                </div>
            </div>
            <el-form ref="modal_message" class="message-form">
                <el-form-item  >
                    <el-input class="tm-textarea" type="textarea" v-model="replay" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button class="tm-btn" type="primary" @click="modal = false">发送</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modal: false,
            replay: 'zhaihaoran'
        };
    },
    props: ['scope']
};
</script>
<style lang="scss" scoped>
.message-box {
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: rgb(245, 245, 245);

    .mb-15 {
        margin-bottom: 15px;
    }
    .left {
        text-align: left;
        .message {
            background: #fff;
        }
    }
    .right {
        text-align: right;
        .message {
            background: rgb(224, 81, 98);
            color: #fff;
            text-align: left;
        }
    }
    .speaker {
        color: #537691;
    }
    .tumeng {
        color: #62a6a1;
    }
    .school {
        color: #e05162;
    }
    .message {
        margin: 5px 0 0 0;
        max-width: 350px;
        line-height: 20px;
        padding: 5px 10px;
        display: inline-block;
        border-radius: 3px;
    }
}
.message-form {
    .el-form-item {
        margin: 0;
        padding: 20px 20px 0;
    }
}
.tm-modal-footer {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
}

.modal-title {
    font-weight: normal;
    font-size: 18px;
    margin: 0 0 15px;
}
</style>

