<template>
    <div class="tm-card">
        <el-radio-group v-model="searchConfig.category" class="radio-group" >
            <el-radio-button label="left">综合排序</el-radio-button>
            <el-radio-button label="right">申请时间</el-radio-button>
        </el-radio-group>
        <div class="search-input">
            <el-input suffix-icon="el-icon-search" ></el-input>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Search',
    props: ['searchConfig']
};
</script>

<style>
.radio-group {
    color: fff;
}

.search-input {
    display: inline-block;
    margin-left: 15px;
}
</style>
