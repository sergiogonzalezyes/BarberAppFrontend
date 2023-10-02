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
            color="primary"
            v-if="editing"
            @click="saveChanges"
            >
            Save
            </v-btn>
            <v-btn
            color="red"
            v-if="editing"
            @click="clearChanges"
            >
            Clear Changes
            </v-btn>
            <v-btn
            color="blue darken-1"
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
        image: 'https://via.placeholder.com/200',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
    },
    initialUser: {},
    };
},
created() {
    // Keep a copy of the initial user data to reset changes if needed
    this.initialUser = { ...this.user };
},
methods: {
    saveChanges() {
    this.editing = false;
    // Handle the save operation here. For example, send a request to update the user data.
    },
    clearChanges() {
    this.user = { ...this.initialUser };
    this.editing = false;
    },
},
};
</script>

<style scoped>

</style>
