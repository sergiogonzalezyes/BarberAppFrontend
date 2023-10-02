<template>
  <div class="home">
    <HomeLayout />
    <FooterPartial />
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


@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
