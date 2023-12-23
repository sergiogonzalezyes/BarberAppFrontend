<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            class="mr-4"
            :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'"
            @click="setToday"
          >
            Today
          </v-btn>

          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="changeView('day')">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeView('week')">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeView('month')">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeView('4day')">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-btn
            class="mr-4"
            color="primary"
            @click="handleAddBlockNow"
          >
            Add Block
          </v-btn>
          <AddBlockModal
            v-if="AddBlockDialogOpen"
            :availableTimeSlots="availableTimeSlots"
            :dialog.sync="AddBlockDialogOpen"
            :selected_date="formatDate(focus)"
            @dialog-closed="handleAddBlockClosed"
          ></AddBlockModal>

      <v-sheet height="600">
        <div class='total-cost'>
          <h2>Total Income for the Day: ${{ calculateTotalCost() }}</h2>
        </div>
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="grey lighten-1"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          :first-interval="14"
        ></v-calendar>
        
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
        
        <v-card
  color="grey lighten-4"
  min-width="350px"
  flat
>

  <v-card-text>
    <!-- Display appointment details here -->
    <div v-if="selectedEventInfo">
      <p>Appointment Date and Time: {{ selectedEventInfo.appointment_date_time }}</p>
      <p>Status: {{ selectedEventInfo.status }}</p>
      <p>Customer:</p>
      <ul>
        <li>Customer User ID: {{ selectedEventInfo.customer.customer_user_id }}</li>
        <li>Email: {{ selectedEventInfo.customer.email }}</li>
        <li>First Name: {{ selectedEventInfo.customer.first_name }}</li>
        <li>Last Name: {{ selectedEventInfo.customer.last_name }}</li>
        <li>Phone Number: {{ selectedEventInfo.customer.phone_number }}</li>
      </ul>
      <!-- dividder here -->
      <div class="divider"></div>

      <p>Service:</p>
      <ul>
        <li>Service Name: {{ selectedEventInfo.service.service_name }}</li>
        <li>Service Description: {{ selectedEventInfo.service.service_description }}</li>
        <li>Service Price: {{ selectedEventInfo.service.service_price }}</li>
        <li>Service Duration: {{ selectedEventInfo.service.service_duration }}</li>
        <li>Payment Method: {{ selectedEventInfo.payment_method }}</li>
      </ul>
    </div>
  </v-card-text>
  <v-card-actions>

    <v-btn
      text
      color="secondary"
      @click="selectedOpen = false"
    >
      Close
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
    text
    color="red"
    @click="cancelAppointment"
    >
    Cancel Appointment
    </v-btn>
  </v-card-actions>
</v-card>

        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios';
import AddBlockModal from '@/components/AddBlockModal.vue';

