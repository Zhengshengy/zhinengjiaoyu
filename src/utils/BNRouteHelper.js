/*
    VUE 路由模块 封装
*/
import BNUtils from '~/utils/BNUtils';
import BNConstants from '~/utils/BNConstants';

export default {
    pushWithName: function(router, name, query = {}) {
        const i18n = router.app && router.app.$i18n;
        if (i18n.locale === 'zh') {
            router.push({
                name: name,
                query: query
            });
        } else {
            router.push({
                name: `lang__${name}`,
                query: query
            });
        }
    },
    pushWithNameAndRole: function(router, name, role, query = {}) {
        role || (role = BNUtils.getUserRole()) || (role = BNConstants.USER_ROLE.STUDENT);
        if (!this._prefixes) {
            let prefixes = {};
            prefixes[BNConstants.USER_ROLE.STUDENT] = '';
            prefixes[BNConstants.USER_ROLE.TEACHER] = '';
            prefixes[BNConstants.USER_ROLE.PARENT] = '';
            prefixes[BNConstants.USER_ROLE.TEACHERINSHOOL] = '';
            this._prefixes = prefixes;
        }
        this.pushWithName(router, this._prefixes[role] + name, query);
    },
    refreshQuery(router, query) {
        router.replace({
            query
        });
    },
    saveLastPage(fullPath) {
        BNUtils.setKeyValue(BNConstants.COOKIES.LAST_PAGE, fullPath);
    },
    getLastPage() {
        return BNUtils.getKeyValue(BNConstants.COOKIES.LAST_PAGE);
    },
    clearLastPage() {
        return BNUtils.clearKeyValue(BNConstants.COOKIES.LAST_PAGE);
    },
    saveErrorMessage(message) {
        BNUtils.setKeyValue(BNConstants.COOKIES.ERROR_MESSAGE, message);
    },
    getErrorMessage() {
        return BNUtils.getKeyValue(BNConstants.COOKIES.ERROR_MESSAGE);
    },
    clearErrorMessage() {
        return BNUtils.clearKeyValue(BNConstants.COOKIES.ERROR_MESSAGE);
    },
    /**
     * Replace last occurrence of a string with another string
     * x - the initial string
     * y - string to replace
     * z - string that will replace
     */
    replaceLast(x, y, z) {
        const a = x.split('');
        const length = y.length;
        if (x.lastIndexOf(y) !== -1) {
            for (let i = x.lastIndexOf(y); i < x.lastIndexOf(y) + length; i++) {
                if (i === x.lastIndexOf(y)) {
                    a[i] = z;
                }
                else {
                    delete a[i];
                }
            }
        }
        return a.join('');
    },
    getLockScreenPath(fullPath, path, locale, defaultLocale) {
        return this.replaceLast(fullPath, path, `${locale === defaultLocale ? '/' : `/${locale}/`}lockscreen`);
    },
    getLoginScreenPath(fullPath, path, locale, defaultLocale) {
        return this.replaceLast(fullPath, path, `${locale === defaultLocale ? '/' : `/${locale}/`}home/login`);
    },
    home(router) {
        this.pushWithName(router, 'index');
    },
    lastPage(router) {
        const lastPage = this.getLastPage();
        this.clearLastPage();
        if (lastPage && lastPage.length > 0) {
            if (lastPage.indexOf('/client') < 0) {
                window.location.href = '/client' + lastPage;
            } else {
                window.location.href = lastPage;
            }
        } else {
            this.pushWithName(router, 'index');
        }
    },
    license(router) {
        this.pushWithName(router, 'license');
    },
    salesPolicy(router) {
        this.pushWithName(router, 'salesPolicy');
    },
    privacyPolicy(router) {
        this.pushWithName(router, 'privacyPolicy');
    },
    contactUs(router) {
        this.pushWithName(router, 'contactUs');
    },
    faq(router) {
        this.pushWithName(router, 'introduce-faq');
    },
    students(router) {
        this.pushWithName(router, 'introduce-students');
    },
    abilityAnalysis(router) {
        this.pushWithName(router, 'functions-abilityAnalysis');
    },
    dynamicTopic(router) {
        this.pushWithName(router, 'functions-dynamicTopic');
    },
    enhanceTraining(router) {
        this.pushWithName(router, 'functions-enhanceTraining');
    },
    examAbalysis(router) {
        this.pushWithName(router, 'functions-examAbalysis');
    },
    onlineTeachers(router) {
        this.pushWithName(router, 'functions-onlineTeacher');
    },
    offlineTeacher(router) {
        this.pushWithName(router, 'introduce-onlineTeacher');
    },
    onlineVideo(router) {
        this.pushWithName(router, 'functions-onlineVideo');
    },
    parent(router) {
        this.pushWithName(router, 'introduce-parent');
    },
    teacher(router) {
        this.pushWithName(router, 'introduce-teacher');
    },
    adultStudent(router) {
        this.pushWithName(router, 'introduce-adultStudent');
    },
    onlineTeacher(router) {
        this.pushWithName(router, 'introduce-onlineTeacher');
    },
    center(router) {
        let role = BNUtils.getUserRole()
        // if (role == 1   ) {
        //     this.pushWithNameAndRole(router, 'center');
        // } else if(role == 2){
        //     this.pushWithNameAndRole(router, 'center');
        // }
        //
        // else if (role == 4 || role==3) {
        //     this.pushWithNameAndRole(router, 'tutor');
        // }
        switch (role) {
            case 1:
                this.pushWithNameAndRole(router, 'center');
                break;
            case 2:
                this.pushWithNameAndRole(router, 'center');
                break;
            case 3:
                this.pushWithNameAndRole(router, 'tutor-course');
                break;
            case 4:
                this.pushWithNameAndRole(router, 'tutor-course');
                break;
        }
    },
    lock(router) {
        if (router) {
            this.saveLastPage(window.location.href);
            this.pushWithName(router, 'lockscreen');
        } else {
            if (BNUtils.getUserName()) {
                BNUtils.setKeyValue(BNConstants.COOKIES.LOCK, 1);
                if (window.location.href.indexOf('/lockscreen') < 0) {
                    this.saveLastPage(window.location.href);
                    window.location.href = this.getLockScreenPath(
                        window.location.href,
                        window.location.pathname.replace('/client/', '/'),
                        global.$i18n.locale,
                        global.$i18n.fallbackLocale);
                }
            }
        }
    },
    login(router, message = '') {
        if (router) {
            this.pushWithName(router, 'home-login');
        } else {
            if (window.location.href.indexOf('/login') < 0) {
                BNUtils.clearUserToken();
                this.saveErrorMessage(message);
                const loginPath = this.getLoginScreenPath(
                    window.location.href,
                    window.location.pathname.replace('/client/', '/'),
                    global.$i18n.locale,
                    global.$i18n.fallbackLocale);
                window.location.href = loginPath;
            }
        }
    },
    signUp(router) {
        this.pushWithName(router, 'home-signup');
    },
    video(router) {
        this.pushWithName(router, 'video');
    },
    password(router) {
        this.pushWithName(router, 'home-password');
    },
    passExam(router) {
        this.pushWithName(router, 'pastexam');
    },
    analyzeTraining(router, query) {
        this.pushWithName(router, 'analyze-training', query);
    },
    analyzeGeneralTraining(router, query) {
        this.pushWithName(router, 'analyze-general', query);
    },
    analyzeSpecialTraining(router, query) {
        this.pushWithName(router, 'analyze-special', query);
    },
    analyzeResult(router) {
        this.pushWithName(router, 'analyze-result');
    },
    analyze(router) {
        this.pushWithName(router, 'analyze');
    },
    topicShow(router, query) {
        this.pushWithName(router, 'viewTopic', query);
    },
    topicCheck(router, query) {
        this.pushWithName(router, 'topic-check', query);
    },
    topicExercise(router, query) {
        this.pushWithName(router, 'topic-exercise', query);
    },
    topic(router) {
        this.pushWithName(router, 'topic');
    },
    passStartExam(router, query) {
        this.pushWithName(router, 'pastexam-exam', query);
    },
    addTeacherTimetemp(router,query){
        this.pushWithName(router, 'tutor-subscribe', query);
    },
    redirectToLogin(store, redirect) {
        if (store.state.locale === 'zh') {
            redirect('/home/login');
        } else {
            redirect(`/${store.state.locale}/home/login`);
        }
    },
    changeLocale(router, lang) {
        const i18n = router.app && router.app.$i18n;
        const fullPath = (router.currentRoute && router.currentRoute.fullPath) || '';
        if (i18n.locale !== lang) {
            if (lang === 'zh') {
                let url = fullPath.replace(/^\/en+/, '');
                if (fullPath === '/en') {
                    url = '/';
                }
                router.push(url);
            } else {
                let url = fullPath.replace(/^\/+/, '/en/');
                router.push(url);
            }
            i18n.locale = lang;
        }
    },
};
