/*
    VUE Action Dispatch 封装
*/
export default {
    dispatchAction: function(context, type, params) {
        // check if store or content by app property, app means a global dispatch with store
        if (context.app) {
            if (type.includes('mutation_')) {
                return context.commit(type, params);
            } else {
                return context.dispatch(type, params);
            }
        } else {
            const typeInContext = type.substr(type.indexOf('/') + 1);
            if (typeInContext.includes('mutation_')) {
                return context.commit(typeInContext, params);
            } else {
                return context.dispatch(typeInContext, params);
            }
        }
    }
}