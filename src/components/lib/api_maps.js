// 所有的接口字段map合集
const attrs = {
    // 邀约状态
    "status": {
        1: "发起中",
        2: "进行中",
        3: "已完成",
        4: "已拒绝"
    },
    // 排序类型
    "orderType": {
        0: "无排序",
        1: "最近演讲",
        2: "最近邀约",
    },
    // 发起方
    "fromSide": {
        1: "学校",
        2: "演讲者"
    },
    // 学校进展状态
    "schoolStatus": {
        1: "待开课通知",
        2: "待上课",
        3: "待课后反馈提交",
        4: "待课后反馈确认",
        100: "完成"
    },
    // 演讲者进展状态
    "speakerStatus": {
        1: "待开课通知",
        2: "待上课",
        100: "完成"
    },
    // 是否冻结
    "suspend": {
        0: "否",
        1: "是"
    },
    // 是否贫困
    "isPoor": {
        0: "否",
        1: "是"
    },
    // 认证状态
    "authStatus": {
        1: "未提审",
        2: "待审核",
        3: "已通过",
        4: "已驳回",
    },
    // 性别
    "sex": {
        1: "女",
        2: "男",
    },
}
module.exports = {
    // 日期格式化
    attrs,
    dateformat(timestamp, state = 0) {
        var date = new Date(timestamp);
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        var h = date.getHours();
        var minute = date.getMinutes();
        var s = date.getSeconds();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        s = s < 10 ? '0' + s : s;
        minute = minute < 10 ? '0' + minute : minute;
        if (state === 1) {
            return `${y}年${m}月${d}日${h}时${minute}分${s}秒`
        } else {
            return `${y}-${m}-${d} ${h}:${minute}:${s}`
        }
    },
    // 属性格式化
    formatAttr(row,column,cellValue) {
        return attrs[column.property][cellValue];
    }
}
