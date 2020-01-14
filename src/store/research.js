/*
    VUE习题学习Module
*/
import Constants from '~/actions/Constants';
import ResearchAction from '~/actions/ResearchAction';
import ResearchMutation from '~/actions/ResearchMutation';

export const state = () => ({
    toDoList: []
});


export const getters = {
    toDos(state) {
        return state.toDoList;
    }
};

export const mutations = {
    mutation_addToDo: (state, text) => (ResearchMutation.mutation(state, { type: Constants.RESEARCH.addToDo, text })),
    mutation_toggleToDo: (state, todo) => (ResearchMutation.mutation(state, { type: Constants.RESEARCH.toggleToDo, todo }))
};

export const actions = {
    loadToDoA: ResearchAction.loadToDoA,
    loadToDos: ResearchAction.loadToDos
};

