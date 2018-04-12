import Util from '@comp/lib/utils'

const state = {
    form: {
        speakTimestamp: new Date().getTime() / 1000,
        addTimestamp: new Date().getTime() / 1000,
    },
    modal: false,
    speakTimestamp: new Date().getTime() / 1000
}

const mutations = {
    showModal(state, data) {
        state.modal = true
        state.form = Object.assign(state.form, data)
        state.speakTimestamp = data.speakTimestamp
    },
    /* modal edit */
    submit(state, {
        onSuccess,
        ...cfg
    }) {
        Util.fetchData({
            cfg,
            onSuccess,
            isMessage: true,
            successText: "修改成功",
            errorText: "修改失败",
        })
    },
    closeModal(state, cfg) {
        state.modal = false;
        state.form = {
            speakTimestamp: new Date().getTime() / 1000,
            addTimestamp: 0
        };
    },
    setDateValue(state, payload) {
        state = Object.assign(state, payload)
    }
}

export default {
    state,
    mutations
}
