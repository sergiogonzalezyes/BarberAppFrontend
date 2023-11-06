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
      <v-sheet height="600">
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
      </ul>
    </div>
  </v-card-text>
  <v-card-actions>
    <v-btn
      text
      color="secondary"
      @click="selectedOpen = false"
    >
      Cancel
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
    
    }),
    mounted() {
    // Get user_id from local storage
    this.user_id = localStorage.getItem('userID');
    console.log('User ID:', this.user_id);

    // Set the default focus to today's date in CST
    const today = new Date();
    today.setHours(today.getHours() - 1); // Subtract 5 hours for CST (UTC-6)
    console.log('Today in CST:', today); // Add this line for debugging
    this.focus = today;
    const formattedToday = today.toISOString().split('T')[0];
    console.log('Formatted Today in CST:', formattedToday); // Add this line for debugging

    // Fetch user-specific appointments for today's date
    this.fetchDailyAppointments(formattedToday);
    this.type = 'day'; // Set the default view to daily
    this.updateRange({ start: { date: formattedToday } }); // Load events for today
    this.$refs.calendar.checkChange();
  },



  methods: {
    changeView (newType) {
      this.type = newType

      switch (newType) {
        case 'day':
          // eslint-disable-next-line no-case-declarations
          const currentDate = new Date().toISOString().split('T')[0];
          this.fetchDailyAppointments(currentDate);
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
        const response = await axios.get(`http://localhost:5001/dailyappointments/${this.user_id}/${date}`);
        const dailyAppointments = response.data.appointments;

        // Map the API response to the format expected by the calendar component
        const newEvents = dailyAppointments.map(appointment => ({
          name: appointment.service.service_name,
          start: new Date(appointment.appointment_date_time),
          end: new Date(appointment.appointment_end_date_time),
          color: '#add8e6',
          timed: true,
          data: appointment,
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
        const response = await axios.get(`http://localhost:5001/weeklyappointments/${this.user_id}`);
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
        const response = await axios.get(`http://localhost:5001/monthlyappointments/${this.user_id}`);
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
        const response = await axios.get(`http://localhost:5001/4dayappointments/${this.user_id}`);
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

  
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
      this.fetchDailyAppointments();
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    async prev() {
      const prevDate = new Date(this.focus);
      prevDate.setDate(prevDate.getDate() - 1); // Go to the previous day
      this.focus = prevDate;
      const formattedDate = prevDate.toISOString().split('T')[0];
      console.log('Formatted Date:', formattedDate); // Add this line for debugging
      this.fetchDailyAppointments(formattedDate);
    },
      
    async next() {
      const nextDate = new Date(this.focus);
      nextDate.setDate(nextDate.getDate() + 1); // Go to the next day
      this.focus = nextDate;
      const formattedDate = nextDate.toISOString().split('T')[0];
      console.log('Formatted Date:', formattedDate); // Add this line for debugging
      this.fetchDailyAppointments(formattedDate);
    },

    showEvent({ nativeEvent, event }) {
      // Assign the clicked event's data to the selectedEventInfo property
      this.selectedEventInfo = event.data;

      // Store a reference to the DOM element that triggered the event click
      this.selectedElement = nativeEvent.target;

      // Open the event details card
      this.selectedOpen = true;

      // Prevent the click event from propagating further up the DOM tree
      nativeEvent.stopPropagation();
    },

    updateRange({ start }) {
  const events = []

  // Assume the date range is only one day for simplicity.
  const baseDate = new Date(`${start.date}T00:00:00`)

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


</style>
