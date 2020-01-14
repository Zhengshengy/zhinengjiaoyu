/*
    网络访问请求模块
*/
import qs from 'qs';
import axios from '~/plugins/axios';
import BNTracking from '~/utils/BNTracking';
import BNUtils from '~/utils/BNUtils';
import BNRouteHelper from '~/utils/BNRouteHelper';

const prefix = '/api/';
const HTTP_VERBS = {
    post: 'post',
    get: 'get',
    put: 'put',
    delete: 'delete'
};

class BNError extends Error {
    constructor(code, message) {
        super(message); // (1)
        this.code = code;
    }
}

export function getAPIHeaders() {
    const headers = ({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json'
    });
    const auth = BNUtils.getUserToken();
    if (auth) {
        headers['Authorization'] = auth;
    }
    return headers;
}

export function getUploadHeaders() {
    const headers = ({
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
    });
    const auth = BNUtils.getUserToken();
    if (auth) {
        headers['Authorization'] = auth;
    }
    return headers;
}


function callAxios(url, type, data, options = {}) {
    let rv;
    let headers = getAPIHeaders();

    if (options.headers) {
        headers = Object.assign({}, headers, options.headers);
    }

    if (type === HTTP_VERBS.post) {
        rv = axios.post(prefix + url, data, { headers });
    }
    else if (type === HTTP_VERBS.put) {
        rv = axios.put(prefix + url, data, { headers });
    }
    else if (type === HTTP_VERBS.delete) {
        rv = axios.delete(prefix + url, { headers });
    }
    else if (type === HTTP_VERBS.get) {
        if (data && data.length > 0) {
            if (url.indexOf('?') > 0) {
                rv = axios.get(prefix + url + '&' + data, { headers });
            } else {
                rv = axios.get(prefix + url + '?' + data, { headers });
            }
        } else {
            rv = axios.get(prefix + url, { headers });
        }
    }
    return rv;
}

function callAPI(url, type, params, options = {}) {
    let data = params;
    if (!(typeof params === 'string' || params instanceof String)) {
        data = qs.stringify(params);
    }
    let responseCode = 200;
    return callAxios(url, type, data, options)
        .then((response) => {
            /* eslint-disable */
            if (response.status !== undefined) {
                responseCode = response.status;
            }
            if (responseCode == 200 && response.data) {
                if (response.data.c !== undefined) {
                    responseCode = response.data.c;
                }
            }
            /* eslint-enable */
            if (responseCode !== 200 && response.data) {
                let message;
                if (response.data.m && response.data.m.length > 0) {
                    message = response.data.m;
                } else {
                    message = global.$i18n.t(`codes.${responseCode}`);
                }
                if (responseCode === 103 && BNUtils.getUserName()) {
                    BNRouteHelper.lock();
                    return Promise.resolve();
                }
                if (responseCode === 105) {
                    BNRouteHelper.login(null, message);
                    return Promise.resolve();
                }
                return Promise.reject(Object.assign(
                    response.data.d,
                    { code: responseCode, message }
                ));
            }
            return Promise.resolve(Object.assign(
                (response.data && response.data.d) || {},
                { code: responseCode, message: response.data && response.data.m }
            ));
        }).catch((error) => {
            BNTracking.trackException(`Error on apiRequestHandler: ${url} / ${type} / ${error && error.response && error.response.status} / ${error && error.code} /${error && error.message}`);
            if (error && error.response) {
                console.log('Error response:', error.response);
                return Promise.reject(Object.assign(
                    error.response.data,
                    {
                        code: error.response.status
                    }
                ));
            } else if (error && error.code) {
                return Promise.reject(error);
            } else {
                return Promise.reject(new Error(error && error.message));
            }
        });
}

function filterParams(params, excepts = []) {
    excepts.map((except) => {
        delete params[except];
        return except;
    });
    return params;
}

