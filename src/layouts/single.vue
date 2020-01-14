/*
    单页面模块Layout，isMobileLayout为True表示手机页面展示，为False表示桌面模式，Header部分包含用户菜单，手机模式下采用左右结构显示。 使用了Vue-SideOut组件
*/
<template>
    <div v-if="isMobileLayout" id="mb_main_wrapper" class="main__wrapper">
        <Slideout menu="#menu" panel="#panel" :toggleSelectors="toggleSelectors" @on-open="open" @once-open="onceOpen" @on-beforeclose="beforeClose" @on-close="close" :touch="false"
        >
            <nav id="menu" v-bind:class="{'bn-main-menu': true, 'slideout-menu': true, 'bn-main-menu-open': menuOpen}" :style="{minHeight: windowsHeight }">
                <div class="mb-leftside_container" :style="{minHeight: windowsHeight }" >
                    <div class="bn-main-nav" style="color: white">{{$t('links.site_name')}}</div>
                    <Menu class="bn-main-user-menu" :active-name="activeName" theme="light" width="auto" :open-names="openNames">
                        <MenuItem name="6">
                            <nuxt-link :to="$i18n.path('')" >
                                <Icon type="ios-search-strong"></Icon>
                                {{$t('errors.go_home')}}
                            </nuxt-link>
                        </MenuItem>
                        <Submenu name="7">
                            <template slot="title">
                                <Icon type="ios-bookmarks"></Icon>
                                {{$t('default.home')}}
                            </template>
                            <CenterMenu :activeName="activeName" />
                        </Submenu>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-bookmarks"></Icon>
                                {{$t('default.short_link')}}
                            </template>
                            <!-- <MenuItem name="1-1">
                                <nuxt-link :to="$i18n.path('center')" >
                                    {{$t('default.home')}}
                                </nuxt-link>
                            </MenuItem> -->
                            <MenuItem name="1-2">
                                <div :to="$i18n.path('lockscreen')" @click="onDropDown('lock')" class="another-toggle bn-nuxt-link">
                                    {{$t('default.lock')}}
                                </div>
                            </MenuItem>
                            <MenuItem name="1-3">
                                <nuxt-link :to="$i18n.path('center')" >
                                    {{$t('default.logout')}}
                                </nuxt-link>
                            </MenuItem>
                        </Submenu>
                        <Submenu v-for="right in classification" :key="right.subjectName" :name="right.index">
                            <template slot="title">
                                <Icon type="ios-bookmarks"></Icon>
                                {{right.subjectName}}
                            </template>
                            <MenuItem v-for="list in right.Subject" :key="list.value" style="cursor: pointer" :name="right.index + '-' + list.value">
                                <div @click="onClassificationMenuClick(right, list.value)" >
                                    {{list.subject}}
                                </div>
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </div>
                <div v-if="menuOpen" class="mb-outside_container" @click="onMenuClick" @touchstart="onMenuClick" :style="{height: windowsHeight }"/>
            </nav>
            <main id="panel" :style="{minHeight: screenHeight + 'px' }">
                <header>
                    <div v-bind:class="{ 'top__i18n': true, 'top__menu--mobile': true, 'top__background--blue': settings.topBlue}">
                        <span class="toggle-button"><Icon type="md-menu" size="24" /></span>
                        {{ user && user.name }}
                    </div>
                </header>
                <div v-bind:class="{ 'single-page-wrap': true, 'single-page-wrap--mb': true, 'single-page-con-bg': settings.withBackground}" :style="{left: '0'}">
                    <nuxt />
                </div>
            </main>
        </Slideout>
    </div>
    <div v-else id="main_wrapper" class="main__wrapper">
        <div v-bind:class="{ 'top__i18n': true, 'top__background--blue': settings.topBlue}">
            <ul >
                <div id="sange" style="float: left; margin-top: 15px;">
                    <BreadcrumbNav />
                </div>
                <li @click="changeLang('zh')" v-bind:class="{ 'top__i18n__li': true, 'bn-active' : this.$i18n.locale === 'zh' }" style="margin-top: 0px">
                    {{ $t('links.chinese') }}
                </li>
                <li @click="changeLang('en')" v-bind:class="{ 'top__i18n__li': true, 'bn-active' : this.$i18n.locale === 'en' }" style="margin-top: 0px">
                    {{ $t('links.english') }}
                </li>
                <div style="float: right; cursor: pointer" v-show="isLogin">
                    <div class="header-avator-con">
                        <div class="user-dropdown-menu-con">
                            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
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
                                <div @click="onHome" style="display: none" >
                                    <Avatar :src="user&&user.avatar" style="background: #619fe7;margin-left: 10px;">
                                    </Avatar>
                                </div>
                            </Row>
                            <!--<login style="width: 100%;" v-show="!isLogin"></login>-->
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <div v-bind:class="{ 'single-page-wrap': true, 'single-page-con-bg': settings.withBackground}" :style="{left: '0'}">
            <nuxt />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '~/assets/styles/layouts/single.scss';
