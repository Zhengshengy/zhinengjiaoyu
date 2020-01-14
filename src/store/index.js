/*
    默认Module
*/
import BNUtils from '~/utils/BNUtils';
import Constants from '~/actions/Constants';
import IndexAction from '~/actions/IndexAction';
import IndexMutation from '~/actions/IndexMutation';

const screen = BNUtils.screen();

export const state = () => ({
    locales: ['zh', 'en'],
    locale: 'zh',
    isMobileLayout: false,
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenOrientation: screen.orientation
});

export const getters = {
    locale(state) {
        return state.locale;
    },
    isMobileLayout(state) {
        return state.isMobileLayout;
    },
    screenWidth(state) {
        return state.screenWidth;
    },
    screenHeight(state) {
        return state.screenHeight;
    },
    screenOrientation(state) {
        return state.screenOrientation;
    }
};

export const mutations = {
    mutation_setLang: (state, lang) => (IndexMutation.mutation(state, { type: Constants.INDEX.SET_LANG, lang })),
    mutation_setMobileLayout: (state, isMobileLayout) => (IndexMutation.mutation(state, { type: Constants.INDEX.SET_MOBILE_LAYOUT, isMobileLayout })),
    mutation_setScreenWidth: (state, width) => (IndexMutation.mutation(state, { type: Constants.INDEX.SET_SCREEN_WIDTH, width })),
    mutation_setScreenHeight: (state, height) => (IndexMutation.mutation(state, { type: Constants.INDEX.SET_SCREEN_HEIGHT, height })),
    mutation_setScreenOrientation: (state, orientation) => (IndexMutation.mutation(state, { type: Constants.INDEX.SET_SCREEN_ORIENTATION, orientation }))
};

export const actions = {
    switchLang: IndexAction.switchLang,
    switchLayout: IndexAction.switchLayout,
    resizeScreen: IndexAction.resizeScreen
};