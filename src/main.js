import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex'; // Import Vuex
import store from './store/app'; // Import your Vuex store module
import router from '@/router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: false, // Set to true for dark mode
  },
});

// Install Vuex before creating the store instance
Vue.use(Vuex);

new Vue({
  render: (h) => h(App),
  store: new Vuex.Store({ // Create the Vuex store instance
    modules: {
      app: store, // Register your store module
    },
  }),
  router, // Use Vue Router
  vuetify, // Use Vuetify
}).$mount('#app');
