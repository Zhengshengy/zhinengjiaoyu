/*
    当前登录用户Module
*/
import Constants from '~/actions/Constants';
import MeAction from '~/actions/MeAction';
import MeMutation from '~/actions/MeMutation';

export const state = () => ({
    requireLogin: true,
    isSignUp: false,
    checkedAuth: false,
    user: {
    }
});

export const getters = {
    user(state) {
        return state.user;
    },
    requireLogin(state) {
        return state.requireLogin;
    }
};

export const mutations = {
    mutation_loginSuccess: (state, user) => (MeMutation.mutation(state, { type: Constants.ME.LOGIN_SUCCESS, user })),
    mutation_logoutSuccess: (state) => (MeMutation.mutation(state, { type: Constants.ME.LOGOUT_SUCCESS })),
    mutation_signUpSuccess: (state, user) => (MeMutation.mutation(state, { type: Constants.ME.SIGN_UP_SUCCESS, user })),
    mutation_checkedAuth: (state, checkedAuth) => (MeMutation.mutation(state, { type: Constants.ME.CHECKED_AUTH, checkedAuth })),
    mutation_locked: (state, locked) => (MeMutation.mutation(state, { type: Constants.ME.LOCKED, locked }))
};

export const actions = {
    signUp: MeAction.signUp,
    login: MeAction.login,
    logout: MeAction.logout,
    unLock: MeAction.unLock,
    selectCourse: MeAction.selectCourse,
    authorization: MeAction.authorization
};

