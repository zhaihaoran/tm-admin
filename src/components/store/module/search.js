import Util from '@comp/lib/utils'

const state = {
    timerange: [], // 开始时间，结束时间
    orderType: 0, // 排序类型
    status: 1, // 发起状态
    page: 1, //页码
    perPage: 10, //每页数量
    data: [], // 数据
    fromSide: 0, // 从哪来
    form: {}, // 表单信息
    count: 0, // 总数据
    tableLoading: false, // loading,
    chatList: [], //聊天内容列表
    feedList: [] //反馈内容列表
}

const mutations = {
    updateValue(state, payload) {
        state = Object.assign(state, payload)
    },
    setTimeRange(state, array) {
        if (array.length == 0) {
            state.timerange = [];
        } else {
            state.timerange = [array[0] / 1000, array[1] / 1000]
        }
    },
    /* 获取视频分类列表 */
    getVideoTypeData(state, {
        onSuccess,
        ...cfg
    }) {
        state.tableLoading = true;
        Util.fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.data = res.data.data.videoTypeList;
                state.tableLoading = false;
            }
        })
    },
    getPageData(state, {
        onSuccess,
        ...cfg
    }) {
        state.tableLoading = true;
        Util.fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.data = res.data.data.data;
                state.count = +res.data.data.count;
                state.tableLoading = false;
            }
        })
    },
    /* 更新data中一行数据 */
    updatelist(state, row) {
        state.data.map(el => {
            if (+el.addTimestamp === +row.addTimestamp) {
                return Object.assign(el, row)
            }
            return el;
        })
    },
    /* 添加一行数据 */
    addRow(state, cfg) {
        state.data.push(cfg)
    },
    /* 更新一行数据 */
    updateRow(state, {
        type,
        value,
        ...cfg
    }) {
        state.data.map(el => {
            if (el[type] == value) {
                return Object.assign(el, cfg)
            }
            return el;
        })
    },
    /* 去除一行数据 */
    deleteRow(state, {
        value, // 学校id或者演讲者id
        type // 身份： speakerId | schoolId
    }) {
        state.data = state.data.filter(el => el[type] !== value);
        state.count = state.count - 1;
    },
    /* 删除 */
    deleteSubmit(state, cfg) {
        Util.fetchPost({
            cfg,
            isMessage: true,
            successText: "删除成功",
            errorText: "删除失败",
            onSuccess: res => {
                // 提交成功
                state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
                state.count = state.count - 1
            },
        });
    },
    /* 完成 */
    finishInvite(state, cfg) {
        Util.fetchPost({
            cfg,
            isMessage: true,
            successText: "成功",
            onSuccess: res => {
                // 提交成功
                state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
                state.count = state.count - 1
            },
        });
    },
    /* 拒绝 */
    refuse(state, cfg) {
        Util.fetchPost({
            cfg,
            isMessage: true,
            successText: "操作成功",
            errorText: "操作失败",
            onSuccess: cfg.onSuccess,
            // ActionSuccess: res => {
            //     state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
            // },
        });
    },
    /* 同意 */
    Ok(state, cfg) {
        Util.fetchPost({
            cfg,
            isMessage: true,
            successText: "操作成功",
            errorText: "操作失败",
            onSuccess: cfg.onSuccess,
            // ActionSuccess: res => {
            //     state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
            // },
        });
    },
    /* 获取原因 */
    getRejectDesc(state, {
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onSuccess,
            cfg
        });
    },
    /* 获取聊天内容 */
    getChatList(state, {
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.chatList = res.data.data.chatMessageList
                // 要对聊天数据进行排序
                // 打印对象记得用console.table!!
                // console.table(state.chatList);
                state.chatList.sort((obj1, obj2) => {
                    let val1 = +obj1.addTimestamp
                    let val2 = +obj2.addTimestamp
                    return val1 - val2
                })
            }
        });
    },
    /* 发送聊天 */
    sendChatMsg(state, {
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.chatList.push({
                    senderType: 2,
                    senderName: "我", // 发送者名称
                    message: cfg.message, // 消息
                    addTimestamp: Math.floor(new Date().getTime() / 1000)
                })
            }
        });
    },
    /* 获取反馈列表 */
    getFeedList(state, cfg) {
        Util.fetchPost({
            cfg,
            ActionSuccess: res => {
                state.feedList = res.data.data.feedbackList;
            }
        });
    }
}

export default {
    state,
    mutations,
}
