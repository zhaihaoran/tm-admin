import axios from 'axios';
import qs from 'qs';

import code from '@comp/lib/codes'

import {
    Message
} from 'element-ui';


/**
 * 通用的返回func
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
        ...param
    }) {
        axios({
            url,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: cfg
        }).then(res => {
            common_func({
                res,
                ...param
            })
        });
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
