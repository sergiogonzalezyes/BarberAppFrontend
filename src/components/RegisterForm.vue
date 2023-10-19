<template>
<div class="register-form">
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

    <!-- Add more input fields for registration -->
    <v-text-field
        class="textfield"
        v-model="firstName"
        label="First Name"
        required
    ></v-text-field>

    <v-text-field
        class="textfield"
        v-model="lastName"
        label="Last Name"
        required
    ></v-text-field>

    <v-text-field
        class="textfield"
        v-model="email"
        label="Email"
        type="email"
        required
    ></v-text-field>

    <v-text-field
        class="textfield"
        v-model="phoneNumber"
        label="Phone Number"
        required
    ></v-text-field>

    <v-btn class="me-4" type="submit">Register</v-btn>
    <v-btn @click="clear">Clear</v-btn>

    <!-- Cancel Link Centered Below the Buttons -->
    <div class="cancel-container">
        <a @click="cancel" class="cancel-link">Cancel</a>
    </div>

    <!-- Error message -->
    <p v-if="registrationErrorMsg" class="error-message">{{ registrationErrorMsg }}</p>
    </form>
</div>
</template>

<script>
export default {
props: {
    onRegister: {
    type: Function,
    required: true,
    },
    registrationErrorMsg: {
    type: String,
    default: '',
    },
},
data() {
    return {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    };
},
methods: {
    submitForm() {
    this.onRegister({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
    });
    },
    clear() {
    this.username = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
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
.register-form {
width: 80%;
max-width: 400px;
padding: 20px;
border: 1px solid #ccc;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
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
  