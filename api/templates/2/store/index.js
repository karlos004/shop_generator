const packageJson = require('../package.json')
const name = packageJson.shop_name || 'Shop'
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let cart = []
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      cart = (parsed.cart && JSON.parse(parsed.cart)) || []
    }

    commit('cart/setItems', cart)
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  appName: (state) => {
    return name;
  }
}
