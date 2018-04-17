import Util from '@comp/lib/utils'

const state = {
    common_sidebar: false, // 主体侧边栏状态
    help_sidebar: false, // 帮助侧边栏
    sidebar_toggle: false, // 侧边栏展开状态
    // sesson里取
    checkState: 0, // 审核状态
    menuList: {}, // 菜单列表
    users: {
        isLogin: 0
    }, //用户信息
    selectOptions: [], // 远程select option
    optionsCounts: 0, // option count
}
// 模块的mutations 、 actions、getter 默认注册在全局命名空间的
const mutations = {
    setValue(state, payload) {
        state = Object.assign(state, payload)
    },
    toggleState(state) {
        //在这里改变state中的数据
        state.check_state = state.check_state ? 0 : 1
    },
    /**
     * 远程获取数据
     *
     * @param {any} state
     * @param {any}
     */
    getOptions(state, {
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onSuccess,
            cfg
        })
    },
    /**
     * 清空option
     *
     * @param {any} state
     */
    clearOptions(state) {
        state.selectOptions = [];
        state.optionsCounts = 0;
    },
    getFormData(state, {
        onError,
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onError,
            onSuccess,
            cfg
        })
    },
    /**
     * 拿到用户登陆状态
     *
     * @param {any} state
     * @param {any}
     */
    getUserLogin(state, {
        onSuccess,
        baseUrl
    }) {
        const cfg = {
            act: 'getUserLogin',
        }
        Util.commonPost({
            url: "api/common/",
            cfg,
            ActionSuccess: res => {
                let cfg = res.data.data;
                if (cfg && +cfg.isLogin > 0) {
                    state.users = cfg
                    sessionStorage.isLogin = 1;
                }
            },
            onSuccess
        })
    },

    /**
     *
     * 获取用户菜单列表
     * @param {any} state
     * @param {any}
     */
    getMenuList(state) {
        const cfg = {
            act: 'getMenuList',
        }
        Util.fetchPost({
            cfg,
            ActionSuccess: res => {
                state.menuList = res.data.data.menuList;
            }
        })
    },
    /**
     * 数组 Post
     *
     * @param {any} state
     * @param {any}
     */
    getArrayData(state, {
        onError,
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onError,
            onSuccess,
            cfg
        })
    },
    /* 获取表单数据 */
    formSubmit(state, {
        onError,
        onSuccess,
        isMessage = true,
        successText = "提交成功",
        errorText = "提交失败",
        ...cfg
    }) {
        Util.fetchPost({
            onError,
            onSuccess,
            isMessage,
            successText,
            cfg,
            errorText
        })
    },
    switchSidebarView(state, view) {
        if (view === "help") {
            state.help_sidebar = true;
            state.common_sidebar = false;
        } else {
            state.help_sidebar = false;
            state.common_sidebar = true;
        }
    },
    /**
     * 涂梦端登陆
     *
     * @param {any} state
     */
    login(state, {
        onSuccess,
        onError,
        ...param
    }) {
        Util.commonPost({
            url: "api/common/",
            onSuccess,
            onError,
            cfg: Object.assign({
                act: "adminLogin"
            }, param),
            ActionSuccess: res => {
                debugger
                state.users.isLogin = 1;
                sessionStorage.isLogin = 1;
                state.users.account = param.username;
                state.users.userType = 3;
            }
        })
    },
    signout(state,{
        onSuccess,
    }) {
        Util.commonPost({
            url: "api/common/",
            cfg: {
                act: "logout"
            },
            onSuccess,
            ActionSuccess: res => {
                state.users = {
                    isLogin: 0
                };
                sessionStorage.clear();
            }
        })
    },
    handleCheckState(state, ) {
        state.check_state = 0;
    }
}

const actions = {
    toggle({
        commit
    }) {
        //在这里改变state中的数据
        commit('toggle')
    }
}

export default {
    state,
    mutations,
    actions
};
