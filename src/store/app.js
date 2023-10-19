// store/app.js
import router from '@/router/index';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isAuthenticated: localStorage.getItem('userIsAuthenticated') === 'true' || false,
    username: localStorage.getItem('username') || '',
    role: localStorage.getItem('userRole') || '',
    logoutTimer: null,
    // Additional user information
    firstName: localStorage.getItem('userFirstName') || '',
    lastName: localStorage.getItem('userLastName') || '',
    email: localStorage.getItem('userEmail') || '',
    phoneNumber: localStorage.getItem('userPhoneNumber') || '',
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
    setFirstName(state, firstName) {
      state.firstName = firstName;
    },
    setLastName(state, lastName) {
      state.lastName = lastName;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setPhoneNumber(state, phoneNumber) {
      state.phoneNumber = phoneNumber;
    },
    // Add a mutation to update all user data at once
    setUserData(state, userData) {
      state.firstName = userData.firstName;
      state.lastName = userData.lastName;
      state.email = userData.email;
      state.phoneNumber = userData.phoneNumber;
    },
  },

  actions: {
    async login({ commit, dispatch }, { username, password }) {
      try {
        const response = await axios.post('http://localhost:5001/login', { username, password });

        if (response.data && response.data.success) {
          const user = response.data.user;
          commit('setAuthenticated', true);
          commit('setUsername', user.username);
          commit('setRole', user.role);
          commit('setUserData', { // Use the new mutation to update all user data at once
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone,
          });
          

          localStorage.setItem('userIsAuthenticated', 'true');
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('username', user.username);
          // Set additional user information in local storage
          localStorage.setItem('userFirstName', user.first_name);
          localStorage.setItem('userLastName', user.last_name);
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('userPhoneNumber', user.phone);

          if (user.role.toLowerCase() === 'admin' || user.role.toLowerCase() === 'barber') {
            router.push('/schedule');
          } else {
            router.push('/home');
          }

          const logoutTimer = setTimeout(() => {
            dispatch('logout');
          }, 5 * 60 * 1000);

          commit('setLogoutTimer', logoutTimer);
        } else {
          console.log('Login failed:', response.data.message);
        }
      } catch (error) {
        console.error('Login API call failed:', error);
      }
    },
    logout({ commit }) {
      commit('setAuthenticated', false);
      commit('setUsername', '');
      commit('setRole', '');
      // Clear additional user information from local storage
      localStorage.removeItem('userIsAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPhoneNumber');

      const logoutTimer = this.state.logoutTimer;
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        commit('setLogoutTimer', null);
      }
    },
    async updateUserProfile({ commit, state }, userData) {
      try {
        // Include the username in the payload
        userData.username = state.username; // Access the username from the state
    
        // Make a PUT request to update the user profile
        const response = await axios.put('http://localhost:5001/update-profile', userData);
    
        if (response.data && response.data.success) {
          // Update the user profile in the store if the backend update was successful
          const updatedUser = response.data.user;
          commit('setFirstName', updatedUser.firstName);
          commit('setLastName', updatedUser.lastName);
          commit('setEmail', updatedUser.email);
          commit('setPhoneNumber', updatedUser.phoneNumber);
          
          // Update the user profile in local storage
          localStorage.setItem('userFirstName', updatedUser.firstName);
          localStorage.setItem('userLastName', updatedUser.lastName);
          localStorage.setItem('userEmail', updatedUser.email);
          localStorage.setItem('userPhoneNumber', updatedUser.phoneNumber);

          return true; // Indicate success
        } else {
          // Handle update failure logic here (e.g., display an error message)
          console.log('Profile update failed:', response.data.message);
          return false; // Indicate failure
        }
      } catch (error) {
        console.error('Profile update API call failed:', error);
        return false; // Indicate failure
      }
    },
    
  },
};
