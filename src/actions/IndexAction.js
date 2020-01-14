/*
    默认Module的公共函数
 */
import Constants from '~/actions/Constants';
import BNActionHelper from '~/utils/BNActionHelper';
import BNTracking from '~/utils/BNTracking';
import BNRouteHelper from '~/utils/BNRouteHelper';
import BNService from '~/services/BNService';

// 切换语言
function switchLang(context, lang) {
    return BNService.switchLang(
        lang
    ).then((data) => {
        return BNActionHelper.dispatchAction(
            context,
            Constants.INDEX.SET_LANG,
            lang);
    }).catch(error => {
        BNTracking.trackException(error);
    });
}
// 切换手机模式和桌面模式
function switchLayout(context, isMobileLayout) {
    return BNActionHelper.dispatchAction(
        context,
        Constants.INDEX.SET_MOBILE_LAYOUT,
        isMobileLayout);
}

// 屏幕重置
function resizeScreen(context, vp) {
    try {
        // Bamboo: 屏幕宽度
        BNActionHelper.dispatchAction(
            context,
            Constants.INDEX.SET_SCREEN_WIDTH,
            vp.width);

        // Bamboo: 屏幕高度
        BNActionHelper.dispatchAction(
            context,
            Constants.INDEX.SET_SCREEN_HEIGHT,
            vp.height);

        // Bamboo: 屏幕方向, 1-竖屏; 1-横屏;
        return BNActionHelper.dispatchAction(
            context,
            Constants.INDEX.SET_SCREEN_ORIENTATION,
            vp.orientation);
    } catch (error) {
        BNTracking.trackException(error);
    }
}

export default {
    switchLang,
    switchLayout,
    resizeScreen
};