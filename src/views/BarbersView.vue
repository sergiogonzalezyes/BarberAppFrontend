<template>
    <div class="barbers">
      <BarbersCRUDops />
    </div>
</template>
  
<script>
  import BarbersCRUDops from '../components/BarbersCRUD.vue';
  
  export default {
    components: {
      BarbersCRUDops,
    },
  };
  </script>
  
  <style>
  @media (min-width: 1024px) {
    .barbers {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
  