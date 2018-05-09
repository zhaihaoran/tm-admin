const mixin = {
    methods: {
        handleClose() {
            this.modal = false;
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
        },
        handleEdit(index, row) {
            this.showModal(row);
        },
    }
}

export default mixin
