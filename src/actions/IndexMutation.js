/*
    默认模块的Mutation，Mutation表示同步的状态变更函数
 */
import Constants from '~/actions/Constants';

function mutation(state, action) {
    switch (action.type) {
        case Constants.INDEX.SET_LANG:
            state.locale = action.lang;
            return state;
        case Constants.INDEX.SET_MOBILE_LAYOUT:
            state.isMobileLayout = action.isMobileLayout;
            return state;
        case Constants.INDEX.SET_SCREEN_WIDTH:
            state.screenWidth = action.width;
            return state;
        case Constants.INDEX.SET_SCREEN_HEIGHT:
            state.screenHeight = action.height;
            return state;
        case Constants.INDEX.SET_SCREEN_ORIENTATION:
            state.screenOrientation = action.orientation;
            return state;
        default:
            return state;
    }
}

export default {
    mutation,
};