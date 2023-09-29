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
      // Emit the credentials for the parent component to handle
      this.onLogin({
        username: this.username,
        password: this.password,
      });
      console.log('submitForm username =', this.username);
      console.log('submitForm password =', this.password)
    },
    clear() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>
