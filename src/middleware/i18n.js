/*
    多语言模块中间件，多语言设置和判断
*/
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default function ({ isHMR, app, store, req, route, params, error, redirect }) {
    const defaultLocale = app.i18n.fallbackLocale;
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) {
        return;
    }
    // Get locale from params
    const locale = params.lang || defaultLocale;
    if (store.state.locales.indexOf(locale) === -1) {
        return error({
            message: 'This page could not be found.',
            statusCode: 404
        });
    }
    // Set locale
    if ((app.i18n.locale !== store.state.locale) || (store.state.locale !== locale)) {
        store.commit(Constants.INDEX.SET_LANG, locale);
        app.i18n.locale = store.state.locale;
    }
    // If route is /<defaultLocale>/... -> redirect to /...
    if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
        const toReplace = '^/' + defaultLocale;
        const re = new RegExp(toReplace);
        return redirect(
            route.fullPath.replace(re, '/')
        );
    }
    if (route.fullPath.indexOf('/lockscreen') < 0 && BNUtils.getUserName(req) && BNUtils.getKeyValue(BNConstants.COOKIES.LOCK, req) === 1) {
        if (!BNRouteHelper.getLastPage()) {
            BNRouteHelper.saveLastPage(route.fullPath);
        }
        return redirect(
            BNRouteHelper.getLockScreenPath(route.fullPath, route.path, locale, defaultLocale)
        );
    }
}