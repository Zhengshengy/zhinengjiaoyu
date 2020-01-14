<template>
    <Menu :active-name="activeName" theme="light" width="auto" :open-names="['c1', 'c2', 'c3', 'c4']">
        <MenuItem name="c1">
            <nuxt-link :to="$i18n.path('teacher/center/team')" class="another-toggle-1">
                <Icon type="ios-ribbon" />
                {{$t('links.teacher.center.team_manager')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c2">
            <nuxt-link :to="$i18n.path('teacher/center/homework')" class="another-toggle-2">
                <Icon type="ios-paper" />
                {{$t('links.teacher.center.homework_manager')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c3">
            <nuxt-link :to="$i18n.path('teacher/center/message')" class="another-toggle-3">
                <Icon type="md-mail" />
                {{$t('links.teacher.center.message')}}
            </nuxt-link>
        </MenuItem>
        <MenuItem name="c4">
            <nuxt-link :to="$i18n.path('teacher/center/information')" class="another-toggle-4">
                <Icon type="md-person" />
                {{$t('links.profile')}}
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
                    this.continuePath = `pastexam`;
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