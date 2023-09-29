<template>
  <div class="notifications">
    <NotificationsList />
  </div>
</template>

<script>
import NotificationsList from '../components/NotificationsList.vue';

export default {
  components: {
    NotificationsList,
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .notifications {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
