import Util from '@comp/lib/utils'

const state = {
    schoolProgress: 0, // 当前学校进展
    speakerProgress: 0, // 当前梦享家进展
}

const mutations = {
    getProgressStatus(state, payload) {
        state = Object.assign(state, payload)
    },
    changeStatus(state, {
        onSuccess,
        isMessage = true,
        successText = "提交成功",
        ...cfg
    }) {
        Util.fetchPost({
            onSuccess,
            isMessage,
            successText,
            cfg,
        })
    },
}

export default {
    state,
    mutations,
}
