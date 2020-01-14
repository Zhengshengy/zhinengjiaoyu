/*
    习题联系模块的Mutation，Mutation表示同步的状态变更函数
 */
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';

function mutation(state, action) {
    let sameExercise = false;
    let skipped = false;
    switch (action.type) {
        case Constants.PAPER.GET_PAPER_MUTATION:
            sameExercise = state.paperInfo &&
                state.paperInfo.exercise &&
                action.payload &&
                action.payload.exercise &&
                (state.paperInfo.exercise.id === action.payload.exercise.id);
            skipped = sameExercise && state.paperInfo.exercise && state.paperInfo.exercise.skipped;
            state.paperInfo = action.payload;
            if (state.paperInfo.exercise) {
                state.paperInfo.exercise.current_url = state.paperInfo.exercise.url;
                state.paperInfo.exercise.images = BNUtils.buildExerciseImages(state.paperInfo.exercise.url + '/q', state.paperInfo.exercise.q_image_count, 'q');
                state.paperInfo.exercise.answer_url = state.paperInfo.exercise.url + '/a';
                if (skipped) {
                    state.paperInfo.exercise.skipped = skipped;
                }
                state.feedbackType = 'exercise';
                state.feedbackHostId = state.paperInfo.exercise.id;
            }
            return state;
        case Constants.PAPER.CHANGE_RESULT_MUTATION:
            if (action.payload && action.payload.answer) {
                state.resultState = true;
            } else {
                state.resultState = false;
            }
            return state;
        case Constants.PAPER.SKIP_PAPER_MUTATION:
            state.paperInfo = Object.assign({}, state.paperInfo, {
                exercise: Object.assign({}, state.paperInfo.exercise,
                    {
                        skipped: true
                    })
            });
            return state;
        case Constants.PAPER.VIEW_ANSWER_MUTATION:
            state.paperInfo = Object.assign({}, state.paperInfo, {
                exercise: Object.assign({}, state.paperInfo.exercise,
                    {
                        answer_viewed: true,
                        current_url: state.paperInfo.exercise.answer_url,
                        images: BNUtils.buildExerciseImages(state.paperInfo.exercise.answer_url, state.paperInfo.exercise.a_image_count, 'a')
                    })
            });
            return state;
        case Constants.PAPER.CHANGE_EXERCISE_COLLECT:
            state.paperInfo = Object.assign({}, state.paperInfo, {
                exercise: Object.assign({}, state.paperInfo.exercise,
                    {
                        is_collected: action.payload
                    })
            });
            return state;
        default:
            return state;
    }
}

export default {
    mutation,
};