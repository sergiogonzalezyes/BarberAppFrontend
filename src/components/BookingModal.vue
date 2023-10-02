<template>
    <v-dialog v-model="localDialog" class="mx-auto">
        <v-card class="mx-auto">
            <v-card-title>Booking: {{ service.name }}</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field label="First Name" v-model="first_name" :rules="[v => !!v || 'First Name is required']">
                    </v-text-field>
                    <v-text-field label="Last Name" v-model="last_name" :rules="[v => !!v || 'Last Name is required']">
                    </v-text-field>
                    <v-text-field label="Email" v-model="email" :rules="[v => !!v || 'Email is required']">
                    </v-text-field>
                    <v-text-field label="Phone" v-model="phone" :rules="[v => !!v || 'Phone is required']">
                    </v-text-field>
                    <v-select 
                        :items="availableBarbers" 
                        item-text="name" 
                        item-value="id" 
                        v-model="selectedBarber"
                        label="Select a Barber"
                        :rules="[v => !!v || 'Barber is required']">
                    </v-select>
                    <v-date-picker v-model="date" label="Select a Date" :rules="[v => !!v || 'Date is required']" class="date_picker"></v-date-picker>
                    <v-time-picker v-model="time" label="Select a Time" :rules="[v => !!v || 'Time is required']" class="time_picker"></v-time-picker>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="orange" text @click="submitForm" class="submit_booking" >Submit Booking</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['service', 'dialog'],
    data() {
        return {
            localDialog: this.dialog,
            valid: false,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            selectedBarber: null,
            availableBarbers: [
                { id: 1, name: 'Barber A' },
                { id: 2, name: 'Barber B' },
            ],
            date: null,
            time: null,
        };
    },
    watch: {
        dialog(newVal) {
            console.log('Dialog value changed:', newVal);
            if (!newVal) {
                this.resetState();
            }
        },
        localDialog(newVal) {
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
        closeDialog() {
            this.localDialog = false;
            this.$emit('dialog-closed');
        },
        submitForm() {
            if (this.$refs.form.validate()) {
                // Process the booking
                alert(`Booking Successful for ${this.name} with Barber ID: ${this.selectedBarber} on ${this.date} at ${this.time}`);
                this.closeDialog();
            }
        },
        resetState() {
            console.log('Resetting state...');
            this.valid = false;
            this.name = '';
            this.selectedBarber = null;
            this.date = null;
            this.time = null;
        },

    },
};
</script>

<style>
.modal-size {
    width: 600px;
}
.date_picker {
    display: flex;
}

.time_picker {
    display: flex;
}

.submit_booking {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

</style>
