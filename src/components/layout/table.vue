<template>
    <div>
        <el-table
            :data="data"
            border
            class="tm-table"
        >
            <template slot="empty" >
                <img :src="emptyImage" class="img-fluid" alt="empty">
            </template>
            <slot></slot>
        </el-table>
        <el-pagination
            v-show="isPagination"
            :current-page.sync="pn_page"
            :page-size="perPage"
            layout="total, prev, pager, next"
            :total="totalCount"
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            class="flex-end"
        >
        </el-pagination>
    </div>
</template>
<script>
import emptyImage from 'assets/image/empty.png';
export default {
    props: {
        isPagination: {
            type: Boolean,
            default: true
        },
        page: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 20
        },
        totalCount: {
            type: Number,
            default: 100
        },
        data: {
            type: Array
        }
    },
    data() {
        return {
            emptyImage,
            pn_page: this.page
        };
    },
    methods: {
        pageSizeChange(val) {},
        pageCurrentChange(val) {}
    }
};
</script>