export default {
  data: () => ({
    focus: '',
    type: 'day', // set default view to day
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',

    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    colors: ['#add8e6', '#ffb6c1', '#98fb98', '#fffacd', '#deb887', '#f0e68c', '#d8bfd8'], // slightly less pastel colors

    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    events: [],
    user_id: null,
    selectedEventInfo: null,
    AddBlockDialogOpen: false,
    availableTimeSlots: [],
    selectedTimeSlots: null,
    selectedUnavailableTimeSlots: null,
    blockedTimeSlots: [],
    api_key: process.env.VUE_APP_PROD_API,
    }),
    mounted() {
    // Get user_id from local storage
    this.user_id = localStorage.getItem('userID');
    console.log('User ID:', this.user_id);

    // Set the default focus to today's date in CST
    const today = new Date();
    today.setHours(today.getHours() -6 ); // Subtract 5 hours for CST (UTC-6)
    console.log('Today in CST:', today); // Add this line for debugging
    this.focus = today;
    const formattedToday = today.toISOString().split('T')[0];
    console.log('Formatted Today in CST:', formattedToday); // Add this line for debugging

    // Fetch user-specific appointments for today's date
    this.fetchDailyAppointments(formattedToday);
    this.type = 'day'; // Set the default view to daily
    this.updateRange({ start: { date: formattedToday } }); // Load events for today
    this.$refs.calendar.checkChange();
    this.fetchAvailableTimeSlots(formattedToday);
    this.fetchBlockedTimeSlots(formattedToday);
  },
  components: {
    AddBlockModal,
  },

  methods: {
    formatDate(date) {
      if (date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return '';
    },
    handleAddBlockNow() {
      this.AddBlockDialogOpen = true;
    },
    handleAddBlockClosed() {
      this.AddBlockDialogOpen = false;
      // refresh the calendar view to show the newly added block
      this.fetchBlockedTimeSlots(this.formatDate(this.focus));
      
    },
    async fetchBlockedTimeSlots(date) {
  try {
    // const response = await axios.get(`http://localhost:5001/blockedtimeslots/${this.user_id}/${date}`);
    const response = await axios.get(this.api_key+`/blockedtimeslots/${this.user_id}/${date}`)
    const blockedTimeSlots = response.data;

    if (blockedTimeSlots && Object.keys(blockedTimeSlots).length > 0) {
      console.log('Blocked Time Slots for', date, ':', blockedTimeSlots);

      const formattedBlockedTimeSlots = Object.values(blockedTimeSlots).map(blocked_slot => {
        // Log date and time strings for debugging
        console.log('Raw Date and Time:', date, blocked_slot.start_time, blocked_slot.end_time);

        // Parse date and time strings correctly
        const startDate = new Date(`${blocked_slot.start_time}`);
        const endDate = new Date(`${blocked_slot.end_time}`);

        // Log parsed dates for debugging
        console.log('Parsed Start Date:', startDate);
        console.log('Parsed End Date:', endDate);

        return {
          name: 'Blocked Time Slot',
          start: startDate,
          end: endDate,
          color: 'red',
          timed: true,
        };
      });

      // Merge the formattedBlockedTimeSlots with existing events and set it
      this.events = [...this.events, ...formattedBlockedTimeSlots];

      // Log the updated events array for debugging
      console.log('Updated Events Array:', this.events);
    } else {
      console.warn('Blocked Time Slots data is empty or invalid:', blockedTimeSlots);
    }
  } catch (error) {
    console.error('Error fetching blocked time slots:', error);
  }
},











    async fetchAvailableTimeSlots(date) {
      try {
        // Make an Axios API call to fetch available time slots
        // const response = await axios.get(`http://localhost:5001/availabletimeslots/${this.user_id}/${date}`);
        const response = await axios.get(this.api_key+`/availabletimeslots/${this.user_id}/${date}`);
        const availableTimeSlots = response.data.available_time_slots;

        // Set the available time slots to the newly fetched data
        this.availableTimeSlots = availableTimeSlots;
        console.log('Available Time Slots:', typeof availableTimeSlots);


        // console.log('Available Time Slots:', availableTimeSlots); // Add this line for debugging
      } catch (error) {
        console.error('Error fetching available time slots:', error);
      }

    },
    changeView (newType) {
      this.type = newType

      switch (newType) {
        case 'day':
          // eslint-disable-next-line no-case-declarations
          const currentDate = new Date().toISOString().split('T')[0];
          this.fetchDailyAppointments(currentDate);
          this.fetchBlockedTimeSlots(currentDate);
          break;
        case 'week':
          this.fetchWeeklyAppointments();
          break;
        case 'month':
          this.fetchMonthlyAppointments();
          break;
        case '4day':
          this.fetch4DayAppointments();
          break;
        default:
          break;
      }
    },

    async fetchDailyAppointments(date) {
      try {
        // Make an Axios API call to fetch daily appointments for the specified date
        // const response = await axios.get(`http://localhost:5001/dailyappointments/${this.user_id}/${date}`);
        const response = await axios.get(this.api_key+`/dailyappointments/${this.user_id}/${date}`);
        const dailyAppointments = response.data.appointments;
        console.log('Daily Appointments:', typeof dailyAppointments)

        // Map the API response to the format expected by the calendar component
        const newEvents = dailyAppointments.map(appointment => ({
          name: appointment.service.service_name,
          start: new Date(appointment.appointment_date_time),
          end: new Date(appointment.appointment_end_date_time),
          color: '#add8e6',
          timed: true,
          data: appointment,
          payment_method: appointment.payment_method,
        }));

        // Clear existing events and set them to the newly fetched data
        this.events = newEvents;

        console.log('Daily Appointments for', date, ':', this.events);
      } catch (error) {
        console.error('Error fetching daily appointments:', error);
      }
    },


    async fetchWeeklyAppointments() {
      try {
        // Make an Axios API call to fetch weekly appointments
        // const response = await axios.get(`http://localhost:5001/weeklyappointments/${this.user_id}`);
        const response = await axios.get(this.api_key+`/weeklyappointments/${this.user_id}`);
        const weeklyAppointments = response.data.appointments;

        // Map the API response to the format expected by the calendar component
        const newEvents = weeklyAppointments.map(appointment => ({
          name: appointment.service.service_name,
          start: new Date(appointment.appointment_date_time),
          end: new Date(appointment.appointment_end_date_time),
          color: '#add8e6',
          timed: true,
          data: appointment,
        }));

        // Clear existing events and set them to the newly fetched data
        this.events = newEvents;

        console.log('Weekly Appointments:', this.events);
      } catch (error) {
        console.error('Error fetching weekly appointments:', error);
      }
    },

    async fetchMonthlyAppointments() {
      try {
        // Make an Axios API call to fetch monthly appointments
        // const response = await axios.get(`http://localhost:5001/monthlyappointments/${this.user_id}`);
        const response = await axios.get(this.api_key+`/monthlyappointments/${this.user_id}`);
        const monthlyAppointments = response.data.appointments;

        // Map the API response to the format expected by the calendar component
        const newEvents = monthlyAppointments.map(appointment => ({
          name: appointment.service.service_name,
          start: new Date(appointment.appointment_date_time),
          end: new Date(appointment.appointment_end_date_time),
          color: '#add8e6',
          timed: true,
          data: appointment,
        }));

        // Clear existing events and set them to the newly fetched data
        this.events = newEvents;

        console.log('Monthly Appointments:', this.events);
      } catch (error) {
        console.error('Error fetching monthly appointments:', error);
      }
    },

    async fetch4DayAppointments() {
      try {
        // Make an Axios API call to fetch 4-day appointments
        // const response = await axios.get(`http://localhost:5001/4dayappointments/${this.user_id}`);
        const response = await axios.get(this.api_key+`/4dayappointments/${this.user_id}`);
        const fourDayAppointments = response.data.appointments;

        // Map the API response to the format expected by the calendar component
        const newEvents = fourDayAppointments.map(appointment => ({
          name: appointment.service.service_name,
          start: new Date(appointment.appointment_date_time),
          end: new Date(appointment.appointment_end_date_time),
          color: '#add8e6',
          timed: true,
          data: appointment,
        }));

        // Clear existing events and set them to the newly fetched data
        this.events = newEvents;

        console.log('4-Day Appointments:', this.events);
      } catch (error) {
        console.error('Error fetching 4-day appointments:', error);
      }
    },


    calculateTotalCost() {
  let totalCost = 0;

  // Iterate through the events and sum up the service prices
  for (const event of this.events) {
    if (event.data && event.data.service && event.data.service.service_price) {
      totalCost += event.data.service.service_price;
    }
  }

  return totalCost;
},

async cancelAppointment() {
  try {
    // Make an Axios API call to cancel the selected appointment
    // const response = await axios.delete(`http://localhost:5001/cancelappointment/${this.selectedEventInfo.id}`);
    const response = await axios.delete(this.api_key+`/cancelappointment/${this.selectedEventInfo.id}`);
    console.log('Cancel Appointment Response:', response);

    // Assuming the server response indicates success, update the appointment status locally
    if (response.status === 200) {
      // Update the appointment status to "Cancelled"
      this.selectedEventInfo.status = 'Cancelled';

      // Emit an event to notify the parent component of the updated data
      this.$emit('save', this.selectedEventInfo);
    }

    // Close the dialog
    this.selectedOpen = false;
  } catch (error) {
    console.error('Error cancelling appointment:', error);
  }
},


  
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
      this.fetchDailyAppointments();
      this.fetchBlockedTimeSlots();
    },
    getEventColor (event) {
      return event.color
    },
    setToday() {
    // Calculate the current date in the local timezone
    const today = new Date();
    today.setHours(today.getHours()); // Subtract 5 hours for CST (UTC-6)
    
    console.log('Today in CST HMMMM:', today); // Add this line for debugging
    // Format the current date to match your date format (e.g., "YYYY-MM-DD")
    const formattedToday = today.toISOString().split('T')[0];

    // Set the focus to the current date
    this.focus = today;

    // Fetch data for the current day
    this.fetchDailyAppointments(formattedToday);
    this.fetchBlockedTimeSlots(formattedToday);
  },

    async prev() {
      const prevDate = new Date(this.focus);
      prevDate.setDate(prevDate.getDate() - 1); // Go to the previous day
      this.focus = prevDate;
      const formattedDate = prevDate.toISOString().split('T')[0];
      console.log('Formatted Date:', formattedDate); // Add this line for debugging
      this.fetchDailyAppointments(formattedDate);
      this.fetchBlockedTimeSlots(formattedDate);
      this.fetchAvailableTimeSlots(formattedDate);
    },
      
    async next() {
      const nextDate = new Date(this.focus);
      nextDate.setDate(nextDate.getDate() + 1); // Go to the next day
      this.focus = nextDate;
      const formattedDate = nextDate.toISOString().split('T')[0];
      console.log('Formatted Date:', formattedDate); // Add this line for debugging
      this.fetchDailyAppointments(formattedDate);
      this.fetchAvailableTimeSlots(formattedDate);
      this.fetchBlockedTimeSlots(formattedDate);
    },

    showEvent({ nativeEvent, event }) {
  // Assign the clicked event's data to the selectedEventInfo property
  this.selectedEventInfo = event.data;

  // Log selectedEventInfo to check if it contains appointment_id
  console.log('Selected Event Info:', this.selectedEventInfo);

  // Store a reference to the DOM element that triggered the event click
  this.selectedElement = nativeEvent.target;

  // Open the event details card
  this.selectedOpen = true;

  // Prevent the click event from propagating further up the DOM tree
  nativeEvent.stopPropagation();
},


    updateRange({ start }) {
  const events = [];

  // Assume the date range is only one day for simplicity.
  const baseDate = new Date(`${start.date}T00:00:00`);

  // Add a non-event from 12:00 AM to 4:00 PM to block off this time.
  events.push({
    name: "Non-Event",
    start: new Date(baseDate),
    end: new Date(baseDate.setHours(16, 0, 0, 0)),
    color: 'transparent', // or set to the background color to make it invisible
    timed: true,
  });



  this.events = events;
},



    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },

}
</script>

<style scoped>
.divider {
  margin: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.total-cost {
  margin: 20px 0;
  text-align: center;
}

</style>
