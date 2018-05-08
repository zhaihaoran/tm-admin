<template>
    <v-select :value="defaultOption" :placeholder="placeholder" :filterable="false" :options="options" :onChange="handleChange"  @search="onSearch">
        <template slot="no-options">
            <div class="empty" >
                暂无数据
            </div>
        </template>
        <template slot="option" slot-scope="option">
            <slot :option="option"></slot>
        </template>
        <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
                {{option.name}}
            </div>
        </template>
    </v-select>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            defaultOption: undefined,
            options: [],
            loading: false
        };
    },
    watch: {
        /* 检测对象会有问题 */
        dption(val) {
            if (val && val.name) {
                this.defaultOption = Object.assign(
                    this.defaultOption || {},
                    val
                );
                this.options = [this.defaultOption];
            } else {
                this.defaultOption = undefined;
                this.options = [];
            }
        }
    },
    props: {
        defaults: {
            type: String,
            default: ''
        },
        dption: {
            type: Object
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        action: {
            type: String
        }
    },
    methods: {
        ...mapMutations(['getOptions']),
        onSearch(search) {
            this.search(search, this);
        },
        search(search, vm) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getOptions({
                    act: this.action,
                    searchText: search,
                    onSuccess: res => {
                        vm.options = res.data.data.data;
                    }
                });
            }, 350);
        },
        handleChange(val) {
            this.$emit('id', val);
            this.options = [];
        }
    }
};
</script>
<style lang="scss" scoped>
img {
    height: auto;
    max-width: 2.5rem;
    margin-right: 1rem;
}

.d-center {
    display: flex;
    align-items: center;
}

.selected img {
    width: auto;
    max-height: 23px;
    margin-right: 0.5rem;
}

.v-select .dropdown li {
    border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
    border-bottom: none;
}

.v-select .dropdown li a {
    padding: 10px 20px;
    width: 100%;
    font-size: 1.25em;
    color: #3c3c3c;
}

.empty {
    padding: 20px;
}
</style>


