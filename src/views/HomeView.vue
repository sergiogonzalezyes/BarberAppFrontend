<template>
  <div class="home">
    <div class="content-container">
      <HomeLayout />
    </div>
    <div class="footer-container">
      <FooterPartial />
    </div>
  </div>
</template>

<script>
import HomeLayout from '../components/HomeLayout.vue';
import FooterPartial from '@/components/FooterPartial.vue';

export default {
  name: 'HomeView',
  components: {
    HomeLayout,
    FooterPartial,
  },
};
</script>

<style>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes the footer to the bottom */
}

.content-container {
  flex: 1; /* Makes sure the content container takes up all available space */
  display: flex;
  justify-content: center;
  align-items: center; /* Vertically center the HomeLayout */
}

.footer-container {
  flex: 1; /* Makes sure the content container takes up all available space */
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  .home {
    padding: 20px 0; /* Optional: Add some padding on larger screens */
  }
}
</style>
