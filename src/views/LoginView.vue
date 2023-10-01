<template>
  <div class="login">
    <LoginForm :onLogin="handleLogin" :errorMsg="errorMsg" />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  data() {
    return {
      errorMsg: '',
      username: '',
      password: '',
    };
  },
  methods: {
    handleLogin(credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
      console.log('Received credentials:', credentials);
      this.performLogin(); // Call the login logic function
    },
    async performLogin() {
      try {
        const success = await this.$store.dispatch('app/login', {
          username: this.username,
          password: this.password,
        });
        

        if (success) {
          // Redirect to dashboard if login is successful and user is authenticated as customer
          // if the user is authenticated as admin or barber, redirect to schedule upon login
          if (this.$store.state.app.user.role.toLowerCase() === 'admin' || this.$store.state.app.user.role.toLowerCase() === 'barber') {
            this.$router.push('/schedule');
          } else {
            this.$router.push('/home');
          }
        } else {
          // Set error message to be displayed to the user
          this.errorMsg = 'Invalid username or password';
          
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    },
  },

  components: {
    LoginForm,
  },
};

</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
}
</style>
