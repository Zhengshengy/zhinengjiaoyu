/*
    历史真题学习模块 Action 列表
 */
import Constants from '~/actions/Constants';
import BNActionHelper from '~/utils/BNActionHelper';
import BNTracking from '~/utils/BNTracking';

import BNConstants from '~/utils/BNConstants';
import BNUtils from '~/utils/BNUtils';
import BNService from '~/services/BNService';

// 获取真题
const getPaperExercise = async (context, payload) => {
    try {
        const course = BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        const filters = Object.assign({}, { course }, payload);
        let res;
        if (payload.topic_id > 0) {
            res = await BNService.getExerciseTopic(filters);
        } else {
            res = await BNService.getExercise(filters);
        }
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.GET_PAPER_EXERCISE_MUTATION,
            res
        );
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.CHANGE_RESULT_MUTATION,
            res
        );
    } catch (error) {
        BNTracking.trackException(error);
    }
};
// 提交答案
const submitAnswer = async (context, payload) => {
    try {
        let res;
        if (payload.topic_id > 0) {
            res = await BNService.submitAnswerTopic(payload);
        } else {
            res = await BNService.submitAnswer(payload);
        }
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.CHANGE_RESULT_MUTATION,
            res
        );
    } catch (error) {
        BNTracking.trackException(error);
    }
};
// 忽略习题
const skipExercise = async (context, payload) => {
    try {
        let res;
        if (payload.topic_id > 0) {
            res = await BNService.skipExerciseTopic(payload);
        } else {
            res = await BNService.skipExercise(payload);
        }
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.SKIP_EXERCISE_MUTATION,
            res);
    } catch (error) {
        BNTracking.trackException(error);
    }
};
// 下一题
const nextExercise = async (context, payload) => {
    try {
        let res;
        if (payload.topic_id > 0) {
            res = await BNService.nextExerciseTopic(payload);
        } else {
            res = await BNService.nextExercise(payload);
        }
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.GET_PAPER_EXERCISE_MUTATION,
            res);
    } catch (error) {
        BNTracking.trackException(error);
    }
};
// 完成习题考试
const finishExercise = async (context, payload) => {
    try {
        let res;
        if (payload.topic_id > 0) {
            res = await BNService.completeExerciseTopic(payload);
        } else {
            res = await BNService.completeExercise(payload);
        }
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.GET_PAPER_EXERCISE_MUTATION,
            res);
        return Promise.resolve(res);
    } catch (error) {
        BNTracking.trackException(error);
    }
};
// 提交反馈
const submitFeedback = async (context, payload) => {
    try {
        let res;
        if (payload.type === 'topic') {
            res = await BNService.submitFeedbackTopic({ id: payload.id, content: payload.content });
        } else if (payload.type === 'solution') {
            res = await BNService.submitFeedbackSolution({ id: payload.id, content: payload.content });
        } else {
            res = await BNService.submitFeedbackExercise({ id: payload.id, content: payload.content });
        }
        BNActionHelper.dispatchAction(
            context,
            Constants.EXAM.CHANGE_FEEDBACK_STATE_MUTATION,
            0
        );
    } catch (error) {
        BNTracking.trackException(error);
    }
};
// 开始测试
function startTest(context, select) {
    BNUtils.createCookie(BNConstants.COOKIES.COURSE, select.course, 3600);
    BNUtils.createCookie(BNConstants.COOKIES.TOPIC, select.topic, 3600);
    BNUtils.createCookie(BNConstants.COOKIES.PAPER, select.paper, 3600);
    BNActionHelper.dispatchAction(
        context,
        Constants.EXAM.START_EXERCISE_MUTATION,
        select
    );
    return Promise.resolve(select);
}
// 查看答案
const viewAnswer = (context) => {
    BNActionHelper.dispatchAction(
        context,
        Constants.EXAM.VIEW_ANSWER_MUTATION);
};

const collectExercise = async (context, payload) => {
    let res = await BNService.collectExercise(payload);
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_EXERCISE_COLLECT,
        1
    );
    return Promise.resolve(res);
};

const cancelCollectExercise = async (context, payload) => {
    let res = await BNService.cancelCollectExercise(payload);
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_EXERCISE_COLLECT,
        0
    );
    return Promise.resolve(res);
};

export default {
    startTest,
    getPaperExercise,
    submitAnswer,
    skipExercise,
    nextExercise,
    finishExercise,
    submitFeedback,
    viewAnswer,
    collectExercise,
    cancelCollectExercise
};