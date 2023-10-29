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
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
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
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <!-- Display appointment details here -->
              <div v-if="selectedEvent.id">
                <p>Appointment Date and Time: {{ selectedEvent.appointment_date_time }}</p>
                <p>Status: {{ selectedEvent.status }}</p>
                <p>Customer:</p>
                <ul>
                  <li>Customer User ID: {{ selectedEvent.customer.customer_user_id }}</li>
                  <li>Email: {{ selectedEvent.customer.email }}</li>
                  <li>First Name: {{ selectedEvent.customer.first_name }}</li>
                  <li>Last Name: {{ selectedEvent.customer.last_name }}</li>
                  <li>Phone Number: {{ selectedEvent.customer.phone_number }}</li>
                </ul>
                <p>Service:</p>
                <ul>
                  <li>Service ID: {{ selectedEvent.service.service_id }}</li>
                  <li>Service Name: {{ selectedEvent.service.service_name }}</li>
                  <li>Service Description: {{ selectedEvent.service.service_description }}</li>
                  <li>Service Price: {{ selectedEvent.service.service_price }}</li>
                  <li>Service Duration: {{ selectedEvent.service.service_duration }}</li>
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
  }),
  mounted () {
    // Get user_id from localstorage
    this.user_id = localStorage.getItem('userID');
    console.log('User ID:', this.user_id)
    // Fetch user-specific appointments when the component is mounted
    this.fetchAppointments();
    this.type = 'day'; // set the default view to daily
    // focus on today's date from 4pm to 11pm (hardcoded)
    this.focus = new Date(new Date().setHours(16, 0, 0, 0));

  this.updateRange({ start: { date: this.focus.toISOString().split('T')[0] } }); // load events for today
  this.$refs.calendar.checkChange();
  },
  methods: {
    async fetchAppointments() {
      try {
        const response = await axios.get(`http://localhost:5001/appointmentsforbarber/${this.user_id}`, {
    });
    this.events = response.data.appointments;
    console.log('Appointments:', this.events);
    }
     catch (error) {
      console.error('Error fetching appointments:', error);
      
    }
  },
  
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
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

  // Now add actual events from 4:00 PM to 9:00 PM every hour.
  for (let hour = 16; hour <= 21; hour++) {
    const eventStart = new Date(baseDate);
    eventStart.setHours(hour, 0, 0, 0); // set the hour, the other parameters are for minutes, seconds, milliseconds
    const eventEnd = new Date(eventStart);
    eventEnd.setHours(hour + 1); // end time is one hour later

    events.push({
      name: "Hardcoded Appointment",
      start: eventStart,
      end: eventEnd,
      color: this.colors[this.rnd(0, this.colors.length - 1)],
      timed: true,
    });
  }

  this.events = events;
},

    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },

}
</script>