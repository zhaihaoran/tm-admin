<template>
    <el-date-picker
        v-model="timerange"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder">
    </el-date-picker>
</template>
<script>
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
            }
        };
    },
    props: {
        timerange: {
            type: Array
        },
        startPlaceholder: {
            type: String,
            default: '开始时间'
        },
        endPlaceholder: {
            type: String,
            default: '结束时间'
        }
    }
};
</script>
