/*
    历史真题学习相关的Mutation，Mutation表示同步的状态变更函数
 */
import Vue from 'vue';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';

function mutation(state, action) {
    let additional = {};
    let sameExercise = false;
    let skipped = false;
    let newExercise = {};
    switch (action.type) {
        case Constants.EXAM.GET_PAPER_EXERCISE_MUTATION:
            if (BNUtils.isArray(action.payload.exercise)) {
                if (action.payload.exercise.length > 0) {
                    newExercise = action.payload.exercise[0];
                } else {
                    newExercise = {};
                }
            } else {
                newExercise = action.payload.exercise;
            }
            sameExercise = state.exercise && newExercise && (state.exercise.id === newExercise.id);
            skipped = sameExercise && state.exercise && state.exercise.skipped;

            state.exercise = newExercise;
            state.exercise.current_url = state.exercise.url;
            state.exercise.images = BNUtils.buildExerciseImages(state.exercise.url + '/q', state.exercise.q_image_count);
            state.exercise.answer_url = state.exercise.url + '/a';

            if (skipped) {
                state.exercise.skipped = skipped;
            }
            if (action.payload.answer) {
                state.resultState = true;
                state.result = action.payload;
            } else {
                state.resultState = false;
                state.result = {};
            }

            state.paper = action.payload.paper || {};
            state.paper.current = action.payload.active_number;
            additional = (state.topicId > 0 ? action.payload.topic : action.payload.paper) || {};
            state.testInfo = {
                id: action.payload.id,
                active_number: action.payload.active_number,
                answer: action.payload.answer,
                category_id: action.payload.category_id,
                complete_at: action.payload.complete_at,
                correct: action.payload.correct,
                done: action.payload.done,
                error: action.payload.error,
                gain: action.payload.gain,
                is_completed: action.payload.is_completed,
                topic: action.payload.topic,
                name: additional.name,
                total: additional.total,
                score: additional.score,
                current: action.payload.active_number
            };
            state.feedbackType = 'exercise';
            state.feedbackHostId = state.exercise.id;
            return state;
        case Constants.EXAM.CHANGE_FEEDBACK_STATE_MUTATION:
            if (action.payload === true) {
                if (state.feedbackState !== 1) {
                    state.feedbackState = 1;
                    state.feedback = '';
                }
            } else {
                if (state.feedbackState !== action.payload) {
                    state.feedbackState = action.payload;
                    state.feedback = '';
                }
            }
            return state;
        case Constants.EXAM.CHANGE_RESULT_MUTATION:
            if (action.payload && action.payload.answer) {
                state.resultState = true;
                state.result = action.payload;
                state.testInfo = Object.assign({}, state.testInfo,
                    {
                        answer: action.payload.answer
                    });
            } else {
                state.resultState = false;
                state.result = {};
                state.testInfo = Object.assign({}, state.testInfo,
                    {
                        answer: null
                    });
            }
            return state;
        case Constants.EXAM.SKIP_EXERCISE_MUTATION:
            state.exercise = Object.assign({}, state.exercise,
                {
                    skipped: true
                });
            state.feedbackType = 'exercise';
            state.feedbackHostId = state.exercise.id;
            return state;
        case Constants.EXAM.START_EXERCISE_MUTATION:
            state.topicId = action.payload.topic;
            return state;
        case Constants.EXAM.VIEW_ANSWER_MUTATION:
            state.exercise = Object.assign({}, state.exercise,
                {
                    answer_viewed: true,
                    current_url: state.exercise.answer_url,
                    images: BNUtils.buildExerciseImages(state.exercise.answer_url, state.exercise.a_image_count, 'a')
                });
            state.feedbackType = 'solution';
            state.feedbackHostId = state.exercise.id;
            return state;
        case Constants.EXAM.CHANGE_EXERCISE_COLLECT:
            state.exercise = Object.assign({}, state.exercise,
                {
                    is_collected: action.payload
                });
            return state;
        default:
            return state;
    }
}

export default {
    mutation,
};