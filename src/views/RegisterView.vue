<template>
  <div class="register">
    <RegisterForm :onRegister="handleRegister" :registrationErrorMsg="registrationErrorMsg" />
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      registrationErrorMsg: '',
      api_key: process.env.VUE_APP_PROD_API,
    };
  },
  methods: {
    handleRegister(registrationData) {
      // Perform registration logic using registrationData
      // Example: Make an Axios post request to your registration API
      console.log('Received registration data:', registrationData);
      this.performRegistration(registrationData); // Call the registration logic function with data
    },
    async performRegistration(registrationData) {
      try {
        // Make the Axios post request to your registration API
        // const response = await axios.post('http://localhost:5001/register', registrationData);
        const response = await axios.post(this.api_key+'/register', registrationData);

        // Check the response from the backend and handle success or failure accordingly
        if (response.data.success) {
          // Registration successful, you can redirect or perform other actions here
          this.$router.push('/login');
        } else {
          // Registration failed, display an error message to the user
          this.registrationErrorMsg = response.data.message; // Replace with the actual error message property from your API response
        }
      } catch (error) {
        // Handle any errors that occurred during the Axios request
        console.error('An error occurred during registration:', error);
        this.registrationErrorMsg = 'An error occurred during registration. Please try again later.';
      }
    },
  },
  components: {
    RegisterForm,
  },
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>