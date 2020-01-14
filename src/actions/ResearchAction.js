/*
    VUE研究学习模块登录用户Module的公共函数
 */
import Constants from '~/actions/Constants';
import BNActionHelper from '~/utils/BNActionHelper';

function loadToDoA(context) {
    return BNActionHelper.dispatchAction(context, Constants.RESEARCH.addToDo, 'First To Do A');
}
function loadToDos(context) {
    return BNActionHelper.dispatchAction(context, Constants.RESEARCH.loadToDoA).then(() => {
        BNActionHelper.dispatchAction(context, Constants.RESEARCH.addToDo, 'First To Do B');
    });
}

export default {
    loadToDoA,
    loadToDos
};