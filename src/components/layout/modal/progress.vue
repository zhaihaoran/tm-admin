<template>
    <div>
        <el-popover class="offer-step" ref="popover" trigger="click">
            <el-steps direction="vertical" class="admin-step" :active="progress">
                <el-step title="待开课通知"></el-step>
                <el-step title="待上课"></el-step>
                <el-step title="待课后反馈提交"></el-step>
                <el-step title="待课后反馈确认"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </el-popover>
        <el-button type="text" v-popover:popover v-if="progress === 1"  >待开课通知</el-button>
        <el-button type="text" v-popover:popover v-if="progress === 2"  >待上课</el-button>
        <el-button type="text" v-popover:popover v-if="progress === 3"  >待课后反馈提交</el-button>
        <el-button type="text" v-popover:popover v-if="progress === 4"  >待课后反馈确认</el-button>
        <el-button type="text" v-popover:popover v-if="progress === 5"  >完成</el-button>
    </div>
</template>
<script>
export default {
    props: {
        progress: {
            type: Number,
            default: 1
        }
    }
};
</script>

