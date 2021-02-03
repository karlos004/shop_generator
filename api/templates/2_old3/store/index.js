const packageJson = require('../package.json')
const name = packageJson.shop_name || 'Shop'

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
