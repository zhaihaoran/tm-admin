import Util from '@comp/lib/utils'

const state = {
    form: {
        speakTimestamp: '',
        addTimestamp: new Date().getTime() / 1000,
        speakerInfoType: 1,
        schoolInfoType: 1,
        duration: ''
    },
    videoTypeList: [], // 视频类型列表
    videoTypeIdStr: "",
    modal: false,
    speakTimestamp: '',
    tagstab: "",
    sc_option: undefined,
    sp_option: undefined,
    duration: "",
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
        state.form = {
            speakTimestamp: '',
            addTimestamp: new Date().getTime() / 1000,
            speakerInfoType: 1,
            schoolInfoType: 1,
            duration: ''
        }
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
                state.videoTypeIdStr = state.form.videoTypeIdStr;
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
