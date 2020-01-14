/*
    当前登录用户Module的公共函数
 */
import Constants from '~/actions/Constants';
import BNActionHelper from '~/utils/BNActionHelper';
import BNTracking from '~/utils/BNTracking';
import BNRouteHelper from '~/utils/BNRouteHelper';
import BNUtils from '~/utils/BNUtils';
import BNConstants from '~/utils/BNConstants';
import BNService from '~/services/BNService';
// 注册
function signUp(context, user) {
    BNUtils.clearUserName();
    BNUtils.clearUserToken();
    BNUtils.clearUserRole();
    return BNService.register(
        user.name,
        user.email,
        user.password,
        user.password_confirmation,
        user.role
    ).then(data => {
        BNUtils.setUserName(data.name);
        BNUtils.setUserToken(data.token);
        BNUtils.setUserRole(parseInt(data.role, 10));
        return BNActionHelper.dispatchAction(
            context,
            Constants.ME.SIGN_UP_SUCCESS,
            {
                name: data.name,
                email: data.email,
                token: data.token,
                role: data.role,
                access: 'access',
                avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
            });
    });
}
// 登录
function login(context, user) {
    BNUtils.clearUserName();
    BNUtils.clearUserToken();
    BNUtils.clearUserRole();
    return BNService.login(user.name, user.password).then((data) => {
        BNUtils.setUserName(data.name);
        BNUtils.setUserToken(data.token);
        BNUtils.setUserRole(parseInt(data.role, 10));
        BNUtils.clearKeyValue(BNConstants.COOKIES.LOCK);
        return BNActionHelper.dispatchAction(
            context,
            Constants.ME.LOGIN_SUCCESS,
            {
                name: data.name,
                email: data.email,
                token: data.token,
                role: data.role,
                access: 'access',
                avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
            });
    });
}
// 解锁
function unLock(context, user) {
    return BNService.unLock(user.name, user.password).then((data) => {
        BNUtils.setUserName(data.name);
        BNUtils.setUserToken(data.token);
        BNUtils.setUserRole(parseInt(data.role, 10));
        BNUtils.clearKeyValue(BNConstants.COOKIES.LOCK);
        return BNActionHelper.dispatchAction(
            context,
            Constants.ME.LOGIN_SUCCESS,
            {
                name: data.name,
                email: data.email,
                token: data.token,
                role: data.role,
                access: 'access',
                avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
            });
    });
}
// 退出
function logout(context, action = false) {
    return BNService.logout().then(() => {
        BNUtils.clearUserName();
        BNUtils.clearUserToken();
        BNUtils.clearUserRole();
        if (action) {
            return BNActionHelper.dispatchAction(
                context,
                Constants.ME.LOGOUT_SUCCESS,
                {});
        } else {
            return Promise.resolve();
        }
    }).catch(error => {
        BNTracking.trackException(error);
        BNUtils.clearUserName();
        BNUtils.clearUserToken();
        BNUtils.clearUserRole();
        return Promise.resolve(error);
    });
}
// 验证，尝试获取当前用户信息
function authorization(context, token) {
    return BNService.getUserInfo(token).then((data) => {
        BNActionHelper.dispatchAction(context, Constants.ME.CHECKED_AUTH, true);
        if (data.code === 200) {
            BNUtils.setUserName(data.name);
            BNUtils.setUserToken(data.token);
            BNUtils.setUserRole(parseInt(data.role, 10));
            return BNActionHelper.dispatchAction(
                context,
                Constants.ME.LOGIN_SUCCESS,
                {
                    name: data.name,
                    email: data.email,
                    token: data.token,
                    role: data.role,
                    access: 'access',
                    avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                });
        } else if (data.code === 103) {
            return BNActionHelper.dispatchAction(
                context,
                Constants.ME.LOCKED,
                true
            );
        } else {
            return Promise.resolve(data);
        }
    }).catch(error => {
        BNTracking.trackException(error);
        BNUtils.clearUserName();
        BNUtils.clearUserToken();
        BNUtils.clearUserRole();
        BNActionHelper.dispatchAction(context, Constants.ME.CHECKED_AUTH, true);
        return Promise.resolve(error);
    });
}
// 选择课程
function selectCourse(context, course) {
    BNUtils.createCookie(BNConstants.COOKIES.COURSE, course, 3600);
    return Promise.resolve(course);
}

export default {
    signUp,
    login,
    logout,
    unLock,
    selectCourse,
    authorization
};