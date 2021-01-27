export const state = () => ({
  products: null
});

export const mutations = {
  addProducts(state, data) {
    state.products = data
  },
};

export const getters = {
  getAllProducts: state => state.products,
  getByCategoryProducts: (state) => (key) =>{
    return state.products.filter(function (product) {
        if ( product.category == key ) {
          return product
        }
      })
  },
  getByIdProduct: (state) => (key) => {
    return state.products.filter(function (product) {
      if ( product.product_id == key ) {
        return product
      }
    })
  }
};

export const actions = {
  async downloadAllProducts({commit, state}) {
      let data = await this.$axios.$get('/api/getProducts');
      commit('addProducts', data);
  },
};
