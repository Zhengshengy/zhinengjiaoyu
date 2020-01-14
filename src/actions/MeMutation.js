/*
    当前登录用户的Mutation，Mutation表示同步的状态变更函数
 */
import Constants from '~/actions/Constants';

function mutation(state, action) {
    switch (action.type) {
        case Constants.ME.LOGIN_SUCCESS:
            state.user = action.user;
            state.requireLogin = false;
            state.isSignUp = false;
            return state;
        case Constants.ME.LOGOUT_SUCCESS:
            state.user = {};
            state.requireLogin = true;
            state.checkedAuth = false;
            state.isSignUp = false;
            return state;
        case Constants.ME.SIGN_UP_SUCCESS:
            state.user = action.user;
            state.requireLogin = false;
            state.isSignUp = true;
            return state;
        case Constants.ME.CHECKED_AUTH:
            state.checkedAuth = action.checkedAuth;
            return state;
        case Constants.ME.LOCKED:
            state.user.locked = action.locked;
            return state;
        default:
            return state;
    }
}

export default {
    mutation,
};