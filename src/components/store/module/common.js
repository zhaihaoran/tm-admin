const state = {
    common_sidebar: false, // 主体侧边栏状态
    help_sidebar: false, // 帮助侧边栏
    sidebar_toggle: false, // 侧边栏展开状态
    // sesson里取
    login_state: 0, // 登陆状态 0：未登录
    check_state: 1 // 检验状态 0：未审核、1：已审核
}

// 模块的mutations 、 actions、getter 默认注册在全局命名空间的
const mutations = {
    // state -- 初始化 从session里取
    initState(state) {
        state.login_state = +sessionStorage.isLogin || 0
        state.check_state = +sessionStorage.check_state || 0
    },
    toggle(state) {
        //在这里改变state中的数据
        state.sidebar_toggle = !state.sidebar_toggle
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
    login(state) {
        state.login_state = 1;
        sessionStorage.isLogin = 1;
    },
    signout(state) {
        state.login_state = 0;
        sessionStorage.isLogin = 0;
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
