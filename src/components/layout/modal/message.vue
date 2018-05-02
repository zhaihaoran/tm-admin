<template>
    <div>
        <el-button type="text" @click="handleChatList(scope.row)" class="tm-a" >留言<span v-if="scope.row.chatUnreadQuantity>0" > ({{scope.row.chatUnreadQuantity}})</span></el-button>
        <el-dialog
            :visible.sync="modal"
            class="message-modal"
            width="500px"
            title="留言板"
        >
            <div ref="mesbox" v-loading="loading" class="message-box">
                <div v-for="item in chatList"
                    :key="item.$index" class="mb-15"
                    :class="{left: item.senderType != 3,right:item.senderType == 3}"
                >
                    <p class="no-margin"
                        :class="{school:item.senderType ==1,speaker:item.senderType ==2,tumeng:item.senderType ==3 }"
                    >
                        <span class="name">{{item.senderType == 3 ? "" : item.senderName}}</span><span class="time"> {{dateformat(item.addTimestamp)}}</span>
                    </p>
                    <p class="message">
                        {{item.message}}
                    </p>
                </div>
            </div>
            <el-form ref="modal_message" v-if="canSend" class="message-form">
                <el-form-item>
                    <el-input @keyup.native.ctrl.enter="sendMessage(scope.row)" class="tm-textarea" type="textarea" v-model="message" placeholder="ctrl + enter 快捷发送" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" v-if="canSend" >
                <el-button class="tm-btn" type="primary" @click="sendMessage(scope.row)">发送</el-button>
            </span>
            <div v-else class="msg-bottom" ></div>
        </el-dialog>
    </div>
</template>
<script>
import { dateformat } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            senderType: {
                1: '学校',
                2: '梦享家',
                3: '途梦管理员'
            },
            loading: false,
            modal: false,
            message: '',
            polling: undefined
        };
    },
    computed: {
        ...mapState({
            chatList: state => state.search.chatList
        })
    },
    props: {
        scope: {
            type: Object
        },
        canSend: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        dateformat,
        ...mapMutations(['getChatList', 'sendChatMsg', 'updatelist']),
        pollingAjax(row) {
            /* 15s 轮询一次 */
            this.polling = setInterval(args => {
                this.getChatList({
                    act: 'getChatMessageList',
                    appointmentId: row.appointmentId
                });
            }, 15000);
        },
        handleClearPolling() {
            this.modal = false;
            clearInterval(this.polling);
        },
        handleChatList(row) {
            this.modal = true;
            this.loading = true;
            row['chatUnreadQuantity'] = 0;
            this.updatelist(row);

            /* 第一次拿取数据 */
            this.getChatList({
                act: 'getChatMessageList',
                appointmentId: row.appointmentId,
                onSuccess: res => {
                    this.loading = false;
                    this.$nextTick(function() {
                        this.$refs.mesbox.scrollTop = this.$refs.mesbox.scrollHeight;
                    });
                }
            });
            /* 开始轮询 */
            this.pollingAjax(row);
        },

        sendMessage(row) {
            if (!this.message) {
                this.$message('消息不能为空');
            } else {
                this.sendChatMsg({
                    act: 'sendChatMessage',
                    appointmentId: row.appointmentId,
                    message: this.message,
                    onSuccess: res => {
                        // 将滚动条控制在最底部
                        this.$refs.mesbox.scrollTop = this.$refs.mesbox.scrollHeight;
                        // 清空内容
                        this.message = '';
                    }
                });
            }
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
    max-height: 400px;
    min-height: 300px;
    overflow-y: scroll;

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
.msg-bottom {
    height: 50px;
}
</style>

