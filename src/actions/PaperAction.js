/*
    习题练习Module的公共函数
 */
import Constants from '~/actions/Constants';
import BNActionHelper from '~/utils/BNActionHelper';
import BNTracking from '~/utils/BNTracking';

import BNConstants from '~/utils/BNConstants';
import BNUtils from '~/utils/BNUtils';
import BNService from '~/services/BNService';

// 获取习题集合
const getPaper = async (context, payload, type) => {
    let paperInfo;
    let course = BNUtils.readCookie(BNConstants.COOKIES.COURSE);
    switch (type) {
        case 'topic':
            paperInfo = await BNService.getTopicExercise(payload);
            break;
        case 'analyze':
            paperInfo = await BNService.getAnalyzeExercise(Object.assign({}, payload, { course }));
            break;
        case 'training':
            paperInfo = await BNService.getTrainingExercise(Object.assign({}, payload, { course }));
            break;
        case 'general':
            paperInfo = await BNService.getGeneralTrainingExercise(Object.assign({}, payload, { course }));
            break;
    }
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.GET_PAPER_MUTATION,
        paperInfo
    );
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_RESULT_MUTATION,
        paperInfo
    );
    return Promise.resolve(paperInfo);
};

// 提交习题答案
const submitExercise = async (context, payload, type) => {
    let paperInfo;
    switch (type) {
        case 'topic':
            paperInfo = await BNService.submitTopicAnswer(payload);
            break;
        case 'analyze':
            paperInfo = await BNService.submitAnalyzeExercise(payload);
            break;
        case 'training':
            paperInfo = await BNService.submitTrainingExercise(payload);
            break;
        case 'general':
            paperInfo = await BNService.submitGeneralTrainingExercise(payload);
            break;
    }
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.GET_PAPER_MUTATION,
        paperInfo
    );
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_RESULT_MUTATION,
        paperInfo
    );
    return Promise.resolve(paperInfo);
};
// 获取下一题信息
const nextExercise = async (context, payload, type) => {
    let paperInfo;
    switch (type) {
        case 'topic':
            paperInfo = await BNService.nextTopicExercise(payload);
            break;
        case 'analyze':
            paperInfo = await BNService.nextAnalyzeExercise(payload);
            break;
        case 'training':
            paperInfo = await BNService.nextTrainingExercise(payload);
            break;
        case 'general':
            paperInfo = await BNService.nextGeneralTrainingExercise(payload);
            break;
    }
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.GET_PAPER_MUTATION,
        paperInfo
    );
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_RESULT_MUTATION,
        paperInfo
    );
    return Promise.resolve(paperInfo);
};
// 完成习题练习
const finishExercise = async (context, payload, type) => {
    let paperInfo;
    switch (type) {
        case 'topic':
            paperInfo = await BNService.finishTopicExercise(payload);
            break;
        case 'analyze':
            paperInfo = await BNService.finishAnalyzeExercise(payload);
            break;
        case 'training':
            paperInfo = await BNService.finishTrainingExercise(payload);
            break;
        case 'general':
            paperInfo = await BNService.finishGeneralTrainingExercise(payload);
            break;
    }
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.GET_PAPER_MUTATION,
        paperInfo
    );
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_RESULT_MUTATION,
        paperInfo
    );
    return Promise.resolve(paperInfo);
};
// 忽略该习题
const skipExercise = async (context, payload, type) => {
    let paperInfo;
    switch (type) {
        case 'topic':
            paperInfo = await BNService.skipTopicExercise(payload);
            break;
    }
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.SKIP_PAPER_MUTATION,
        paperInfo
    );
    return Promise.resolve(paperInfo);
};

const clearPaperInfo = async (context) => {
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.GET_PAPER_MUTATION,
        {}
    );
    BNActionHelper.dispatchAction(
        context,
        Constants.PAPER.CHANGE_RESULT_MUTATION,
        {}
    );
    return Promise.resolve();
};

// 知识点学习做题相关操作函数
const getTopicPaper = (context, payload) => {
    return getPaper(context, payload, 'topic');
};
const submitTopicExercise = (context, payload) => {
    return submitExercise(context, payload, 'topic');
};
const nextTopicExercise = (context, payload) => {
    return nextExercise(context, payload, 'topic');
};
const skipTopicExercise = (context, payload) => {
    return skipExercise(context, payload, 'topic');
};
const finishTopicExercise = (context, payload) => {
    return finishExercise(context, payload, 'topic');
};
// 个人强弱分析做题相关操作函数
const getAnalyzeExercise = (context, payload) => {
    return getPaper(context, payload, 'analyze');
};
const submitAnalyzeExercise = (context, payload) => {
    return submitExercise(context, payload, 'analyze');
};
const nextAnalyzeExercise = (context, payload) => {
    return nextExercise(context, payload, 'analyze');
};
const finishAnalyzeExercise = (context, payload) => {
    return finishExercise(context, payload, 'analyze');
};
// 专项练习做题相关操作函数
const getTrainingExercise = (context, payload) => {
    return getPaper(context, payload, 'training');
};
const submitTrainingExercise = (context, payload) => {
    return submitExercise(context, payload, 'training');
};
const nextTrainingExercise = (context, payload) => {
    return nextExercise(context, payload, 'training');
};
const finishTrainingExercise = (context, payload) => {
    return finishExercise(context, payload, 'training');
};
// 总体提高练习做题相关操作函数
const getGeneralTrainingExercise = (context, payload) => {
    return getPaper(context, payload, 'general');
};
const submitGeneralTrainingExercise = (context, payload) => {
    return submitExercise(context, payload, 'general');
};
const nextGeneralTrainingExercise = (context, payload) => {
    return nextExercise(context, payload, 'general');
};
const finishGeneralTrainingExercise = (context, payload) => {
    return finishExercise(context, payload, 'general');
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
    getTopicPaper,
    submitTopicExercise,
    nextTopicExercise,
    skipTopicExercise,
    finishTopicExercise,

    getAnalyzeExercise,
    submitAnalyzeExercise,
    nextAnalyzeExercise,
    finishAnalyzeExercise,

    getTrainingExercise,
    submitTrainingExercise,
    nextTrainingExercise,
    finishTrainingExercise,

    getGeneralTrainingExercise,
    submitGeneralTrainingExercise,
    nextGeneralTrainingExercise,
    finishGeneralTrainingExercise,

    clearPaperInfo,

    collectExercise,
    cancelCollectExercise
};