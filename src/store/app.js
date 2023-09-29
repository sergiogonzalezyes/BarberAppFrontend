// store/app.js
// import router 
import router from '@/router';

export default {
  namespaced: true, // Ensure the module is namespaced
  state: {
    isAuthenticated: false,
    username: '',
    role: '',
    logoutTimer: null,
  },
  mutations: {
      setAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
      },
      setUsername(state, username) {
        state.username = username;
      },
      setRole(state, role) {
        state.role = role;
      },
      setLogoutTimer(state, timer) {
        state.logoutTimer = timer;
      },
  },
  actions: {
    login({ commit }, { username, password }) {
      console.log(username, password)
      const hardcodedUsername = 'admin';
      const hardcodedPassword = 'admin';

      const hardcodedGuestUsername = 'guest';
      const hardcodedGuestPassword = 'guest';

      if (username === hardcodedUsername && password === hardcodedPassword) {
        console.log('user logged in successfully')
        commit('setAuthenticated', true);
        commit('setUsername', username);
        commit('setRole', 'admin');
        localStorage.setItem('userIsAuthenticated', 'true');
      } else if (username === hardcodedGuestUsername && password === hardcodedGuestPassword) {
        commit('setAuthenticated', true);
        commit('setUsername', username);
        commit('setRole', 'guest');
        localStorage.setItem('userIsAuthenticated', 'true');
      }

      // Set the timer to log out after 2 minutes
      const logoutTimer = setTimeout(() => {
        commit('setLogoutTimer', null);
        this.dispatch('logout');
      }, 2 * 60 * 1000); // 2 minutes

      commit('setLogoutTimer', logoutTimer);
      router.push('/dashboard');
    },
    logout({ commit }) {
      commit('setAuthenticated', false);
      commit('setUsername', '');
      commit('setRole', '');
      localStorage.removeItem('userIsAuthenticated');

      // Clear the logout timer if it's set
      const logoutTimer = this.state.logoutTimer;
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        commit('setLogoutTimer', null);
      }
    },
  },
};
  