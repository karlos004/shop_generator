export const state = () => ({
    categories: null
  });
  
  export const mutations = {
    addCategories(state, data) {
      state.categories = data
    },
  };
  
  export const getters = {
    getAllCategories: state => state.categories,
  };
  
  export const actions = {
    async downloadAllCategories({commit, state}) {
        let data = await this.$axios.$get('/api/getCategories');
        commit('addCategories', data);
    },
  };
  