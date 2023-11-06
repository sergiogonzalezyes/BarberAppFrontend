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
            <v-list-item-title>{{ slot.start_time }} - {{ slot.end_time }}</v-list-item-title>
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
export default {
props: {
    dialog: {
    type: Boolean,
    required: true,
    },
    availableTimeSlots: {
    type: Array,
    required: true,
    },
},
data() {
    return {
    selectedTimeSlots: [],
    localDialog: this.dialog,
    };
},
methods: {
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
    saveSelectedTimeSlots() {
    // Send the selectedTimeSlots array to the parent component or perform any other desired action
    this.$emit('save', this.selectedTimeSlots);
    this.closeDialog();
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
    console.log('availableTimeSlots:', this.availableTimeSlots);
},


};
</script>
  