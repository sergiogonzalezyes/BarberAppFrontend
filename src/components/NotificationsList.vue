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
        <v-list-item v-for="(item, i) in items" :key="i" :class="{ 'unread-message': item.status === 'Unread' }">
          <v-list-item-content @click="handleNotificationOpen(item)">
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle>{{ item.created_at }}</v-list-item-subtitle>
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
      <!-- Notification modal -->
  <NotificationModal
    v-if="dialogOpen" :notification="selectedNotification" :dialog.sync="dialogOpen" @dialog-closed="handleDialogClosed"
  />
  </v-card>
</template>

<script>
import axios from 'axios';
import NotificationModal from '@/components/NotificationModal.vue';

export default {
    name: 'NotificationsList',
    components: {
      NotificationModal,
    },
    data: () => ({
      items: [],
      user_id: null,
      selectedNotification: null,
      dialogOpen: false,
      api_key: process.env.VUE_APP_PROD_API,
    }),

    methods: {
      handleNotificationOpen(notification) {
            this.selectedNotification = notification;
            this.dialogOpen = true;
        },
        handleDialogClosed() {
            this.dialogOpen = false;
        },
      async fetchNotifications() {
        try {
          // Fetch the user ID directly from the store
          this.user_id = localStorage.getItem('userID'); // Retrieve user_id from localStorage

          // Fetch notifications using the user ID
          // const response = await axios.get(`http://localhost:5001/notifications/${this.user_id}`);
          const response = await axios.get(this.api_key+`/notifications/${this.user_id}`);

          this.items = response.data.notifications;

          // console.log('Notifications:', this.items);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      },
      formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString(); // You can adjust the format as needed
      },

      async markAsRead(index) {
        const notificationId = this.items[index].id;
        // console.log('Marking notification as read:', notificationId)
        try {
          // Make an API call to mark the notification as read
          // const response = await axios.put(`http://localhost:5001/mark-as-read/${notificationId}`);
          const response = await axios.put(this.api_key+`/mark-as-read/${notificationId}`);
          if (response.data.success) {
            // Update the status locally
            this.items[index].Notification_Status = 'Read';
          }
        } catch (error) {
          console.error('Error marking notification as read:', error);
        }
      },
      async markAllAsRead() {
        const notificationIds = this.items.map(item => item.id); // Extract all notification IDs
        // console.log('Marking all notifications as read:', notificationIds);
        try {
          // Make an API call to mark all notifications as read
          // const response = await axios.put('http://localhost:5001/mark-all-as-read', {
          const response = await axios.put(this.api_key+'/mark-all-as-read', {
            notificationIds: notificationIds,
          });
          if (response.data.success) {
            // Update the status locally for all notifications
            this.items.forEach(item => (item.status = 'Read'));
          }
        } catch (error) {
          console.error('Error marking all notifications as read:', error);
        }
      },
      deleteNotification(index) {
        this.items.splice(index, 1);
      },
      deleteAllNotifications() {
        this.items = [];
      },
    },
    mounted() {
      // Move this.user_id assignment to the beginning of the mounted hook
      this.user_id = localStorage.getItem('userID'); // Retrieve user_id from localStorage
      this.fetchNotifications();
    },
  };
</script>

<style scoped>

.unread-message {
  /* Add styles for "Unread" messages */
  /* For example, you can change the background color or add a border to make them stand out */
  background-color: hsla(120, 60%, 70%, 0.3); /* Change the background color as desired */
}
</style>
