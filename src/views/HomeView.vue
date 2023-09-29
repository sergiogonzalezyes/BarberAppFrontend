<template>
  <div class="home">
    <HomeLayout />
  </div>
</template>

<script>
import HomeLayout from '../components/HomeLayout.vue';


export default {
  name: 'HomeView',
  components: {
    HomeLayout,
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
