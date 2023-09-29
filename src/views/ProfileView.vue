<template>
    <div class="profile">
      <ProfileLayout />
    </div>
</template>
  
<script>
  import ProfileLayout from '../components/ProfileLayout.vue';
  
  export default {
    components: {
      ProfileLayout,
    },
  };
</script>
  
<style>
  @media (min-width: 1024px) {
    .profile {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
  