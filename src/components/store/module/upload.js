import Util from '@comp/lib/utils'

const state = {
    classroomPhotoShortPathFilename: '',
    classroomPhotoUrl: '',
    schoolPhotoShortPathFilename: '',
    schoolPhotoUrl: '',
    videoShortPathFilename: "",
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
        onProgress,
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
            onProgress,
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
    },
    /* 清空图片信息 */
    clearPhotoData(state) {
        state.previewUrl = ""
    }
}

export default {
    state,
    mutations
}
