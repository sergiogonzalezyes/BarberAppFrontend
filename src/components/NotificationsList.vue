<template>
  <v-card max-width="600" class="mx-auto">
    <v-toolbar dense :color="$vuetify.theme.dark ? '#555555' : '#ffefdb'">
      <v-toolbar-title>Notifications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small @click="markAllAsRead">Mark All as Read</v-btn>
      <v-btn small @click="deleteAllNotifications">Delete All</v-btn>
    </v-toolbar>
    <v-divider></v-divider>

    <v-list>
      <v-list-item-group v-if="items.length">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.content"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="markAsRead(i)">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn icon @click="deleteNotification(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
      <v-container v-else class="text-center">
        <span>No notifications</span>
      </v-container>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'NotificationsList',
  data: () => ({
  items: [
    {
      title: 'New Appointment Scheduled',
      content: 'John Doe has scheduled an appointment with you for a haircut on Oct 10, 2023, at 10:00 AM.',
      isRead: false,
    },
    {
      title: 'New Appointment Scheduled',
      content: 'Jane Smith has booked a beard trim session with you for Oct 12, 2023, at 2:30 PM.',
      isRead: false,
    },
    {
      title: 'New Appointment Scheduled',
      content: 'Alex Brown wants a buzz cut on Oct 15, 2023, at 11:45 AM. Confirm this in your bookings.',
      isRead: false,
    },
    {
      title: 'Appointment Canceled',
      content: 'Michael Johnson has canceled his hair coloring appointment scheduled for Oct 16, 2023, at 3:00 PM. Open slot available.',
      isRead: false,
    },
  ],
}),

  methods: {
    markAsRead(index) {
      this.items[index].isRead = true;
    },
    markAllAsRead() {
      this.items.forEach(item => (item.isRead = true));
    },
    deleteNotification(index) {
      this.items.splice(index, 1);
    },
    deleteAllNotifications() {
      this.items = [];
    },
  },
};
</script>

<style scoped>
/* You can add any additional styling here */
</style>
