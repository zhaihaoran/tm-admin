import Util from '@comp/lib/utils'

const state = {
    classroomPhotoShortPathFilename: '',
    classroomPhotoUrl: '',
    schoolPhotoShortPathFilename: '',
    schoolPhotoUrl: '',
    videoShortPathFilename: "1",
    pathfilename: '',
    previewShortPathFilename: '',
    previewUrl: '',
    originFilename: '',
    photoUrl: ''
}

const mutations = {
    update(state, payload) {
        state = Object.assign(state, payload)
    },
    commonUpload(state, {
        onSuccess,
        onError,
        filepathname,
        previewname,
        formCfg
    }) {
        formCfg.append('act', 'upload');
        formCfg.append('generateThumb', 1);
        Util.uploadPost({
            url: "api/common/",
            cfg: formCfg,
            onSuccess,
            isMessage: true,
            onError,
            ActionSuccess: res => {
                state[previewname] = res.data.data.fileUrl
                state[filepathname] = res.data.data.shortPathFilename
                state.originFilename = res.data.data.originFilename
            }
        })
    },
    /* 单独上传 */
    photoUpload(state, {
        onSuccess,
        onError,
        formCfg
    }) {
        Util.uploadPost({
            url: "api/speakerConsole/",
            cfg: formCfg,
            isMessage: true,
            onSuccess,
            onError,
        })
    }
}

export default {
    state,
    mutations
}
