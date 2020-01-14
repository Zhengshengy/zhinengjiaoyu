/*
    错误信息展示
*/
<template>
    <div class="error">
        <div class="error-body-con">
            <Card>
                <div class="error-body-con-title">
                    <slot name="title"></slot>
                </div>
                <p class="error-body-con-message">
                    <slot name="message"></slot>
                </p>
                <div v-if="showMenu" class="error-btn-con">
                    <Button @click="onBack" size="large" style="width: 200px;margin: 0 auto;" type="primary">{{$t('errors.go_back')}}</Button>
                    <Button @click="onGoHome" size="large" style="width: 200px;margin: 0 auto;" type="text">{{$t('errors.go_home')}}</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';

export default {
    props: {
        showMenu: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
        })
    },
    methods: {
        onBack() {
            this.$router.go(-1);
        },
        onGoHome() {
            this.$router.push({
                name: 'index'
            });
        }
    }
};
</script>