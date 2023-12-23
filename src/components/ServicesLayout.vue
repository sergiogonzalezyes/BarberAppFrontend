<template>
  <div class="parentdiv">
    <v-row>
      <v-col v-for="service in services" :key="service.Service_ID" cols="12" sm="6" md="4">
        <v-card class="cards">
          <v-img :src="`/${service.image}`" aspect-ratio="2.75" alt="Service Image"></v-img>
          <v-card-title class="hm1">
            <h2 class="hmm">{{ service.Service_Name }}</h2>
          </v-card-title>
          <v-card-text class="text-center">
            <p>{{ service.Service_Description }}</p>
            <p>${{ service.Service_Price }}</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <!-- If user is barber or admin -->
            <v-btn
              v-if="['admin'].includes(userRole)"
              :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
              @click="handleEditService(service)"
            >
              Edit
            </v-btn>
            <!-- If user is not logged in -->
            <v-btn
              v-if="userRole !== 'admin' && userRole !== 'barber'"
              :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
              @click="handleBookNow(service)"
              justify-center
            >
              Book Now!
            </v-btn>
            <!-- If user is barber or admin -->
            <v-btn
              v-if="['admin', 'barber'].includes(userRole)"
              :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
              @click="handleDisableService(service.Service_ID)"
            >
              Disable
            </v-btn>
            <v-btn
              v-if="['admin'].includes(userRole)"
              :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
              @click="handleDeleteService(service.Service_ID)"
            >
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Use the EditServiceModal component for editing -->
    <EditServiceModal
      v-if="canEditService && editDialogOpen"
      :service="selectedService"
      :dialog.sync="editDialogOpen"
      @dialog-closed="handleEditDialogClosed"
    />

    <!-- Use the BookingModal component for booking -->
    <BookingModal
      v-if="bookDialogOpen"
      :service="selectedService"
      :dialog.sync="bookDialogOpen"
      @dialog-closed="handleBookDialogClosed"
    />
  </div>
</template>

<script>
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import EditServiceModal from '@/components/EditServiceModal.vue';
import BookingModal from '@/components/BookingModal.vue';
import { mapState } from 'vuex';

export default {
  props: ['services'],
  data() {
    return {
      selectedService: null,
      editDialogOpen: false,
      bookDialogOpen: false,
      api_key: process.env.VUE_APP_PROD_API,
    };
  },
  components: {
    EditServiceModal,
    BookingModal,
  },
  methods: {
    handleEditService(service) {
      this.selectedService = service;
      this.editDialogOpen = true;
    },
    handleBookNow(service) {
      this.selectedService = service;
      this.bookDialogOpen = true;
    },
    handleEditDialogClosed() {
      this.editDialogOpen = false;
    },
    handleBookDialogClosed() {
      this.bookDialogOpen = false;
    },
    async handleDeleteService(serviceId) {
    try {
        // Get the user_id from localstorage
        const userId = localStorage.getItem('userID');

        // Make an HTTP DELETE request to the backend API with user_id as a query parameter
        // await axios.delete(`http://localhost:5001/services/${serviceId}/${userId}`);
          await axios.delete(api_key+`services/${serviceId}/${userId}`);


       // Emit an event to inform the parent component that a service has been deleted
       this.$emit('service-deleted', serviceId);

        console.log(`Service with ID ${serviceId} has been deleted.`);
        } catch (error) {
        console.error(`Error deleting service: ${error}`);
      }
    },
    async handleDisableService(serviceId) {
      try {
        // Get the user_id from localstorage
        const userId = localStorage.getItem('userID');

        // Make an HTTP DELETE request to the backend API with user_id as a query parameter
        // await axios.put(`http://localhost:5001/services/disable/${serviceId}/${userId}`);
        await axios.put(api_key+`services/disable/${serviceId}/${userId}`);
      } catch (error) {
        console.error(`Error disabling service: ${error}`);
      }
    },
  },
  watch: {
    // Watch for changes to userRole and log them
    userRole(newValue) {
      console.log('userRole changed: ', newValue);
    },
  },
  computed: {
    ...mapState({
      userRole: (state) => state.app.role,
    }),
    canEditService() {
      // Check if the user has the 'admin' or 'barber' role
      return ['admin', 'barber'].includes(this.userRole);
    },
  },
};
</script>

<style scoped>
.parentdiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cards {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hm1 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hmm {
  display: flex;
}
</style>
