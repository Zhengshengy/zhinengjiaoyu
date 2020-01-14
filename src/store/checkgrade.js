
export const state = () => ({
    check:false
});

export const getters = {
    check(state) {
        return state.check;
    },
};
export const mutations = {
    showbox(state){
        state.check = true
    },
    nonebox(state){
        state.check = false
    }
};


