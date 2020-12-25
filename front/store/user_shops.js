export const state = () => ({
  shops: null
});

export const mutations = {
  addShops(state, data) {
    state.shops = data
  },
};

export const getters = {
  getShopsForUser: state => state.shops,
};


export const actions = {
  async downloadShopsForUser(context, id) {
    if ( state.events == null ) {
      let response = await this.$axios.$get('/api/user/'+ id +'/shops');
      context.commit('addShops', response.data.results);
    }
  },
};
