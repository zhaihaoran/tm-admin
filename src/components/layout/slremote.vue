<template>
    <el-select
        class="modal-select mt-10"
        v-model="id"
        filterable
        remote
        @change="handleSelect"
        :remote-method="remoteMethod"
        :loading="loading"
        :placeholder="placeholder">
        <el-option
            class="sl_option"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            <!-- value 控制选择色 -->
            <div class="sl_image">
                <img :src="item.url" class="img-fluid" alt="">
            </div>
            <div class="sl_body">
                <h4 class="sl_title">{{item.label}}</h4>
                <h5 class="sl_info">{{item.info}}</h5>
                <p class="sl_p">{{item.context}}</p>
            </div>
        </el-option>
    </el-select>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
// 远程查询学校名称
export default {
    props: {
        id: {
            type: String
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        action: {
            type: String
        }
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapState({
            options: state => state.common.selectOptions,
            counts: state => state.common.optionsCounts
        })
    },
    methods: {
        ...mapMutations(['getSelectOptions', 'clearOptions']),
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.list = this.schools.filter(item => {
                        return (
                            item.label
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    });
                }, 200);
            } else {
                this.clearOptions();
            }
        },
        // 获取远程数据
        getListData(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.getSelectOptions({
                        act: this.action,
                        searchText: query,
                        onSuccess: res => {
                            this.loading = false;
                        }
                    });
                }, 200);
            } else {
                this.clearOptions();
            }
        },
        // 选中数据
        handleSelect(value) {
            this.$emit('id', value);
            console.log(value);
        }
    }
};
</script>
<style lang="scss" scoped>
.modal-select {
    width: 100%;
    .sl_option {
        display: flex;
        height: 110px;
        width: 600px;
        padding: 0;
        .sl_image {
            max-width: 80px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .sl_body {
            flex: 1;
            max-width: 475px;
            display: flex;
            flex-direction: column;
            padding: 10px 15px;
            .sl_title {
                line-height: 26px;
                margin: 0;
            }
            .sl_info {
                margin: 0;
            }
            .sl_p {
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 26px;
            }
        }
    }
}
</style>


