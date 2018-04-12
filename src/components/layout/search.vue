<template>
    <div class="tm-card" >
        <el-radio-group  v-model="orderType" @change="handleSearch" >
            <el-radio-button label="0">综合排序</el-radio-button>
            <el-radio-button label="1">最近演讲</el-radio-button>
            <el-radio-button label="2">最近邀约</el-radio-button>
        </el-radio-group>
        <slot></slot>
        <el-button type="primary" @click="handleSearch" class="search-btn" >检索</el-button>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    props: {
        // 查询参数对象
        cfg: {
            type: Object
        }
    },
    computed: {
        // 把需要变化的东西放到组件内部，外部参数用不变的东西
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange
        }),
        orderType: {
            set(value) {
                this.updateValue({
                    orderType: value
                });
            },
            get() {
                return this.$store.state.search.orderType;
            }
        }
    },
    methods: {
        ...mapMutations(['getPageData', 'updateValue']),
        handleSearch() {
            const param = Object.assign(this.cfg, {
                orderType: this.orderType,
                speakTimestampStart: this.timerange[0],
                speakTimestampEnd: this.timerange[1]
            });
            console.log(param);
            this.getPageData(param);
        }
    }
};
</script>

<style lang="scss" scoped>
.search-btn {
    position: absolute;
    right: 20px;
    top: 20px;
}
</style>
