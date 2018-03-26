<template>
    <div class="tm-card">
        <el-radio-group v-model="orderType" class="radio-group" >
            <el-radio-button label="0">综合排序</el-radio-button>
            <el-radio-button label="1">最近演讲</el-radio-button>
            <el-radio-button label="2">最近邀约</el-radio-button>
        </el-radio-group>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Search',
    props: {
        orderType: {
            type: Number,
            default: 0
        }
    }
};
</script>

<style>
.radio-group {
    color: fff;
}

.search-input {
    display: inline-block;
    margin-left: 5px;
}
</style>
