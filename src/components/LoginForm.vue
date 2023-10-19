<template>
  <div class="divdiv">
    <form @submit.prevent="submitForm">
      <v-text-field 
        class="textfield"
        v-model="username"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        class="textfield"
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn class="me-4" type="submit">Submit</v-btn>
      <v-btn @click="clear">Clear</v-btn>
      
      <!-- Cancel Link Centered Below the Buttons -->
      <div class="cancel-container">
        <a @click="cancel" class="cancel-link">Cancel</a>
      </div>
      <!-- Error message -->
      
    
      <router-link to="/register" class="register-button">Register Here</router-link>
    
    </form>
  </div>
</template>

<script>
export default {
  props: {
    onLogin: {
      type: Function,
      required: true,
    },
    errorMsg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      this.onLogin({
        username: this.username,
        password: this.password,
      });
    },
    clear() {
      this.username = '';
      this.password = '';
    },
    // Handle the cancel action
    cancel() {
      this.$router.go(-1); // Go to the previous page
    },
  },
};
</script>

<!-- Updated CSS for the Cancel Link -->
<style scoped>
.divdiv {
  width: 80%; /* Adjust as necessary */
  max-width: 400px; /* Adjust as necessary */
  padding: 20px;
  border: 1px solid #ccc; /* Adjust as necessary */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); /* Adjust as necessary */
  border-radius: 8px; /* Adjust as necessary */
}

.cancel-container {
  margin-top: 20px;
  text-align: center;
  width: 100%;
}

.cancel-link {
  color: grey;
  text-decoration: underline;
  cursor: pointer;
}

.textfield {
  width: 100%;
  margin-bottom: 20px;

}

.error-message {
  color: red;
  margin-top: 10px;
}

.register-button {
  margin-top: 20px;
  text-align: center;
  display: block;
}



</style>
