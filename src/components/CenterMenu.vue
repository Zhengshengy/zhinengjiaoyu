/*
    个人主页左侧菜单
*/
<template>
    <Menu :active-name="activeName" theme="light" width="auto" :open-names="['c1', 'c2', 'c3', 'c4']">
        <MenuItem name="c11">
            <nuxt-link :to="$i18n.path('center/console')" class="another-toggle-11">
                <Icon type="md-build" />
                {{$t('links.console')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c1">
            <nuxt-link :to="$i18n.path('center/analysis')" class="another-toggle-1">
                <Icon type="ios-analytics "></Icon>
                {{$t('links.analysis')}}
            </nuxt-link>
        </MenuItem>
        <Submenu name="c2">
            <template slot="title">
                <Icon type="ios-bookmarks"></Icon>
                {{$t('links.history')}}
            </template>
            <MenuItem name="c2-1">
                <nuxt-link :to="$i18n.path('center/topic')" class="another-toggle-2">
                    {{$t('links.topic')}}
                </nuxt-link>
            </MenuItem>
            <MenuItem name="c2-2">
                <nuxt-link :to="$i18n.path('center/reality')" class="another-toggle-3">
                    {{$t('links.reality')}}
                </nuxt-link>
            </MenuItem>
            <MenuItem name="c2-3" >
                <nuxt-link :to="$i18n.path('center/simulation')" @click.native="onClickSimulation" class="another-toggle-6">
                    {{$t('links.simulation')}}
                </nuxt-link>
            </MenuItem>
        </Submenu>
        <MenuItem name="c3">
            <nuxt-link :to="$i18n.path('center/information')" class="another-toggle-4">
                <Icon type="md-person" />
                {{$t('links.information')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c5">
            <nuxt-link :to="$i18n.path('center/mistake')" class="another-toggle-7">
                <Icon type="md-close-circle" />
                {{$t('links.mistake')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c6">
            <nuxt-link :to="$i18n.path('center/collect')" class="another-toggle-8">
                <Icon type="md-heart" />
                {{$t('links.collect')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c7">
            <nuxt-link :to="$i18n.path('center/parent')" class="another-toggle-9">
                <Icon type="md-contacts" />
                {{$t('links.parent')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c20">
            <nuxt-link :to="$i18n.path('center/message')" class="another-toggle-20">
                <Icon type="md-notifications" />
                {{$t('links.message')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c4">
            <nuxt-link :to="$i18n.path(continuePath)" class="another-toggle-5">
                <Icon type="md-swap" />
                {{$t('links.continue')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c8">
            <nuxt-link :to="$i18n.path('center/order')" class="another-toggle-10">
                <Icon type="md-list-box" />
                {{$t('links.order')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c9">
            <nuxt-link :to="$i18n.path('center/package')" class="another-toggle-11">
                <Icon type="md-list-box" />
                {{$t('links.package')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c10">
            <nuxt-link :to="$i18n.path('center/wallet')" class="another-toggle-12">
                <Icon type="logo-bitcoin" />
                {{$t('links.wallet')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c13">
            <nuxt-link :to="$i18n.path('center/appointmentteacher')" class="another-toggle-13">
                <Icon type="md-calendar" />
                {{$t('links.appointmentteacher')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c14">
            <nuxt-link :to="$i18n.path('center/buycourse')" class="another-toggle-14">
                <Icon type="logo-usd" />
                {{$t('links.buycourse')}}
            </nuxt-link>
        </MenuItem>
    </Menu>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import qs from 'qs';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';
import BNService from '~/services/BNService';
import BNRouteHelper from '~/utils/BNRouteHelper';


export default {
    props: {
        activeName: {
            type: [String, Number],
            default: 'c1'
        }
    },
    data() {
        return {
            continuePath: null,
            dataReady: false
        };
    },
    computed: {
        ...mapGetters({
            requireLogin: Constants.ME.REQUIRE_LOGIN,
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
        })
    },
    async mounted() {
        this.dataReady = false;
        BNService.learnRecord().then((data) => {
            this.dataReady = true;
            const url = data.url || '';
            if (url.includes('ability')) {
                this.continuePath = 'analyze';
            } else if (url.includes('learn-topic')) {
                if (url.includes('learn-topic/next')) {
                    BNService.getNextTopic({ id: data.parameters.id }).then((data) => {
                        this.continuePath = `topic/check?topic_id=${data.topic.id}`;
                    });
                } else if (url.includes('learn-topic/previous')) {
                    BNService.getPrevTopic({ id: data.parameters.id }).then((data) => {
                        this.continuePath = `topic/check?topic_id=${data.topic.id}`;
                    });
                } else {
                    this.continuePath = `topic/check?topic_id=${data.parameters.id}`;
                }
            } else if (url.includes('reality-topic')) {
                this.continuePath = `
                pastexam`;
                if (data.parameters) {
                    this.continuePath = `pastexam/exam?${qs.stringify(data.parameters)}`;
                }
            } else if (url.includes('/reality/')) {
                this.continuePath = `pastexam`;
                if (data.parameters) {
                    this.continuePath = `pastexam/exam?${qs.stringify(data.parameters)}`;
                }
            }
            else {
                this.continuePath = '';
            }
            this.dataReady = true;
        }).catch((error) => {
            if (!this.requireLogin) {
                this.$Message.error(error.message);
            }
            this.dataReady = true;
        });
    },
    methods: {
        onClickSimulation(e) {
            this.$Message.error(this.$t('errors.no_simulation'));
        }
    }
};
</script>

<style scoped lang="less">
.ivu-layout,.ivu-menu{
    //min-height: 100vh;
}
.ivu-menu-item a{
    display: block;
    color: #495060;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    a{
         color: #2d8cf0;
    }
}
</style>