/**
 * mixin 尝试将一些常用方法抽取出来，放到mixin里
 *
 * todo:
 */

import {
    formatAttr,
    dateformat,
    commonPageInit,
    toSchoolHome,
    toSpeakerHome
} from '@comp/lib/api_maps.js';

import { mapState, mapMutations } from 'vuex';

const mixin = {
    data() {
        return {
            form: {},
            modals: false
        }
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
        })
    },
    methods: {
        formatAttr,
        dateformat,
        toSchoolHome,
        toSpeakerHome,
        ...mapMutations([
            'clearSearchOps',
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'update',
            'getFormData'
        ]),
    }
}

export default mixin
