/*
    习题显示管理做题Module
*/
import Constants from '~/actions/Constants';
import PaperAction from '~/actions/PaperAction';
import PaperMutation from '~/actions/PaperMutation';

export const state = () => ({
    resultState: false,
    paperInfo: {
        active_number: 1,
        total: 50,
        exercise: {
            type_id: 1
        },
        ability: {
            level: '0'
        },
        topic: {
            name: '',
            total: 20
        }
    },
    feedbackType: '',
    feedbackHostId: '',
});
export const getters = {
    paperInfo: (state) => state.paperInfo,
    resultState: (state) => state.resultState,
    feedbackType: (state) => state.feedbackType,
    feedbackHostId: (state) => state.feedbackHostId,
};
export const mutations = {
    mutation_getPaper: (state, payload) => (
        PaperMutation.mutation(state, {
            type: Constants.PAPER.GET_PAPER_MUTATION,
            payload
        })
    ),
    mutation_skipPaper: (state, payload) => (
        PaperMutation.mutation(state, {
            type: Constants.PAPER.SKIP_PAPER_MUTATION,
            payload
        })
    ),
    mutation_changeResult: (state, payload) => (
        PaperMutation.mutation(state, {
            type: Constants.PAPER.CHANGE_RESULT_MUTATION,
            payload
        })
    ),
    mutation_viewAnswer: (state, payload) => (
        PaperMutation.mutation(state, {
            type: Constants.PAPER.VIEW_ANSWER_MUTATION,
            payload
        })
    ),
    mutation_changeExerciseCollect: (state, payload) => (
        PaperMutation.mutation(state, {
            type: Constants.PAPER.CHANGE_EXERCISE_COLLECT,
            payload
        })
    )
};

export const actions = {
    // topic
    getTopicPaper: PaperAction.getTopicPaper,
    submitTopicExercise: PaperAction.submitTopicExercise,
    nextTopicExercise: PaperAction.nextTopicExercise,
    skipTopicExercise: PaperAction.skipTopicExercise,
    finishTopicExercise: PaperAction.finishTopicExercise,
    // analyze
    getAnalyzeExercise: PaperAction.getAnalyzeExercise,
    submitAnalyzeExercise: PaperAction.submitAnalyzeExercise,
    nextAnalyzeExercise: PaperAction.nextAnalyzeExercise,
    finishAnalyzeExercise: PaperAction.finishAnalyzeExercise,
    // training
    getTrainingExercise: PaperAction.getTrainingExercise,
    submitTrainingExercise: PaperAction.submitTrainingExercise,
    nextTrainingExercise: PaperAction.nextTrainingExercise,
    finishTrainingExercise: PaperAction.finishTrainingExercise,
    // general
    getGeneralTrainingExercise: PaperAction.getGeneralTrainingExercise,
    submitGeneralTrainingExercise: PaperAction.submitGeneralTrainingExercise,
    nextGeneralTrainingExercise: PaperAction.nextGeneralTrainingExercise,
    finishGeneralTrainingExercise: PaperAction.finishGeneralTrainingExercise,

    clearPaperInfo: PaperAction.clearPaperInfo,

    collectExercise: PaperAction.collectExercise,
    cancelCollectExercise: PaperAction.cancelCollectExercise
};
