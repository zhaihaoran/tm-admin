const mixin = {
    methods: {
        handleUpdateSchoolId(cfg) {
            this.searchCfg.schoolId = cfg ? cfg.schoolId : '';
            this.$refs.sr_component.handleSearch();
        },

        handleUpdateSpeakerId(cfg) {
            this.searchCfg.speakerId = cfg ? cfg.speakerId : '';
            this.$refs.sr_component.handleSearch();
        }
    }
}

export default mixin
