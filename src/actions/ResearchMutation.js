/*
    VUE研究学习模块的Mutation，Mutation表示同步的状态变更函数
 */
import Constants from '~/actions/Constants';

function mutation(state, action) {
    switch (action.type) {
        case Constants.RESEARCH.addToDo:
            state.toDoList.push({
                text: action.text,
                done: false
            });
            return state;
        case Constants.RESEARCH.toggleToDo:
            action.todo.done = !action.todo.done;
            return state;
        default:
            return state;
    }
}

export default {
    mutation,
};