import { mapGetters, mapActions } from 'vuex';
import Slideout from 'vue-slideout';
import BreadcrumbNav from '~/components/BreadcrumbNav';
import CenterMenu from '~/components/CenterMenu';
import Constants from '~/actions/Constants';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';

const WINDOWS_HEIGHT = BN.viewport().height;

export default {
    components: {
        BreadcrumbNav,
        CenterMenu,
        Slideout
    },
    head: function() {
        return {
            title: this.$t('links.site_name')
        };
    },
    data: function() {
        const subjects = [
            {
                subject: this.$t('subject.math'),
                value: BNConstants.COURSE.MATH
            },
            {
                subject: this.$t('subject.physics'),
                value: BNConstants.COURSE.PHYSICS
            },
            {
                subject: this.$t('subject.chemistry'),
                value: BNConstants.COURSE.CHEMISTRY
            },
            {
                subject: this.$t('subject.biology'),
                value: BNConstants.COURSE.BIOLOGY
            }
        ];
        return {
            shrink: false,
            userName: '',
            menuOpen: false,
            isFullScreen: false,
            windowsHeight: `${WINDOWS_HEIGHT}px`,
            classification2: {
                subjectName: this.$t('default.person_analysis'),
                index: '2',
                Subject: subjects
            },
            classification: [
                {
                    subjectName: this.$t('default.person_analysis'),
                    index: '2',
                    Subject: subjects
                },
                {
                    subjectName: this.$t('default.historic_test'),
                    index: '3',
                    Subject: subjects
                },
                {
                    subjectName: this.$t('default.knowledge'),
                    index: '4',
                    Subject: subjects
                }
            ],
            toggleSelectors: [
                '.toggle-button',
                '.another-toggle',
                '.another-toggle-1',
                '.another-toggle-2',
                '.another-toggle-3',
                '.another-toggle-4',
                '.another-toggle-5',
                '.another-toggle-6',
                '.another-toggle-7',
                '.another-toggle-8',
                '.another-toggle-9',
            ]
        };
    },
    computed: {
        activeName() {
            let name = '6';
            const fullPath = (this.$route.fullPath || '').split('?')[0];
            if (fullPath.indexOf('/center') >= 0) {
                name = 'c1';
            }
            if (fullPath.indexOf('/center/analysis') >= 0) {
                name = 'c1';
            }
            if (fullPath.indexOf('/center/topic') >= 0) {
                name = 'c2-1';
            }
            if (fullPath.indexOf('/center/reality') >= 0) {
                name = 'c2-2';
            }
            if (fullPath.indexOf('/center/information') >= 0) {
                name = 'c3';
            }
            return name;
        },
        openNames() {
            let names = ['7'];
            const fullPath = (this.$route.fullPath || '').split('?')[0];
            if (fullPath.indexOf('/center') >= 0) {
                names = ['7', 'c2'];
            }
            return names;
        },
        settings() {
            return this.$route.matched.map((r) => {
                return (r.components.default.options ? r.components.default.options.settings : {});
            })[0] || {
                topBlue: true,
                withBackground: false
            };
        },
        isLogin() {
            return !(this.$store.state.me && this.$store.state.me.requireLogin);
        },
        user() {
            return this.$store.state.me && this.$store.state.me.user;
        },
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
            screenHeight: Constants.INDEX.SCREEN_HEIGHT
        })
    },
    mounted() {
        this.switchLayout(BN.isMobileLayout());
        this.layoutChangedHandle = this.layoutChanged;
        BN.addChangeLayoutListener(this.layoutChangedHandle);
        this.resizeScreenHandle = BN.addResizeListener(this.onResizeScreen);
    },
    beforeDestroy() {
        BN.removeChangeLayoutListener(this.layoutChangedHandle);
        this.resizeScreenHandle.apply();
    },
    methods: {
        onHome: function() {
            BNRouteHelper.center(this.$router);
        },
        onDropDown: function(e) {
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
        layoutChanged() {
            this.switchLayout(BN.isMobileLayout());
        },
        onResizeScreen(previousVP, currentVP) {
            this.resizeScreen(currentVP);
        },
        changeLang(lang) {
            this.switchLang(lang)
                .then(() => {
                    return BNRouteHelper.changeLocale(this.$router, lang);
                });
        },
        onMenuClick() {
            if (this.isMobileLayout) {
                this.menuOpen = false;
                this.$children[0].slideout.close();
            }
        },
        onClassificationMenuClick(classification, course) {
            console.log(classification, course);
            if (this.requireLogin) {
                this.$Message.error(this.$t('default.require_login'));
                return;
            }
            if (this.isMobileLayout) {
                this.$children[0].slideout.close();
            }
            if (classification.subjectName === this.$t('default.historic_test')) {
                this.selectCourse(course).then(() => {
                    BNRouteHelper.passExam(this.$router);
                });
            } else if (classification.subjectName === this.$t('default.person_analysis')) {
                this.selectCourse(course).then(() => {
                    this.getAnalyzeExercise().then((data) => {
                        if (data && data.is_completed) {
                            BNRouteHelper.analyzeResult(this.$router);
                        } else {
                            BNRouteHelper.analyzeTraining(this.$router);
                        }
                    }).catch((error) => {
                        this.$Message.error(error.message);
                    });
                });
            } else if (classification.subjectName === this.$t('default.knowledge')) {
                this.selectCourse(course).then(() => {
                    BNRouteHelper.topic(this.$router);
                });
            }
        },
        addClick: function () {
            document.querySelector('#panel').addEventListener('click', this.onMenuClick);
            document.querySelector('#panel').addEventListener('touchstart', this.onMenuClick, false);
            document.querySelector('#panel').addEventListener('scroll', this.onMenuClick);
        },
        removeClick: function () {
            document.querySelector('#panel').removeEventListener('click', this.onMenuClick);
            document.querySelector('#panel').removeEventListener('touchstart', this.onMenuClick, false);
            document.querySelector('#panel').removeEventListener('scroll', this.onMenuClick);
        },
        beforeOpen: function() {
            // this.menuOpen = true;
        },
        onceOpen: function () {
            this.$children[0].slideout._initTouchEvents();
        },
        open: function () {
            this.menuOpen = true;
            this.$children[0].slideout.enableTouch();
            // this.addClick();
        },
        beforeClose: function() {
            this.menuOpen = false;
        },
        close: function () {
            // this.removeClick();
            this.$children[0].slideout.disableTouch();
        },
        ...mapActions({
            switchLang: Constants.INDEX.SWITCH_LANG,
            switchLayout: Constants.INDEX.SWITCH_LAYOUT,
            login: Constants.ME.LOGIN,
            logout: Constants.ME.LOGOUT,
            selectCourse: Constants.ME.SELECT_COURSE,
            getAnalyzeExercise: Constants.PAPER.GET_ANALYZE_EXERCISE,
            resizeScreen: Constants.INDEX.RESIZE_SCREEN
        })
    }
};
</script>
<style>
    #sange .ivu-breadcrumb a,#sange .ivu-breadcrumb{
        color:#fff;
    }
</style>