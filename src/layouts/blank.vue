<!--Created by Bamboo on 2018/8/16.-->
<template>
    <nuxt/>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Constants from '~/actions/Constants';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    middleware: 'auth',
    computed: mapGetters({
        isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
    }),
    mounted() {
        this.switchLayout(BN.isMobileLayout());
        this.layoutChangedHandle = this.layoutChanged;
        BN.addChangeLayoutListener(this.layoutChangedHandle);
    },
    beforeDestroy() {
        BN.removeChangeLayoutListener(this.layoutChangedHandle);
    },
    methods: {
        changeLang(lang) {
            this.switchLang(lang)
                .then(() => {
                    return BNRouteHelper.changeLocale(this.$router, lang);
                });
        },
        layoutChanged() {
            this.switchLayout(BN.isMobileLayout());
        },
        onLicense() {
            BNRouteHelper.license(this.$router);
        },
        ...mapActions({
            switchLang: Constants.INDEX.SWITCH_LANG,
            switchLayout: Constants.INDEX.SWITCH_LAYOUT
        })
    }
};
</script>