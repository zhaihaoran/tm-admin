import Util from '@comp/lib/utils'

const state = {
    form: {
        speakTimestamp: new Date().getTime() / 1000,
        addTimestamp: new Date().getTime() / 1000,
        speakerInfoType: 1,
        schoolInfoType: 1
    },
    videoTypeList: [], // 视频类型列表
    videoTypeIdStr: [],
    modal: false,
    speakTimestamp: new Date().getTime() / 1000,
    tagstab: ""
}

const mutations = {
    showModal(state, data) {
        state.modal = true
        state.form = Object.assign(state.form, data)
        state.speakTimestamp = data.speakTimestamp
    },
    /* modal edit */
    getModalData(state, {
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            cfg,
            onSuccess,
            ActionSuccess: res => {
                state.form = Object.assign(state.form, res.data.data.video)

                state.speakTimestamp = state.form.speakTimestamp
                console.table(state.form)
                let tag = state.form.tag || ""
                state.tagstab = tag.split(',')

                state.videoTypeList = Object.assign(state.videoTypeList, res.data.data.videoTypeList)

                state.videoTypeIdStr = state.form.videoTypeIdStr
            }
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
    },
    changeTags(state, value) {
        state.tagstab = value
    },
    updateFormValue(state, {
        type,
        value
    }) {
        state.form[type] = value
    },
    clearForm(state) {
        state.form = {
            schoolInfoType: 1,
            speakerInfoType: 1,
        };
    },
    changeCategory(state, value) {
        state.videoTypeIdStr = value
    }
}

export default {
    state,
    mutations
}
