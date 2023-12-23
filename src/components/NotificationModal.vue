<template>
<v-dialog v-model="dialogOpen" max-width="500px">
    <v-card>
    <v-card-title>{{ notification.title }}</v-card-title>
    <v-card-text>
        <!-- Display notification content and other details here -->
        <div v-if="appointmentDetails">
            <div>
                <strong>Appointment Date and Time:</strong> {{ appointmentDetails.Appointment_Date_Time }}
            </div>
            <div>
                <strong   strong>Status:</strong> {{ appointmentDetails.Status }}
            </div>
            <div>
                <strong>Customer Email:</strong> {{ appointmentDetails.Email }}
            </div>
            <div>
                <strong>Customer First Name:</strong> {{ appointmentDetails.F_Name }}
            </div>
            <div>
                <strong>Customer Last Name:</strong> {{ appointmentDetails.L_Name }}
            </div>
            <div>
                <strong>Customer Phone Number:</strong> {{ appointmentDetails.Phone_Number }}
            </div>
            <div>
                <strong>Customer Service Name:</strong> {{ appointmentDetails.Service_Name }}
            </div>
            <div>
                <strong>Service Description:</strong> {{ appointmentDetails.Service_Description }}
            </div>
            <div>
                <strong>Service Price:</strong> ${{ appointmentDetails.Service_Price }}
            </div>
            <div>
                <strong>Payment Method:</strong> {{ appointmentDetails.Payment_Type_Name }}
            </div>
        </div>
    </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios';

export default {
props: ['notification', 'dialog'],
data() {
return {
dialogOpen: this.dialog,
appointmentDetails: null, // Local data property to store appointment details
api_key: process.env.VUE_APP_PROD_API,
};
};
},
watch: {
    dialog(newVal) {
    console.log('Dialog value changed:', newVal);
    if (!newVal) {
        this.resetState();
    }
},
dialogOpen(newVal) {
    if (newVal !== this.dialog) {
        this.$emit('update:dialog', newVal);
    }
    console.log('Local dialog value changed:', newVal);
    if (!newVal) {
        this.resetState();
    }
},
},
methods: {
handleDialogClosed() {
this.$emit('closeModal');
console.log('Dialog closed');
},
async fetchAppointmentDetails() {
try {
    // Fetch appointment details here
    // const response = await axios.get(`http://localhost:5001/appointments/${this.notification.appointment_id}`);
    const response = await axios.get(this.api_key+`/appointments/${this.notification.appointment_id}`);
    const data = response.data;
    console.log('Appointment details:', data);

    // Update the local data property with the appointment details
    this.appointmentDetails = data;
} catch (error) {
    console.log('Error fetching appointment details:', error);
}
},
},
mounted() {
this.fetchAppointmentDetails();
},
};
</script>
