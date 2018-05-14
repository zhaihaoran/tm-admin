import Util from '@comp/lib/utils'

const state = {
    form: {
        speakTimestamp: new Date().getTime() / 1000,
        addTimestamp: new Date().getTime() / 1000,
        speakerInfoType: 1,
        schoolInfoType: 1
    },
    videoTypeList: [], // 视频类型列表
    videoTypeIdStr: "",
    modal: false,
    speakTimestamp: '',
    tagstab: "",
    sc_option: undefined,
    sp_option: undefined,

    duration: "",
    time_min: "",
    time_sec: "",
}

const mutations = {
    showModal(state, data) {
        state.modal = true
        state.form = {};
        state.form = Object.assign(state.form, data)
        state.speakTimestamp = data.speakTimestamp,
        state.duration = state.form.speakDuration;
    },
    clearOption(state, type) {
        state[type] = undefined;
    },
    clearModalData(state) {
        state.speakTimestamp = ""
        state.time_min = ""
        state.time_sec = ""
        state.tagstab = ""
        state.videoTypeIdStr = ""
        state.sc_option = undefined
        state.sp_option = undefined
    },
    setOption(state, payload) {
        state.sc_option = {
            name: payload.schoolName,
            schoolId: payload.schoolId
        };
        state.sp_option = {
            name: payload.speakerName,
            speakerId: payload.speakerId
        };
    },
    updateMin(state, value) {
        state.time_min = value
    },
    updateSec(state, value) {
        state.time_sec = value
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
                let tag = state.form.tag || ""
                state.tagstab = tag.split(',')

                state.videoTypeList = Object.assign(state.videoTypeList, res.data.data.videoTypeList)

                state.videoTypeIdStr = state.form.videoTypeIdStr

                state.time_min = Math.floor(res.data.data.video.duration / 60);
                state.time_sec = Math.floor(res.data.data.video.duration % 60);
            }
        })
    },
    closeModal(state, cfg) {
        state.modal = false;
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
            playTimes: "0"
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
