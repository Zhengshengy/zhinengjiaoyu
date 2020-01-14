/*
    验证是否为学生
*/
import BNRouteHelper from '~/utils/BNRouteHelper';
export default function ({ store, req, redirect }) {
    if (store.state.me.user.role != 1 && store.state.me.user.role != 2){
        return BNRouteHelper.redirectToLogin(store, redirect);
    }
}