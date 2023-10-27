<template>
    <div class="parentdiv">
        <ServicesLayout :services="services" :userRole="userRole" class="cards"/>
        <v-divider class="my-5"></v-divider>
        <FooterPartial />
    </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import axios from 'axios';
import ServicesLayout from '@/components/ServicesLayout.vue';
import { mapState } from 'vuex';
import FooterPartial from '@/components/FooterPartial.vue';

export default {
    data() {
        return {
        services:[],
        };
    },
    computed: {
        ...mapState({
        userRole: state => state.app.role,
        userId: state => state.app.user_id,
        }),
    },
    // fetch services if the user is not logged in and there is no recognized userRole or UserId
    methods: {
  // fetch services if user is not logged in and there is no recognized userRole or UserId
  fetchServicesForNonLoggedInUser() {
  axios.get('http://localhost:5001/services')
    .then((response) => {
      const servicesData = response.data.services;
      // Manually add image paths to each service based on naming convention
      const servicesWithImages = servicesData.map((service, index) => {
        const imageNumber = (index % 3) + 1; // Cycles through 1, 2, 3
        return {
          ...service,
          image: `sample${imageNumber}.png`, // Adjust the path accordingly
        };
      });

      this.services = servicesWithImages;
      console.log(this.services);
    })
    .catch((error) => {
      console.log(error);
    });
},






    },
    created() {
    // Call the function for non-logged-in users or other roles
    this.fetchServicesForNonLoggedInUser();
},

    components: {
        ServicesLayout,
        FooterPartial,
    },

    mounted() {
        console.log('BookingModal mounted');
    },
    beforeDestroy() {
        console.log('BookingModal will be destroyed');
    }
    };
</script>
  
<style scoped>
.parentdiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 1rem;
}
.cards {
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    
}

@media (min-width: 1024px) {
    .parentdiv {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}


</style>