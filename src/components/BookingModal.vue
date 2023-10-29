<template>
<v-dialog v-model="localDialog" class="mx-auto">
    <v-card class="mx-auto">
    <v-card-title>Booking: {{ service.name }}</v-card-title>
    <v-card-text>
        <v-form ref="form" v-model="valid">
            <v-text-field label="First Name" v-model="user_info.first_name" :rules="[v => !!v || 'First Name is required']"></v-text-field>
            <v-text-field label="Last Name" v-model="user_info.last_name" :rules="[v => !!v || 'Last Name is required']"></v-text-field>
            <v-text-field label="Email" v-model="user_info.email" :rules="[v => !!v || 'Email is required']"></v-text-field>
            <v-text-field label="Phone" v-model="user_info.phone" :rules="[v => !!v || 'Phone is required']"></v-text-field>


        <v-select
            :items="availableBarbersOptions"
            item-text="name"
            item-value="id"
            v-model="selectedBarber"
            label="Select a Barber"
            @input="onBarberSelected"
        ></v-select>


        <!-- Date Selection Section -->
        <v-select
            v-model="selectedDateFormatted"
            label="Select a Date"
            :items="availableDates"
            :rules="[v => !!v || 'Date is required']"
            :disabled="!selectedBarber"
            @input="onDateSelected"
        ></v-select>

        <!-- Time Selection Section -->
        <v-select
        :items="availableTimeSlots"
        item-text="start_time"
        item-value="slotNumber"
        v-model="selectedTimeSlot"
        label="Select a Time"
        :rules="[v => !!v || 'Time is required']"
        :disabled="!selectedDateFormatted"
        ></v-select>



        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn color="orange" text @click="submitForm" class="submit_booking" :disabled="!selectedTimeSlot">Submit Booking</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios';

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
      user_id: '',
      selectedBarber: null,
      availableBarbersOptions: [],
      availableDates: [],
      availableTimeSlots: [],
      selectedDateFormatted: null,
      selectedTimeSlot: null,
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
    service: {
      handler(newService) {
        if (newService) {
          this.fetchBarbersAndTimeSlots(newService.Service_ID);
        }
      },
      deep: true,
    },
  },
  methods: {
    async fetchBarbersAndTimeSlots(serviceId) {
      try {
        const response = await axios.get(`http://localhost:5001/service/${serviceId}/availability`);
        const data = response.data;

        this.availableBarbersOptions = data.map(barber => ({
          id: barber.barber_id,
          name: barber.barber_name,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchAvailableDatesForBarber(barber_id) {
      try {
        const response = await axios.get(`http://localhost:5001/schedule/${barber_id}/available-dates`);
        const data = response.data;

        this.availableDates = data.available_dates;
      } catch (error) {
        console.error('Error fetching available dates:', error);
      }
    },
    async fetchAvailableTimeSlotsForDate() {
        try {
            const response = await axios.get(`http://localhost:5001/schedule/${this.selectedBarber}/available-time-slots?date=${this.selectedDateFormatted}`);
            const data = response.data;
            console.log('Available time slots:', data);

            // Convert the object to an array of time slot objects
            this.availableTimeSlots = Object.keys(data.available_time_slots).map(slotNumber => {
                return {
                    slotNumber: parseInt(slotNumber),
                    ...data.available_time_slots[slotNumber]
                };
            });
        } catch (error) {
            console.error('Error fetching available time slots:', error);
        }
        },

    onBarberSelected() {
      this.fetchAvailableDatesForBarber(this.selectedBarber);
    },
    onDateSelected() {
      this.fetchAvailableTimeSlotsForDate();
    },
    closeDialog() {
      this.localDialog = false;
      this.$emit('dialog-closed');
    },
    submitForm() {
  if (this.$refs.form.validate()) {
    // Use the selected time slot's ID to retrieve start and end times
    const selectedTimeSlotId = this.selectedTimeSlot;
    const selectedTimeSlot = this.availableTimeSlots.find(slot => slot.slotNumber === selectedTimeSlotId);
    const customer_id = localStorage.getItem('userID'); // Retrieve user_id from localStorage

    if (!selectedTimeSlot) {
      // Handle error when selectedTimeSlot is not found
      console.error('Selected time slot not found');
      alert('Booking failed. Please try again later.');
      return;
    }

    const { start_time, end_time } = selectedTimeSlot;

    const bookingData = {
      first_name: this.user_info.first_name,
      last_name: this.user_info.last_name,
      email: this.user_info.email,
      phone: this.user_info.phone,
      barber_id: this.selectedBarber,
      date: this.selectedDateFormatted,
      start_time, // Include start_time in the bookingData
      end_time,   // Include end_time in the bookingData
      // Include the service id in the bookingData
      service_id: this.service.Service_ID,
      customer_id: customer_id
    };

    console.log('Booking data:', bookingData);

    // Make an Axios POST request to send bookingData to your backend
    axios
      .post('http://localhost:5001/bookings', bookingData)
      .then(() => {
        // Handle success
        alert('Booking Successful!');
        this.closeDialog();
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting booking:', error);
        alert('Booking failed. Please try again later.');
      });
  }
},



    resetState() {
  this.valid = false;
  this.first_name = '';
  this.last_name = '';
  this.email = '';
  this.phone = '';
  this.selectedBarber = null;
  this.availableDates = [];
  this.availableTimeSlots = {};
  this.selectedDateFormatted = null;
  this.selectedTimeSlot = null;
  
  // Clear user_info
  this.user_info = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  };
}

  },
created() {
  // Keep a copy of the initial user data to reset changes if needed
  this.initialUser = { ...this.user };

  // Populate the user_info object from the Vuex store
  this.user_info = {
    first_name: this.$store.state.app.firstName,
    last_name: this.$store.state.app.lastName,
    email: this.$store.state.app.email,
    phone: this.$store.state.app.phoneNumber,
  };
  console.log('User data:', this.user_info);

  if (this.service) {
    this.fetchBarbersAndTimeSlots(this.service.Service_ID);
  }
},

computed: {
  user_info() {
    return {
      first_name: this.$store.state.app.firstName,
      last_name: this.$store.state.app.lastName,
      email: this.$store.state.app.email,
      phone: this.$store.state.app.phoneNumber,
    };
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
  