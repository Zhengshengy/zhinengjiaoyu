/*
    历史真题Module
*/
import Constants from '~/actions/Constants';
import ExamAction from '~/actions/ExamAction';
import ExamMutation from '~/actions/ExamMutation';

export const state = () => ({
    testInfo: {
        id: null
    },
    topicId: null,
    paper: {
        name: '',
        total: '',
        current: ''
    },
    exercise: {
        url: '',
        type_id: 1,
    },
    feedbackState: 0,   // 1 展示 0 不展示
    feedbackType: '',
    feedbackHostId: '',
    resultState: false, // true 展示结果 false 答题状态
    result: {
        result: true,
        error: 0,
        correct: 0,
        gain: 0,
        total: 100
    }
});

export const getters = {
    testInfo(state) {
        return state.testInfo;
    },
    paper(state) {
        return state.paper;
    },
    exercise(state) {
        return state.exercise;
    },
    feedbackState(state) {
        return state.feedbackState;
    },
    feedbackType(state) {
        return state.feedbackType;
    },
    feedbackHostId(state) {
        return state.feedbackHostId;
    },
    resultState(state) {
        return state.resultState;
    },
    result(state) {
        return state.result;
    }
};

export const mutations = {
    mutation_getPaperExersise: (state, payload) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.GET_PAPER_EXERCISE_MUTATION,
            payload
        })
    ),
    mutation_changeFeedbackState: (state, payload) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.CHANGE_FEEDBACK_STATE_MUTATION,
            payload
        })
    ),
    mutation_changeResult: (state, payload) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.CHANGE_RESULT_MUTATION,
            payload
        })
    ),
    mutation_skipExercise: (state, payload) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.SKIP_EXERCISE_MUTATION,
            payload
        })
    ),
    mutation_startExercise: (state, payload) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.START_EXERCISE_MUTATION,
            payload
        })
    ),
    mutation_viewAnswer: (state) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.VIEW_ANSWER_MUTATION
        })
    ),
    mutation_changeExerciseCollect: (state, payload) => (
        ExamMutation.mutation(state, {
            type: Constants.EXAM.CHANGE_EXERCISE_COLLECT,
            payload
        })
    )
};

export const actions = {
    startTest: ExamAction.startTest,
    getPaperExercise: ExamAction.getPaperExercise,
    submitAnswer: ExamAction.submitAnswer,
    skipExercise: ExamAction.skipExercise,
    nextExercise: ExamAction.nextExercise,
    finishExercise: ExamAction.finishExercise,
    submitFeedback: ExamAction.submitFeedback,
    viewAnswer: ExamAction.viewAnswer,
    collectExercise: ExamAction.collectExercise,
    cancelCollectExercise: ExamAction.cancelCollectExercise
};