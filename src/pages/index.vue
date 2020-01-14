<!--Created by Bamboo on 2018/8/16.-->
<template>
    <div class="v3_main">
        <div class="section section1" :style="section1Style">
            <Row>
                <div class="v3_menu flex flex-h">
                    <div class="flex-1 flex flex-h">
                        <div class="v3_menuItem v3_menuItemLogo">{{$t('links.site_name')}}</div>
                        <div class="v3_menuItem">
                            <Dropdown product-introduce placement="bottom-start" trigger="click" :visible="productIntroduceVisible">
                                <a href="javascript:void(0)" @click="handleProductIntroduceOpen" class="label">
                                    {{$t('home.menu.product_introduce.caption')}}
                                </a>
                                <DropdownMenu slot="list">
                                    <template>
                                        <ul class="ivu-dropdown-menu" style="width: 200px;">
                                            <li v-for="submenue in product_introduce.submenus"
                                                submenu
                                                class="ivu-dropdown-item"
                                                style="font-size: 14px!important;float:left;display: inline;"
                                                @click="onClickProductIntroduce(submenue, submenue.value)"
                                            >{{submenue.name}}
                                            </li>
                                        </ul>
                                    </template>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="v3_menuItem">
                            <Dropdown function placement="bottom-start" trigger="click" @on-click="functions">
                                <a href="javascript:void(0)">
                                    {{ $t('home.menu.function.caption') }}
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="analysis">{{ $t('home.menu.function.sub.ability_analysis') }}</DropdownItem>
                                    <DropdownItem name="topic">{{ $t('home.menu.function.sub.dynamic_topic') }}</DropdownItem>
                                    <DropdownItem name="training">{{ $t('home.menu.function.sub.enhance_training') }}</DropdownItem>
                                    <DropdownItem name="examAnlysis">{{ $t('home.menu.function.sub.post_exam_analysis') }}</DropdownItem>
                                    <DropdownItem name="teacher">{{ $t('home.menu.function.sub.online_teacher') }}</DropdownItem>
                                    <DropdownItem name="offlineTeacher">{{ $t('home.menu.function.sub.offline_teacher') }}</DropdownItem>
                                    <DropdownItem name="videoExam">{{ $t('home.menu.function.sub.online_video_exam') }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="v3_menuItem">
                            <Dropdown product-introduce placement="bottom-start" trigger="click" :visible="subjectVisible">
                                <a href="javascript:void(0)" @click="handleSubjectOpen" class="label">
                                    {{$t('home.menu.subject.caption')}}
                                </a>
                                <DropdownMenu slot="list">
                                    <template v-for=" group in subject_group">
                                        <div class="ivu-dropdown-item" style="font-size: 14px!important;">{{group.name}}</div>
                                        <ul class="ivu-dropdown-menu" style="width: 260px;padding-left: 16px;">
                                            <li class="ivu-dropdown-item"
                                                style="font-size: 14px!important;float:left;display: inline;"
                                                v-for="subject in group.subjects"
                                                @click="onClassificationMenuClick(group, subject.value)"
                                            >{{subject.subject}}</li>
                                        </ul>
                                    </template>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="flex flex-h">
                        <template v-if="requireLogin">
                            <div class="v3_menuItem" @click="onFaq">{{$t('home.menu.faq')}}</div>
                            <div class="v3_menuItem" @click="onLogin">{{$t('links.login')}}</div>
                        </template>
                        <template v-else>
                            <div class="v3_menuItem" @click="onHome">{{$t('default.home')}}</div>
                            <div class="v3_menuItem" @click="onLogout">{{$t('default.logout')}}</div>
                            <!--<div class="v3_menuItem">{{$t('home.menu.faq')}}</div>-->
                            <!--<div class="v3_menuItem">{{$t('links.login')}}</div>-->
                        </template>
                    </div>
                </div>
            </Row>
            <div class="v3_system_tip">
                人&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                工&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                智&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                能&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                教&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                育&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                系&nbsp;<span class="ivu-badge-status-dot" style="background-color: white"></span>
                统
            </div>
        </div>
        <div class="section section2 flex flex-v" :style="section2Style">
            <div class="v3_functions">
                <div title class="flex flex-v flex-pack-center">
                    <div style="text-align: center;">{{ $t('default.what_can_we_do') }}</div>
                </div>
                <div buttons class="flex flex-h flex-pack-center" v-if="!isMobileLayout">
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do1') }}</span></button>
                    </div>
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do2') }}</span></button>
                    </div>
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do3') }}</span></button>
                    </div>
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do4') }}</span></button>
                    </div>
                </div>
                <div buttons class="flex flex-h flex-pack-center" v-if="isMobileLayout">
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do1') }}</span></button>
                    </div>
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do2') }}</span></button>
                    </div>
                </div>
                <div buttons class="flex flex-h flex-pack-center" v-if="isMobileLayout" style="margin-top: 1%">
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do3') }}</span></button>
                    </div>
                    <div button>
                        <button type="button" class="ivu-btn ivu-btn-circle ivu-btn-ghost"><span>{{ $t('default.we_can_do4') }}</span></button>
                    </div>
                </div>
            </div>
            <div class="v3_abstract flex-1 flex flex-v flex-pack-center">
                <div>
                    <p>
                        <span class="ivu-badge-status-dot" style="background-color: white"></span>&nbsp;&nbsp;大班教育难以提供个性化教育的。<br />比如：一名六年级的学生想自主学习初中的知识。<br />又比如：一名基础薄弱的初三学生想通过系统化学习来奋力一搏。<br />对此，一对一的个性化教育是有必要的。
                    </p>
                    <p>
                        <span class="ivu-badge-status-dot" style="background-color: white"></span>&nbsp;&nbsp;本人工智能学习系统可以记住学生的学习过程。当学生做错题目了，本人工智能会知道学生不懂哪个知识点或哪些知识点比较薄弱，然后人工智能就会强化这方面的知识点；对于做对的题，人工智能就不会浪费学生时间去学他的强项。从而学生可以利用碎片化的时间强化自己的弱点，使基本功得到强化，成绩有质的飞跃。
                    </p>
                    <p>
                        一般学生使用本人工智能教育系统，就会自学成功。但可能在某一个知识点或某道题，实在是无法理解，那么学生可以在线或在我们的实体店咨询我们的辅导老师。
                    </p>
                </div>
            </div>
        </div>
        <div class="section section3" :style="section2Style">
            <div video>
                <div left>
                    <div how-to-use class="flex flex-h flex-align-center">
                        <div class="flex flex-v flex-align-center" style="width: 100%">
                            <div>
                                {{ $t('default.how_to_use') }}<br />
                                <button
                                        type="button"
                                        class="ivu-btn ivu-btn-circle ivu-btn-ghost"
                                        @click="onShowVideo"
                                >
                                    <span>{{ $t('default.play') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div right @click="onShowVideo"></div>
            </div>
            <div footer>
                <div links>
                    <span @click="salesPolicy">{{ $t('default.business_policy') }}</span>
                    <span @click="onLicense">{{ $t('default.license') }}</span>
                    <span @click="privacyPolicy">{{ $t('default.secret_policy') }}</span>
                    <span> <a style="color:#fff;" href="http://www.studymindfully.com/recruit.html"> {{ $t('default.offers') }}</a></span>
                    <span @click="contactUs">{{ $t('default.contact_us') }}</span>
                </div>
                <div copyright>{{ $t('default.copyright') }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Constants from '~/actions/Constants';
    import BNConstants from '~/utils/BNConstants';
    import BNRouteHelper from '~/utils/BNRouteHelper';
    import { mapGetters, mapActions } from 'vuex';
    import '~/assets/styles/home/v3.scss';
    import { Dropdown, DropdownMenu, DropdownItem } from 'iview';

    export default {
        layout: 'blank',
        components: {
            Dropdown,
            DropdownMenu,
            DropdownItem
        },
        data () {
            return {
                productIntroduceVisible: false,
                subjectVisible: false,
                functionVisible: false,
                product_introduce: {
                    submenus: [
                        {
                            name: this.$t('home.menu.product_introduce.sub.student')
                        },
                        {
                            name: this.$t('home.menu.product_introduce.sub.parent')
                        },
                        {
                            name: this.$t('home.menu.product_introduce.sub.teacher')
                        },
                        {
                            name: this.$t('home.menu.product_introduce.sub.adult_student')
                        },
                        {
                            name: this.$t('home.menu.product_introduce.sub.online_teacher')
                        }
                    ]
                },
                subject_group: [
                    {
                        name: this.$t('home.menu.subject.sub.analysis.caption'),
                        subjects: [
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.M'),
                                value: BNConstants.COURSE.MATH
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.P'),
                                value: BNConstants.COURSE.PHYSICS
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.C'),
                                value: BNConstants.COURSE.CHEMISTRY
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.B'),
                                value: BNConstants.COURSE.BIOLOGY
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.E'),
                                value: BNConstants.COURSE.ENGLISH
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.T'),
                                value: BNConstants.COURSE.TOEFL
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.S'),
                                value: BNConstants.COURSE.SAT
                            }
                        ]
                    },
                    {
                        name: this.$t('home.menu.subject.sub.postexam.caption'),
                        subjects: [
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.M'),
                                value: BNConstants.COURSE.MATH
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.P'),
                                value: BNConstants.COURSE.PHYSICS
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.C'),
                                value: BNConstants.COURSE.CHEMISTRY
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.B'),
                                value: BNConstants.COURSE.BIOLOGY
                            }
                        ]
                    },
                    {
                        name: this.$t('home.menu.subject.sub.topic.caption'),
                        subjects: [
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.M'),
                                value: BNConstants.COURSE.MATH
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.P'),
                                value: BNConstants.COURSE.PHYSICS
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.C'),
                                value: BNConstants.COURSE.CHEMISTRY
                            },
                            {
                                subject: this.$t('home.menu.subject.sub.analysis.sub.B'),
                                value: BNConstants.COURSE.BIOLOGY
                            }
                        ]
                    }
                ]
            }
        },
        mounted() {
            this.resizeScreenHandle = BN.addResizeListener(this.onResizeScreen);
        },
        beforeDestroy() {
            this.resizeScreenHandle && this.resizeScreenHandle.apply();
        },
        computed: {
            section1Style () {
                // if (this.isMobileLayout) {
                //     return `height: ${this.screenWidth * 1143 / 1600}px;`;
                // }
                return `height: 100%`;
            },
            section2Style () {
                // if (this.isMobileLayout) {
                //     return `height: ${this.screenWidth * 938 / 1600}px;`;
                // }
                return `height: 100%`;
            },
            section3Style () {
                // if (this.isMobileLayout) {
                //     return `height: ${this.screenWidth * 1600 / 1600}px;`;
                // }
                return `height: 100%`;
            },
            ...mapGetters({
                isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
                screenWidth: Constants.INDEX.SCREEN_WIDTH,
                requireLogin: Constants.ME.REQUIRE_LOGIN,
                user: Constants.ME.USER
            })
        },
        methods: {
            ...mapActions({
                logout: Constants.ME.LOGOUT,
                resizeScreen: Constants.INDEX.RESIZE_SCREEN,
                selectCourse: Constants.ME.SELECT_COURSE,
                getAnalyzeExercise: Constants.PAPER.GET_ANALYZE_EXERCISE
            }),
            onResizeScreen(previousVP, currentVP) {
                this.resizeScreen(currentVP);
            },
            handleProductIntroduceOpen () {
                this.productIntroduceVisible = true;
            },
            handleSubjectOpen () {
                this.subjectVisible = true;
            },
            functions: function(e) {
                if (e === 'analysis') {
                    BNRouteHelper.abilityAnalysis(this.$router);
                } else if (e === 'topic') {
                        BNRouteHelper.dynamicTopic(this.$router);
                } else if (e === 'training') {
                    BNRouteHelper.enhanceTraining(this.$router);
                }else if (e === 'examAnlysis') {
                    BNRouteHelper.examAbalysis(this.$router);
                }else if (e === 'teacher') {
                    BNRouteHelper.onlineTeachers(this.$router);
                }else if (e === 'offlineTeachers') {
                    BNRouteHelper.offlineTeacher(this.$router);
                }else if (e === 'videoExam') {
                    BNRouteHelper.onlineVideo(this.$router);
                }
            },
            handleFunctionOpen () {
                this.functionVisible = true;
            },
            onLogin () {
                BNRouteHelper.login(this.$router);
            },
            onHome() {
                BNRouteHelper.center(this.$router);
            },
            onLogout() {
                this.logout().then(() => {
                    // BNRouteHelper.home(this.$router);
                    location.reload();
                });
            },
            onLicense() {
                BNRouteHelper.license(this.$router);
            },
            salesPolicy(){
                BNRouteHelper.salesPolicy(this.$router);
            },
            privacyPolicy(){
                BNRouteHelper.privacyPolicy(this.$router);
            },
            contactUs(){
                BNRouteHelper.contactUs(this.$router);
            },
            // offers(){
            //
            // },
            onShowVideo() {
                BNRouteHelper.video(this.$router);
            },
            onClickProductIntroduce(classification,introduce) {
                this.productIntroduceVisible = false;

                if (classification.name === this.$t('home.menu.product_introduce.sub.student')) {
                    BNRouteHelper.students(this.$router);
                }else if (classification.name === this.$t('home.menu.product_introduce.sub.parent')) {
                    BNRouteHelper.parent(this.$router);
                }else if (classification.name === this.$t('home.menu.product_introduce.sub.teacher')) {
                    BNRouteHelper.onlineTeacher(this.$router);
                }else if (classification.name === this.$t('home.menu.product_introduce.sub.adult_student')) {
                    BNRouteHelper.adultStudent(this.$router);
                }else if (classification.name === this.$t('home.menu.product_introduce.sub.online_teacher')) {
                    BNRouteHelper.teacher(this.$router);
                }
            },
            onFaq(){
                BNRouteHelper.faq(this.$router);
            },
            onClassificationMenuClick(classification, course) {
                this.subjectVisible = false;

                if (this.requireLogin) {
                    this.$Message.error(this.$t('default.require_login'));
                    return;
                }
                if (classification.name === this.$t('home.menu.subject.sub.postexam.caption')) {
                    this.selectCourse(course).then(() => {
                        BNRouteHelper.passExam(this.$router);
                    });
                } else if (classification.name === this.$t('home.menu.subject.sub.analysis.caption')) {
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
                } else if (classification.name === this.$t('home.menu.subject.sub.topic.caption')) {
                    this.selectCourse(course).then(() => {
                        BNRouteHelper.topic(this.$router);
                    });
                }
            }
        }
    };
</script>