<template>
    <div class="tm-card">
        <el-radio-group @change="handleChange"  v-model="type" class="radio-group" >
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
    data() {
        return {
            type: this.orderType
        };
    },
    props: {
        orderType: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleChange() {
            console.log(this.type);
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
