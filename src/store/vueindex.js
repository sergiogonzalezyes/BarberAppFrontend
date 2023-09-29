// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import app from './app'; // import the app module

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app, // register the app module
  },
});
