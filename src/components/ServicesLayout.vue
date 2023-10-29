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
            v-if="['admin', 'barber'].includes(userRole)" 
            :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
            @click="handleEditService(service)">
            Edit Service
            </v-btn>
            <!-- If user is not logged in -->
            <v-btn 
            :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
            v-else 
            @click="handleBookNow(service)"
            justify-center>
            Book Now!
            </v-btn>
            <!-- If user is barber or admin -->
            <v-btn 
            v-if="['admin', 'barber'].includes(userRole)" 
            :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
            @click="handleDeleteService(service)">
            Delete Service
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
    handleDeleteService(service) {
    // Handle the service deletion here
    console.log(`Deleting service with id: ${service.id}`);
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
    userRole: state => state.app.role,
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
