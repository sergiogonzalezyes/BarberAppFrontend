<template>
  <div class="divdiv">
    <form @submit.prevent="submitForm">
      <v-text-field
        v-model="username"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
</style>
