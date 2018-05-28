import {
    mapState,
    mapMutations
} from 'vuex';

const mixin = {
    data() {
        return {
            modal: {
                suspend: false,
                reason: false
            },
            suspendDesc: '',
            selectRow: {}
        }
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
        })
    },
    methods: {
        ...mapMutations([
            'formSubmit',
            'updateRow'
        ]),
        handleOnModal(obj) {
            this.selectRow = obj;
            this.modal.suspend = true;
        },
        showReason(reason) {
            this.$alert(reason, '冻结原因').catch(() => {});
        },
        /* 解冻 */
        handleUnsuspend(obj) {
            this.$confirm('确认解冻', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.formSubmit({
                        act: 'resumeUser',
                        userId: obj.schoolId || obj.speakerId,
                        isMessage: true,
                        successText: '解冻成功',
                        onSuccess: res => {
                            this.modal.suspend = false;
                            this.updateSusListRow(obj,{
                                suspend: 0
                            });
                        }
                    });
                })
                .catch(() => {});
        },
        /* 冻结 */
        handleSuspend() {
            this.formSubmit({
                act: 'suspendUser',
                userId: this.selectRow.schoolId || this.selectRow.speakerId,
                suspendDesc: this.suspendDesc,
                isMessage: true,
                successText: '冻结成功',
                onSuccess: res => {
                    this.modal.suspend = false;
                    this.updateSusListRow(this.selectRow, {
                        suspend: 1,
                        suspendDesc: this.suspendDesc
                    });
                }
            });
        },

        /* update row */
        updateSusListRow(obj, susData) {
            if (obj.schoolId) {
                this.updateRow({
                    type: "schoolId",
                    value: obj.schoolId,
                    ...susData
                })
            }
            if (obj.speakerId) {
                this.updateRow({
                    type: "speakerId",
                    value: obj.speakerId,
                    ...susData
                })
            }
        }
    }
}

export default mixin
