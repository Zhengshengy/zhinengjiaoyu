/*
    默认Layout，上中下结构，Header和Footer部分是Fix的，中间部分为内容区
*/
<template>
    <div id="main_wrapper" class="main__wrapper">
        <div class="main__i18n">
            <ul>
                <li @click="changeLang('zh')" v-bind:class="{ 'bn-active' : this.$i18n.locale === 'zh', 'bn-inactive': this.$i18n.locale !== 'zh' }">
                    中文
                </li>
                <li @click="changeLang('en')" v-bind:class="{ 'bn-active' : this.$i18n.locale === 'en', 'bn-inactive': this.$i18n.locale !== 'en' }">
                    English
                </li>
            </ul>
        </div>
        <nuxt />
        <div v-if="!isMobileLayout" class="main__footer">
            <div class="footer__copyright">
                {{ $t('default.copyright') }}
            </div>
            <div class="footer__license" @click="onLicense">
                {{ $t('default.license') }}
            </div>
            <div class="footer__license" @click="onLicense">
                {{ "FAQ" }}
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '~/assets/styles/layouts/default.scss';
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
