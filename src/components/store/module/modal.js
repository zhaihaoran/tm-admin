import Util from '@comp/lib/utils'

const state = {
    form: {
        speakTimestamp: new Date().getTime() / 1000,
        addTimestamp: new Date().getTime() / 1000,
        speakerInfoType: 1,
        schoolInfoType: 1
    },
    videoTyleList: [],
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

                let tag = state.form.tag || ""
                state.tagstab = tag.split(',')
                console.log(state.tagstab);
                console.log(res.data.data.videoTyleList);

                state.videoTyleList = Object.assign(state.videoTyleList, res.data.data.videoTyleList)
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
    }
}

export default {
    state,
    mutations
}
