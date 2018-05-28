import axios from 'axios';
import qs from 'qs';

import code from '@comp/lib/codes'

import {
    Message
} from 'element-ui';


/**
 * 通用的返回func
 * TODO：axios封装一层，promise封装回调处理
 */
const common_func = ({
    res,
    onSuccess,
    onError,
    isMessage = false, // 是否需要提示
    successText = "成功", // 成功提示文本
    errorText = "失败", // 失败提示文本
    ActionSuccess,
}) => {
    if (res && res.data.code === 1) {
        isMessage && Message.success(successText)
        ActionSuccess && ActionSuccess(res);
        onSuccess && onSuccess(res)
    } else {
        isMessage && Message.error(`${errorText},原因：${code[res.data.code]}`)
        onError && onError(res);
    }
}

export default {
    /**
     * axios 通用表单Post配置
     *
     * todo： 后期全部换为Promise写法
     * @param {any}
     */
    fetchPost({
        cfg,
        ...param
    }) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            common_func({
                res,
                ...param
            })
        });
    },

    /**
     * 适用于访问api/common，上传接口
     *
     * @param {any}
     */
    uploadPost({
        url,
        cfg,
        onProgress, // 上传进度回调处理
        ...param
    }) {
        let instance = axios.create({
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        /* TODO: 只要加上 onUploadProgress方法就会有跨域问题。OPTIONS发送失败，未知原因，所以现在是假进度条 */
        instance.post(`${url}`, cfg).then(res => {
            common_func({
                res,
                ...param
            })
        })

        // let config = {
        //     onUploadProgress: function(progressEvent) {
        //         if (progressEvent.lengthComputable) {
        //             onProgress && onProgress(progressEvent);
        //         }
        //     },
        // }

    },
    /**
     * 适用于访问api/common，非上传接口
     *
     * @param {any}
     */
    commonPost({
        url,
        cfg,
        ...param
    }) {
        axios({
            url,
            data: qs.stringify(cfg)
        }).then(res => {
            common_func({
                res,
                ...param
            })
        });
    }
}
