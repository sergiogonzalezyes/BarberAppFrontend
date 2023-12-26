<template>
<v-dialog v-model="localDialog" max-width="400">
    <v-card>
    <v-card-title>Select Time Slots</v-card-title>
    <v-card-text>
        <v-list>
            <v-list-item
            v-for="slot in availableTimeSlots"
            :key="slot.slotNumber"
            >
            <v-list-item-action>
                <v-checkbox
                v-model="selectedTimeSlots"
                :value="slot"
                ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{ formatTime(slot.start_time) }} - {{ formatTime(slot.end_time) }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card-text>
    <v-card-actions>
        <v-btn @click="saveSelectedTimeSlots">Save</v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios';

export default {
props: {
    dialog: {
    type: Boolean,
    required: true,
    },
    availableTimeSlots: {
    type: Object,
    required: true,
    },
    selected_date: {
    type: String,
    required: false,
    },
},
data() {
    return {
    selectedTimeSlots: [],
    localDialog: this.dialog,
    user_id: null,
    selectedDate: this.selected_date,
    api_key: process.env.VUE_APP_PROD_API,
    };
},
methods: {
    formatTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  },
    toggleTimeSlot(slot) {
    const index = this.selectedTimeSlots.findIndex(selectedSlot => selectedSlot.slotNumber === slot.slotNumber);
    if (index === -1) {
        // If not already selected, add it to the selectedTimeSlots array
        this.selectedTimeSlots.push(slot);
    } else {
        // If already selected, remove it from the selectedTimeSlots array
        this.selectedTimeSlots.splice(index, 1);
    }
    },

    async saveSelectedTimeSlots() {
        this.user_id = localStorage.getItem('userID');
        this.selectedDate = this.selected_date;

        // console.log('date:', this.selectedDate);


        try {
            // Send the selectedTimeSlots array to the server to update the database
            // const response = await axios.put(`http://localhost:5001/addBlock/${this.user_id}/${this.selectedDate}`, this.selectedTimeSlots);
            const response = await axios.put(this.api_key+`/addBlock/${this.user_id}/${this.selectedDate}`, this.selectedTimeSlots);

            // console.log('response:', response);

            // Assuming the server response indicates success, update the availability status locally
            if (response.status === 200) {
            // Loop through the selectedTimeSlots and mark them as "Unavailable"
            for (const slot of this.selectedTimeSlots) {
                slot.availability = 'Unavailable';
            }

            // Emit an event to notify the parent component of the updated data
            this.$emit('save', this.selectedTimeSlots);
            }

            // Close the dialog
            this.closeDialog();
        } catch (error) {
            console.error('Error saving time slots:', error);
        }
    },


    closeDialog() {
    this.selectedTimeSlots = []; // Clear the selected time slots when the dialog is closed
    this.$emit('dialog-closed');
    
    },
    
},
watch: {
    dialog(val) {
    this.localDialog = val;
    },
    localDialog(val) {
    if (!val) {
        this.closeDialog();
    }
    },

},
mounted() {
    this.localDialog = this.dialog;
    // Log availableTimeSlots when the component is mounted
    // console.log('availableTimeSlots:', this.availableTimeSlots);
},


};
</script>
  