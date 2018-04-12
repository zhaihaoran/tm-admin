import axios from 'axios';
import qs from 'qs';

import code from '@comp/lib/codes'

import {
    Message
} from 'element-ui';

export default {
    /**
     * axios 通用表单Post配置
     *
     * @param {any}
     */
    fetchPost({
        onSuccess,
        onError,
        isMessage = false,
        cfg,
        successText = "成功",
        errorText = "失败",
        ActionSuccess
    }) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            if (res && res.data.code === 1) {
                isMessage && Message.success(successText)
                ActionSuccess && ActionSuccess(res);
                onSuccess && onSuccess(res)
            } else {
                isMessage && Message.error(`${errorText},原因：${code[res.data.code]}`)
                onError && onError(res);
            }
        });
    },

    /**
     * 图片上传 post 配置
     *
     * @param {any}
     */
    uploadPost({
        url,
        onSuccess,
        onError,
        cfg,
        isMessage = false,
        successText = "上传成功",
        errorText = "上传失败",
        ActionSuccess
    }) {
        axios({
            url,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: cfg
        }).then(res => {
            if (res && res.data.code === 1) {
                isMessage && Message.success(successText)
                ActionSuccess && ActionSuccess(res);
                onSuccess && onSuccess(res)
            } else {
                isMessage && Message.error(`${errorText},原因：${code[res.data.code]}`)
                onError && onError(res);
            }
        });
    },

    commonPost({
        url,
        onSuccess,
        onError,
        isMessage = false,
        cfg,
        successText = "成功",
        errorText = "失败",
        ActionSuccess
    }) {
        axios({
            url,
            data: qs.stringify(cfg)
        }).then(res => {
            if (res && res.data.code === 1) {
                isMessage && Message.success(successText)
                ActionSuccess && ActionSuccess(res);
                onSuccess && onSuccess(res)
            } else {
                Message.error(`${errorText},原因：${code[res.data.code]}`)
                onError && onError(res);
            }
        });
    }
}
