/*
    验证是否为老师
*/
import BNRouteHelper from '~/utils/BNRouteHelper';
export default function ({ store, req, redirect }) {
    if (store.state.me.user.role != 4 && store.state.me.user.role != 3){
        return BNRouteHelper.redirectToLogin(store, redirect);
    }
}