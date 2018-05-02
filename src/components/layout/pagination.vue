<template>
    <el-pagination
        :current-page.sync="pn_page"
        :page-size="perPage"
        layout="total, prev, pager, next"
        :total="count"
        @current-change="pageCurrentChange"
        :class="classes"
    >
    </el-pagination>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            pn_page: this.page
        };
    },
    props: {
        classes: {
            type: String,
            default: 'flex-end'
        },
        page: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 10
        },
        count: {
            type: Number,
            default: 100
        },
        // 查询参数对象
        cfg: {
            type: Object
        }
    },
    methods: {
        ...mapMutations(['getPageData']),
        pageCurrentChange(page) {
            this.getPageData({
                page,
                ...this.cfg
            });
        }
    }
};
</script>

