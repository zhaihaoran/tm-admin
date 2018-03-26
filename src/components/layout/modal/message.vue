<template>
    <div>
        <el-button type="text" @click="getChatList" class="tm-a" >对话<span v-if="scope.row.chatUnreadQuantity>0" > ({{scope.row.chatUnreadQuantity}})</span></el-button>
        <el-dialog
            :visible.sync="modal"
            class="message-modal"
            width="500px"
        >
            <div class="message-box">
                <div v-for="item in chatList" :key="item.$index" class="mb-15" :class="{left:item.senderType !== 3,right:item.senderType === 3}">
                    <p class="no-margin" :class="{school:item.senderType ==1,speaker:item.senderType ==2,tumeng:item.senderType ==3 }" ><span class="name">{{item.senderName}}</span><span class="time"> {{item.addTimestamp}}</span></p>
                    <p class="message">
                        {{item.message}}
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
import axios from 'axios';
export default {
    data() {
        return {
            senderType: {
                1: '学校',
                2: '演讲者',
                3: '涂梦管理员'
            },

            modal: false,
            replay: 'zhaihaoran',
            chatList: [
                {
                    senderType: 1, // 发送者类型：1=学校；2=演讲者；3=途梦管理员
                    senderName: '', // 发送者名称
                    message: '', // 消息
                    addTimestamp: 123 // 添加时间戳
                }
            ]
        };
    },
    props: ['scope'],
    methods: {
        getChatList() {
            axios.get('/admin/chatlist').then(res => {
                const data = res.data.data.chatMessageList;
                this.chatList = data;
            });
            this.modal = true;
        }
    }
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