const BNService = {
    login(name, password) {
        return callAPI('client/login', HTTP_VERBS.post, { name, password });
    },
    logout() {
        return callAPI('client/logout', HTTP_VERBS.post, { });
    },
    unLock(name, password) {
        return callAPI('client/login', HTTP_VERBS.post, { name, password });
    },
    register(name, email, password, password_confirmation , role) {
        return callAPI('client/register', HTTP_VERBS.post, { name, email, password, password_confirmation ,role});
    },
    forgetPassword(email) {
        return callAPI('client/forgot-password', HTTP_VERBS.post, { email });
    },
    verifyCode(email, code) {
        return callAPI('client/verify-code', HTTP_VERBS.post, { email, code });
    },
    newPassword(verify_code, email, password, password_confirmation) {
        return callAPI('client/forgot-password/reset', HTTP_VERBS.post, { verify_code, email, password, password_confirmation });
    },
    switchLang(lang) {
        return callAPI('lang/switch', HTTP_VERBS.post, { lang });
    },
    userInfo() {
        return callAPI('client/user', HTTP_VERBS.get);
    },
    teacherInfo() {
        return callAPI('v2/teacher/user', HTTP_VERBS.get);
    },
    saveUserInfo(userForm) {
        return callAPI('client/user', HTTP_VERBS.put, userForm);
    },
    saveTeacgerInfo(userForm) {
        return callAPI('v2/teacher/user', HTTP_VERBS.put, userForm);
    },
    userReality(course) {
        return callAPI('client/user/history-learn-reality', HTTP_VERBS.get, { course });
    },
    userKnowledge(course) {
        return callAPI('client/user/history-learn-topic', HTTP_VERBS.get, { course });
    },
    userAnalysis(course) {
        return callAPI('client/ability/analysis', HTTP_VERBS.get, { course });
    },
    getUserInfo(token) {
        if (token) {
            return callAPI('client/user/info', HTTP_VERBS.get, {}, { headers: { 'Authorization': token }});
        } else {
            return callAPI('client/user/info', HTTP_VERBS.get, {});
        }
    },
    getRealityPaper(course) {
        return callAPI('client/reality-paper', HTTP_VERBS.get, { course });
    },
    getExercise(filters) {
        return callAPI('client/reality/act', HTTP_VERBS.post, filterParams({ ...filters }, ['topic_id']));
    },
    getExerciseTopic(filters) {
        return callAPI('client/reality-topic/act', HTTP_VERBS.post, { ...filters });
    },
    skipExercise(filters) {
        return callAPI('client/exercise/feedback', HTTP_VERBS.post, filterParams({ ...filters }, ['topic_id']));
    },
    skipExerciseTopic(exerciseData) {
        return callAPI('client/exercise/feedback', HTTP_VERBS.post, { ...exerciseData });
    },
    nextExercise(filters) {
        return callAPI('client/reality/next', HTTP_VERBS.post, { id: filters.id });
    },
    nextExerciseTopic(filters) {
        return callAPI('client/reality-topic/next', HTTP_VERBS.post, { id: filters.id });
    },
    completeExercise(filters) {
        return callAPI('client/reality/complete', HTTP_VERBS.post, { id: filters.id });
    },
    completeExerciseTopic(filters) {
        return callAPI('client/reality-topic/complete', HTTP_VERBS.post, { id: filters.id });
    },
    submitAnswer(filters) {
        return callAPI('client/reality/answer', HTTP_VERBS.post, filterParams({ ...filters }, ['topic_id']));
    },
    submitAnswerTopic(exerciseData) {
        return callAPI('client/reality-topic/answer', HTTP_VERBS.post, { ...exerciseData });
    },
    viewTopicDetail(topicId) {
        return callAPI(`client/topic/${topicId}`, HTTP_VERBS.get);
    },
    submitFeedbackTopic(content) {
        return callAPI(`client/feedback/topic`, HTTP_VERBS.post, { ...content });
    },

    submitFeedbackExercise(content) {
        return callAPI(`client/feedback/exercise`, HTTP_VERBS.post, { ...content });
    },
    submitFeedbackSolution(content) {
        return callAPI(`client/feedback/solution`, HTTP_VERBS.post, { ...content });
    },
    getAnalyzeExercise(exerciseData) {
        return callAPI('client/ability/act', HTTP_VERBS.post, { ...exerciseData });
    },
    submitAnalyzeExercise(exerciseData) {
        return callAPI('client/ability/answer', HTTP_VERBS.post, { ...exerciseData });
    },
    nextAnalyzeExercise(filters) {
        return callAPI('client/ability/next', HTTP_VERBS.post, { id: filters.id });
    },
    finishAnalyzeExercise(filters) {
        return callAPI('client/ability/complete', HTTP_VERBS.post, { id: filters.id });
    },
    getAnalyzeResult(exerciseData) {
        return callAPI('client/ability/analysis', HTTP_VERBS.get, { ...exerciseData });
    },
    getTrainingExercise(exerciseData) {
        return callAPI('client/special-training/act', HTTP_VERBS.post, { ...exerciseData });
    },
    submitTrainingExercise(exerciseData) {
        return callAPI('client/special-training/answer', HTTP_VERBS.post, { ...exerciseData });
    },
    nextTrainingExercise(filters) {
        return callAPI('client/special-training/next', HTTP_VERBS.post, { id: filters.id });
    },
    finishTrainingExercise(filters) {
        return callAPI('client/special-training/complete', HTTP_VERBS.post, { id: filters.id });
    },
    getGeneralTrainingExercise(exerciseData) {
        return callAPI('client/general-training/act', HTTP_VERBS.post, { ...exerciseData });
    },
    submitGeneralTrainingExercise(exerciseData) {
        return callAPI('client/general-training/answer', HTTP_VERBS.post, { ...exerciseData });
    },
    nextGeneralTrainingExercise(filters) {
        return callAPI('client/general-training/next', HTTP_VERBS.post, { id: filters.id });
    },
    finishGeneralTrainingExercise(filters) {
        return callAPI('client/general-training/complete', HTTP_VERBS.post, { id: filters.id });
    },
    getTopics(data) {
        return callAPI('client/topic', HTTP_VERBS.get, { ...data });
    },
    getCurTopic(data) {
        return callAPI('client/learn-topic/act', HTTP_VERBS.post, { ...data });
    },
    getNextTopic(filters) {
        return callAPI('client/learn-topic/next', HTTP_VERBS.post, { id: filters.id });
    },
    getPrevTopic(data) {
        return callAPI('client/learn-topic/previous', HTTP_VERBS.post, { ...data });
    },
    getSkipTopic(data) {
        return callAPI('client/learn-topic/skip', HTTP_VERBS.post, { ...data });
    },
    getTopicExercise(data) {
        return callAPI('client/topic/act', HTTP_VERBS.post, { ...data });
    },
    submitTopicAnswer(data) {
        return callAPI('client/topic/answer', HTTP_VERBS.post, { ...data });
    },
    nextTopicExercise(filters) {
        return callAPI('client/topic/next', HTTP_VERBS.post, { id: filters.id });
    },
    finishTopicExercise(filters) {
        return callAPI('client/topic/complete', HTTP_VERBS.post, { id: filters.id });
    },
    skipTopicExercise(data) {
        return callAPI('client/learn-topic/feedback', HTTP_VERBS.post, { ...data });
    },
    learnRecord() {
        return callAPI('client/user/learn-record', HTTP_VERBS.get);
    },
    teacherTeams() {
        return callAPI('v2/teacher/team', HTTP_VERBS.get);
    },
    collectExercise(data) {
        return callAPI('v2/client/collection', HTTP_VERBS.post, { ...data });
    },
    cancelCollectExercise(data) {
        return callAPI('v2/client/collection/cancel', HTTP_VERBS.post, { ...data });
    },
    getClientMessage(data) {
        return callAPI('v3/client/notice', HTTP_VERBS.get, { page: data });
    },
    messageDelete(messageId) {
        return callAPI('v3/client/notice', HTTP_VERBS.post, { id: messageId });
    },
    teacherProfile(data) {
        return callAPI('v3/teacher/teacher-base', HTTP_VERBS.get, { ...data });
    },
    updateTeacherProfile(data) {
        return callAPI('v3/teacher/teacher-base', HTTP_VERBS.put, { ...data });
    },
    getCountry(data) {
        return callAPI('v3/teacher/teacher-base/country', HTTP_VERBS.get, { ...data });
    },
    getLanguage(data) {
        return callAPI('v3/teacher/teacher-base/language', HTTP_VERBS.get, { ...data });
    },
    getTeachwallet(data) {
        return callAPI('v3/teacher/teacher-wallet/profit', HTTP_VERBS.get, { ...data });
    },
    getTeachStat(data) {
        return callAPI('v3/teacher/teacher-wallet/counts', HTTP_VERBS.get, { ...data });
    },
    getTeachDetail(data) {
        return callAPI('v3/teacher/teacher-wallet/detail', HTTP_VERBS.post, { ...data });
    },
    getTcashOrder(data) {
        return callAPI('v3/teacher/teacher-wallet', HTTP_VERBS.get, { page: data });
    },
    postTcashOrder(data) {
        return callAPI('v3/teacher/teacher-wallet', HTTP_VERBS.post, { ...data });
    },
    getClientOrder(data) {
        return callAPI('v3/client/order-study', HTTP_VERBS.get, { page: data });
    },
    getTeacherTimetable(data) {
        return callAPI('v3/teacher/timetable', HTTP_VERBS.get, { ...data });
    },
    getOrderPackage(data) {
        return callAPI('v3/client/order-package', HTTP_VERBS.get, { page: data });
    },
    getClientWallet(data) {
        return callAPI('v3/client/wallet', HTTP_VERBS.get, { page: data });
    },
    getClientBalance(data) {
        return callAPI('v3/client/wallet/balance', HTTP_VERBS.get, { ...data });
    },
    getClientFreeze(data) {
        return callAPI('v3/client/order-study/freeze', HTTP_VERBS.get, { ...data });
    },
    getClientMealdosage(data) {
        return callAPI('v3/client/course-effect-duration', HTTP_VERBS.get, { ...data });
    },
    teacherPassword(data) {
        return callAPI('v3/teacher/password', HTTP_VERBS.put, { ...data });
    },
    getpaymentMethod(data) {
        return callAPI('v3/teacher/payment-method', HTTP_VERBS.get, { ...data });
    },
    paymentMethod(data) {
        return callAPI('v3/teacher/payment-method/method', HTTP_VERBS.get, { ...data });
    },
    paymentMethodPut(data) {
        return callAPI('v3/teacher/payment-method', HTTP_VERBS.put, { ...data });
    },
    getTeacherAuthentic(data) {
        return callAPI('v3/teacher/authentication', HTTP_VERBS.get, { ...data });
    },
    getTeacherExceptional(data) {
        return callAPI('v3/teacher/exceptional', HTTP_VERBS.get, { page: data });
    },
    getTeacherTimetemp(data) {
        return callAPI('v3/teacher/exceptional/timetemp', HTTP_VERBS.get, { ...data });
    },
    addTeacherTimetemp(data) {
        return callAPI('v3/teacher/exceptional', HTTP_VERBS.post, { ...data });
    },
    getTeacherMessage(data) {
        return callAPI('v3/teacher/notice', HTTP_VERBS.get, { page: data });
    },
    teacherMessageDelete(messageId) {
        return callAPI('v3/teacher/notice', HTTP_VERBS.post, { id: messageId });
    },
    getClassOrder(data) {
        return callAPI('v3/teacher/class-order', HTTP_VERBS.get, { page: data });
    },
    delTeacherTimetemp(data) {
        return callAPI('v3/teacher/exceptional/delete', HTTP_VERBS.get, { id: data });
    },
    editTeacherExceptional(data) {
        return callAPI('v3/teacher/exceptional/detail', HTTP_VERBS.get, { id: data });
    },
    putTeacherTimetemp(data) {
        return callAPI('v3/teacher/exceptional', HTTP_VERBS.put, { ...data });
    },
    getSubjects(data){
        return callAPI('v3/client/order-package/getsubjects', HTTP_VERBS.get, { ...data });
    },
    getCourseFees(data){
        return callAPI('v3/client/order-package/getcoursefees', HTTP_VERBS.get, { ...data });
    },
    postOrderPackage(data){
        return callAPI('v3/client/order-package', HTTP_VERBS.post, { ...data });
    },
    postTeacherTimetable(data) {
        return callAPI('v3/teacher/timetable', HTTP_VERBS.post, { ...data });
    },
    getTeacherCourse(data) {
        return callAPI('v3/client/teacher/course', HTTP_VERBS.get, { id : data });
    },
    getAppoin(id,time) {
        return callAPI(`v3/client/teacher/${id}?time=${time}`, HTTP_VERBS.get);
    },
    orderDelete(orderId) {
        return callAPI('v3/client/order-study/delete', HTTP_VERBS.get, { id: orderId });
    },
    getStudentGrade(val) {
        return callAPI('v3/client/grade', HTTP_VERBS.get, { course: val });
    },
    getGrade(val) {
        return callAPI('v3/teacher/subject/grade', HTTP_VERBS.get, { course: val });
    },
    getCourses(data){
        return callAPI('v3/teacher/subject', HTTP_VERBS.get, { ...data });
    },
    deleteCourses(data){
        return callAPI('v3/teacher/subject/delete', HTTP_VERBS.get, { id: data });
    },
    deleteExam(data){
        return callAPI('v3/teacher/exam/delete', HTTP_VERBS.get, { id: data });
    },
    postCourses(data){
        return callAPI('v3/teacher/subject', HTTP_VERBS.post, { ...data });
    },
    getExam(data){
        return callAPI('v3/teacher/exam', HTTP_VERBS.get, { ...data });
    },
    getAllExam(data){
        return callAPI('v3/teacher/exam/exam', HTTP_VERBS.get, { ...data });
    },
    getAllCourses(data){
        return callAPI('v3/client/subject', HTTP_VERBS.get, { ...data });
    },
    getClientGrade(data){
        return callAPI('v3/client/grade', HTTP_VERBS.get, { course: data });
    },
    getClientTeacherList(data) {
        return callAPI('v3/client/teacher', HTTP_VERBS.get, { ...data });
    },
    getTeacher(data){
        return callAPI('v3/client/teacher', HTTP_VERBS.get, { ...data });
    },
    getClientTeacherGrade(val, teacher_id) {
        return callAPI('v3/client/teacher/grade', HTTP_VERBS.get, { course: val, user_id: teacher_id });
    },
    delAuthentication(id) {
        return callAPI('v3/teacher/authentication/delete', HTTP_VERBS.get, { id:id });
    },
    getAmount(data) {
        return callAPI('v3/client/teacher/wallet', HTTP_VERBS.get, { ...data});
    },
    createOrder(data) {
        return callAPI('v3/client/order-study/createorder', HTTP_VERBS.post, { ...data});
    },
    createreview(data) {
        return callAPI('v3/client/order-study/createreview', HTTP_VERBS.post, { ...data});
    },
    noreview(data) {
        return callAPI('v3/client/order-study/noreview', HTTP_VERBS.post, { ...data});
    },
    getPaymethod(data) {
        return callAPI('v3/client/wallet/paymethod', HTTP_VERBS.get, { ...data});
    },
    postWallet(acc,pay) {
        return callAPI('v3/client/wallet', HTTP_VERBS.post, { 	amount:acc,pay_method:pay});
    },
    //支付
    getOrderStatus(data) {
        return callAPI(`client/order/show-status`, HTTP_VERBS.get, { ...data });
    },
    putPackage(id) {
        return callAPI(`v3/client/order-package/${id}`, HTTP_VERBS.put);
    },
    delPackage(id) {
        return callAPI(`v3/client/order-package/delete`, HTTP_VERBS.get,{id: id});
    },
    //电子白板
    getSign(data) {
        return callAPI(`v3/teacher/ask-queue/sign`, HTTP_VERBS.get, { ...data });
    },
    getTeacherBase(data) {
        return callAPI(`v3/teacher/teacher-base/detail`, HTTP_VERBS.get, { ...data });
    },
    getAskfind(data) {
        return callAPI(`v3/client/ask/find`, HTTP_VERBS.post, { ...data });
    },
    delAskqueue(data) {
        return callAPI(`v3/teacher/ask-queue/delete`, HTTP_VERBS.get, { ...data });
    },
    createQueue(data) {
        return callAPI(`v3/teacher/ask-queue/create`, HTTP_VERBS.get, { ...data });
    },
    createAsk(data) {
        return callAPI(`v3/client/ask/create`, HTTP_VERBS.post, { ...data });
    },
    updateAsk(data) {
        return callAPI(`v3/client/ask`, HTTP_VERBS.put, { ...data });
    },
    postUpdate(data) {
        return callAPI(`v3/client/ask/update`, HTTP_VERBS.post, { ...data });
    },
    getTimetable(data) {
        return callAPI(`v3/client/teacher/timetable-temp`, HTTP_VERBS.get, { ...data });
    },
    askStore(data) {
        return callAPI(`v3/client/ask/store`, HTTP_VERBS.post, { ...data });
    },
    askSuccess(data) {
        return callAPI(`v3/teacher/ask-success`, HTTP_VERBS.get, { ...data });
    },
    postUploaddate(data){
        return callAPI(`v3/teacher/teacher-base/loaddate`, HTTP_VERBS.post, { ...data });
    },
    getTeaching(data){
        return callAPI(`v3/teacher/online/online`, HTTP_VERBS.get, { order_id: data });
    },
    getDetail(data){
        return callAPI(`v3/client/ask/room`, HTTP_VERBS.get, { id: data });
    },
    getpay(data){
        return callAPI(`v3/client/order-study/pay`, HTTP_VERBS.get, { order_id: data });
    },
    getStusign(data){
        return callAPI(`v3/client/ask/sign`, HTTP_VERBS.get, { ... data });
    },
    getValidate(data){
        return callAPI(`v3/teacher/teacher-base/valid`, HTTP_VERBS.get, { ... data });
    },
    getTextImg(id,type){
        return callAPI(`v3/client/ask/exercise`, HTTP_VERBS.get, { id: id,type:type });
    },
    getTeacherTextImg(data){
        return callAPI(`v3/teacher/ask-queue/exercise`, HTTP_VERBS.get, { ...data });
    },
    getTeacherPayment(data){
        return callAPI(`v3/teacher/payment-method/status`, HTTP_VERBS.get, { ...data });
    },
    getAskqueueLength(data){
        return callAPI(`v3/teacher/ask-queue/length`, HTTP_VERBS.get, { id:data });
    },
    getstatus(data){
        return callAPI(`v3/teacher/ask-queue/status`, HTTP_VERBS.get, { ...data });
    },
};

export default BNService;
