<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">Today</div>

          <v-calendar></v-calendar>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :dot-color="message.color"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotificationsList',
  data() {
    return {
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:45am',
          color: 'deep-purple-lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:34am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:45am',
          color: 'deep-purple-lighten-1',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:43am',
          color: 'blue',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:46am',
          color: 'deep-purple-lighten-1',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:41am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:49am',
          color: 'deep-purple-lighten-1',
        },
      ],
    };
  },
};
</script>
