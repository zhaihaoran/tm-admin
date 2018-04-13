import Vue from 'vue'
import Vuex from 'vuex'
import search from '@store/module/search'
import upload from '@store/module/upload'
import common from '@store/module/common'
import modal from '@store/module/modal'
import progress from '@store/module/progress'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        search,
        progress,
        upload,
        modal
    },
})
