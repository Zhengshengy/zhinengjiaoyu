<template>
    <div class="layout" :style="{overflowY : 'hidden'}">
        <Layout>
            <Header>
                <nuxt-link :to="$i18n.path('')">
                    <div class="layout-logo">{{ $t('links.site_name') }}</div>
                </nuxt-link>
                <div class="action">
                    <!-- 语言切换 -->
                    <div class="language">
                      <span @click="changeLang('zh')"
                            v-bind:class="{ 'top__i18n__li': true, 'bn-active' : this.$i18n.locale === 'zh' }">
                          {{ $t('links.chinese') }}
                      </span>
                        <span @click="changeLang('en')"
                              v-bind:class="{ 'top__i18n__li': true, 'bn-active' : this.$i18n.locale === 'en' }">
                          {{ $t('links.english') }}
                      </span>
                    </div>
                    <!-- 用户登录 -->
                    <div class="login">
                        <Dropdown transfer trigger="click" @on-click="onDropDown">
                            <a class="top__i18n__a">
                                <span class="main-user-name">{{ user && user.name }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="home">{{ $t('default.home') }}</DropdownItem>
                                <DropdownItem name="lock" divided>{{ $t('default.lock') }}</DropdownItem>
                                <DropdownItem name="logout" divided>{{ $t('default.logout') }}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div style="cursor: pointer" class="onLine" @click="online">{{$t('tutor.counseling')}}</div>

            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="2" width="auto">
                        <MenuGroup :title="this.$t('tutor.module')">
                            <!--<MenuItem name="1" :to="$i18n.path('tutor/')">-->
                            <!--<Icon type="md-build"/>-->
                            <!--{{ $t('tutor.console') }}-->
                            <!--</MenuItem>-->
                            <MenuItem name="2" :to="$i18n.path('tutor/course')">
                                <Icon type="md-calendar"/>
                                {{ $t('tutor.course') }}
                            </MenuItem>
                            <MenuItem name="3" :to="$i18n.path('tutor/order')">
                                <Icon type="md-list-box"/>
                                {{ $t('tutor.order') }}
                            </MenuItem>
                            <MenuItem name="4" :to="$i18n.path('tutor/income')">
                                <Icon type="logo-usd"/>
                                {{ $t('tutor.income') }}
                            </MenuItem>
                            <MenuItem name="5" :to="$i18n.path('tutor/notice')">
                                <Icon type="md-notifications"/>
                                {{ $t('tutor.notice') }}
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup :title="this.$t('tutor.system_setup')">
                            <MenuItem name="6" :to="$i18n.path('tutor/profile')">
                                <Icon type="md-person"/>
                                {{ $t('tutor.profile') }}
                            </MenuItem>
                            <MenuItem name="7" :to="$i18n.path('tutor/teach')">
                                <Icon type="md-card"/>
                                {{ $t('tutor.teach') }}
                            </MenuItem>
                            <MenuItem name="8" :to="$i18n.path('tutor/password')">
                                <Icon type="md-unlock"/>
                                {{ $t('tutor.password') }}
                            </MenuItem>
                            <MenuItem name="9" :to="$i18n.path('tutor/account')">
                                <Icon type="ios-create"/>
                                {{ $t('tutor.account') }}
                            </MenuItem>
                            <MenuItem name="10" :to="$i18n.path('tutor/aptitude')">
                                <Icon type="md-list"/>
                                {{ $t('tutor.aptitude') }}
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbNav/>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '100%', background: '#fff'}">
                        <nuxt/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import Constants from '~/actions/Constants';
    import BreadcrumbNav from '~/components/BreadcrumbNav';
    import BNRouteHelper from '~/utils/BNRouteHelper';
    import BNService from '~/services/BNService';

    export default {
        data(){
            return{
                tempwindow:null
            }
        },
        components: {
            BreadcrumbNav
        },
        methods: {
            ...mapActions({
                switchLang: Constants.INDEX.SWITCH_LANG,
                login: Constants.ME.LOGIN,
                logout: Constants.ME.LOGOUT,
            }),
            changeLang(lang) {
                this.switchLang(lang)
                    .then(() => {
                        return BNRouteHelper.changeLocale(this.$router, lang);
                    });
            },
            onDropDown: function (e) {
                if (e === 'home') {
                    BNRouteHelper.center(this.$router);
                } else if (e === 'logout') {
                    this.logout(true).then(() => {
                        BNRouteHelper.home(this.$router);
                    });
                } else if (e === 'lock') {
                    BNRouteHelper.lock(this.$router);
                }
            },
            online() {
                const {href} = this.$router.resolve({path: '/tutor/online',})
                this.tempwindow = window.open('_blank')
                this.tempwindow.location = href
            }
        },
        computed: {
            user() {
                return this.$store.state.me && this.$store.state.me.user;
            }
        }
    }
</script>

<style scoped>
    .ivu-layout-header {
        background: #338bd8;
        padding: 0px 30px;
    }

    .layout-logo {
        color: #fff;
        font-size: 20px;
        float: left;
    }

    .ivu-menu-dark {
        background: none
    }

    .action {
        float: right;
    }

    .action span {
        cursor: pointer;
        color: #FFF;
        font-size: 16px;
        margin: 0px 0px 0px 20px;
    }

    .onLine {
        float: right;
        font-size: 16px;
        color: #FFFFFF
    }

    .action .language {
        float: left;
        margin: 0px 30px 0px 0px;
    }

    .action .login {
        float: right
    }

    .ivu-layout-content h3 {
        font-size: 20px;
        margin: 0px 0px 30px 0px;
    }

    .ivu-breadcrumb a {
        color: #515A6E
    }

    .ivu-layout.ivu-layout-has-sider > .ivu-layout, .ivu-layout.ivu-layout-has-sider > .ivu-layout-content {
        overflow: hidden
    }
</style>
