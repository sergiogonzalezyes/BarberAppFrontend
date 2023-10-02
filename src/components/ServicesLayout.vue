<template>
    <div>
        <v-row>
            <v-col v-for="service in services" :key="service.id" cols="12" sm="6" md="4">
                <v-card>
                    <v-img :src="`/${service.image}`" aspect-ratio="2.75" alt="Service Image"></v-img>
                    <v-card-title>
                        <h2>{{ service.name }}</h2>
                    </v-card-title>
                    <v-card-text>
                        <p>{{ service.description }}</p>
                        <p>${{ service.price }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="blue" @click="handleBookNow(service)">Book Now!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <BookingModal v-if="dialogOpen" :service="selectedService" :dialog.sync="dialogOpen" @dialog-closed="handleDialogClosed" />
    </div>
</template>

<script>
import BookingModal from '@/components/BookingModal.vue';

export default {
    props: ['services'],
    data() {
        return {
            selectedService: null,
            dialogOpen: false,
        };
    },
    components: {
        BookingModal,
    },
    methods: {
        handleBookNow(service) {
            this.selectedService = service;
            this.dialogOpen = true;
        },
        handleDialogClosed() {
            this.dialogOpen = false;
        },
    },
};
</script>

<style scoped>
</style>

