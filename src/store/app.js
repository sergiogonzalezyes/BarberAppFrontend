// store/app.js
import router from '@/router/index';

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
    login({ commit, dispatch }, { username, password }) {

      const hardcodedUsername = 'admin';
      const hardcodedPassword = 'admin';

      const hardcodedBarberUsername = 'barber';
      const hardcodedBarberPassword = 'barber';

      const hardcodedCustomerUsername = 'customer';
      const hardcodedCustomerPassword = 'customer';

      if (username === hardcodedUsername && password === hardcodedPassword) {
        console.log('user logged in successfully');
        commit('setAuthenticated', true);
        commit('setUsername', username);
        commit('setRole', 'admin');
        localStorage.setItem('userIsAuthenticated', 'true');
        router.push('/schedule'); // Add this line to redirect to the admin route
      } else if (username === hardcodedBarberUsername && password === hardcodedBarberPassword) {
        commit('setAuthenticated', true);
        commit('setUsername', username);
        commit('setRole', 'barber');
        localStorage.setItem('userIsAuthenticated', 'true');
        router.push('/schedule'); // Add this line to redirect to the barber route
      } else if (username === hardcodedCustomerUsername && password === hardcodedCustomerPassword) {
        commit('setAuthenticated', true);
        commit('setUsername', username);
        commit('setRole', 'customer');
        localStorage.setItem('userIsAuthenticated', 'true');
        router.push('/home'); // Add this line to redirect to the customer route
      }

      // Set the timer to log out after 2 minutes
      const logoutTimer = setTimeout(() => {
        dispatch('logout'); // change this.dispatch to dispatch
      }, 2 * 60 * 1000); // 2 minutes

      commit('setLogoutTimer', logoutTimer);
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
  