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
          // Redirect to dashboard if login is successful
          console.log('Login success:');
          this.$router.push('/dashboard');
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
