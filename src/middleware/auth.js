/*
    用户信息验证中间件，如果有登录用户就读取用户信息，没有就不显示
*/
import Constants from '~/actions/Constants';
import BNRouteHelper from '~/utils/BNRouteHelper';
import BNActionHelper from '~/utils/BNActionHelper';
import BNTracking from '~/utils/BNTracking';
import BNUtils from '~/utils/BNUtils';

export default function ({ store, req, redirect }) {
    // If nuxt generate, pass this middleware
    if (process.server && !req) {
        return;
    }
    if (store.state.me.requireLogin) {
        const token = BNUtils.getUserToken(req);
        if (token) {
            return BNActionHelper.dispatchAction(store, Constants.ME.AUTHORIZATION, token)
                .then((data) => {
                    BNTracking.trackDebug('Auth Middleware:', data);
                })
                .catch((error) => {
                    BNTracking.trackException(error);
                });
        }
    }
}