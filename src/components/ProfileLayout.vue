<template>
<v-container fluid class="fill-height">
    <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
        <v-card-title class="headline justify-center">
            User Profile
        </v-card-title>
        <v-card-text class="text-center">
            <v-avatar size="200">
            <v-img :src="user.image"></v-img>
            </v-avatar>
            <v-text-field
            label="First Name"
            v-model="user.firstName"
            outlined
            :readonly="!editing"
            class="mt-4"
            ></v-text-field>
            <v-text-field
            label="Last Name"
            v-model="user.lastName"
            outlined
            :readonly="!editing"
            ></v-text-field>
            <v-text-field
            label="Email"
            v-model="user.email"
            outlined
            :readonly="!editing"
            ></v-text-field>
            <v-text-field
            label="Phone Number"
            v-model="user.phoneNumber"
            outlined
            :readonly="!editing"
            ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn
            :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
            v-if="editing"
            @click="saveChanges"
            >
            Save
            </v-btn>
            <v-btn
            :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
            v-else
            @click="editing = true"
            >
            Edit Profile
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
data() {
    return {
    editing: false,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    },
    initialUser: {},
    };
},
created() {
    // Keep a copy of the initial user data to reset changes if needed
    this.initialUser = { ...this.user };

    // Access the user data from your Vuex store and populate the user object
    this.user = {
    ...this.user,
    firstName: this.$store.state.app.firstName,
    lastName: this.$store.state.app.lastName,
    email: this.$store.state.app.email,
    phoneNumber: this.$store.state.app.phoneNumber,
    };
},
methods: {
    async saveChanges() {
    try {
      const success = await this.$store.dispatch('app/updateUserProfile', this.user);

      if (success) {
        // Profile update was successful, you can show a success message or perform any other action
        // console.log('Profile updated successfully');
      } else {
        // Profile update failed, you can display an error message
        // console.log('Profile update failed');
      }
    } catch (error) {
      console.error('Error while saving profile changes:', error);
    }
    this.editing = false;
  },
    clearChanges() {
    this.user = { ...this.initialUser };
    this.editing = false;
    },
},
computed: {
  user_info() {
    return {
      firstName: this.$store.state.app.firstName,
      lastName: this.$store.state.app.lastName,
      email: this.$store.state.app.email,
      phoneNumber: this.$store.state.app.phoneNumber,
    };
  },
},

};
</script>

<style scoped>

</style>
  