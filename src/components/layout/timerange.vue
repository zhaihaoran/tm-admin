<template>
    <el-date-picker
        v-model="timerange"
        value-format="timestamp"
        :default-time="now"
        type="datetimerange"
        @change="handleSearch"
        :picker-options="pickerOptions"
        range-separator="至"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder">
    </el-date-picker>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'datetimerange',
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            now: new Date().getTime()
        };
    },
    computed: {
        timerange: {
            set(value) {
                this.$store.commit('setTimeRange', value || []);
            },
            get() {
                let ary = this.$store.state.search.timerange;
                return [ary[0] * 1000, ary[1] * 1000];
            }
        }
    },
    props: {
        startPlaceholder: {
            type: String,
            default: '开始时间'
        },
        endPlaceholder: {
            type: String,
            default: '结束时间'
        }
    },
    methods: {
        ...mapMutations(['setTimeRange']),
        handleSearch() {
            this.$parent.$parent.$refs.sr_component.handleSearch();
        }
    }
};
</script>
