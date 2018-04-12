<template>
    <div>
        <el-table
            :data="data"
            border
            v-loading="loading"
            class="tm-table"
        >
            <template slot="empty" >
                <img :src="emptyImage" class="img-fluid" alt="empty">
            </template>
            <slot></slot>
        </el-table>
    </div>
</template>
<script>
import emptyImage from '@image/empty.png';
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array
        }
    },
    data() {
        return {
            emptyImage
        };
    }
};
</script>

