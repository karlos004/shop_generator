const packageJson = require('../package.json')
const name = packageJson.name || 0

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
