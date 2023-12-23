<template>
<div class="parentdiv">
    <ServicesLayout :services="services" :userRole="userRole" class="cards" @service-deleted="handleServiceDeleted" />
    <v-divider class="my-5"></v-divider>
    <FooterPartial />
</div>
</template>

<script>

import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import ServicesLayout from '@/components/ServicesLayout.vue';
import FooterPartial from '@/components/FooterPartial.vue';

export default {
data() {
    return {
    services: [],
    api_key: process.env.PROD_API,
    };
},
computed: {
    // fetch user role and id from localstorage 
    userRole() {
    return localStorage.getItem('userRole');
    },
    userId() {
    return localStorage.getItem('userID');
    },
},
methods: {
    // // Fetch services for non-logged-in users or other roles
    // fetchServicesForNonLoggedInUser() {
    // axios.get('http://localhost:5001/services')
    //     .then((response) => {
    //     this.services = response.data.services;
    //     console.log(this.services);
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    // },

    // Fetch services based on user role
// Fetch services based on user role and add images
fetchServicesBasedOnUserRole() {
  if (this.userRole === 'admin' || this.userRole === 'barber') {
    // Fetch services offered by the logged-in admin or barber
    // axios.get(`http://localhost:5001/services/${this.userId}`)
    axios.get(api_key+`services/${this.userId}`)

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
  } else {
    // Fetch services for non-logged-in users or other roles
    // axios.get('http://localhost:5001/services')
      axios.get(api_key+'services')
      .then((response) => {
        const servicesData = response.data.services;

        // Assuming your API provides image URLs for each service
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
  }
},
handleServiceDeleted(serviceId) {
      // Update the services array by filtering out the deleted service
      this.services = this.services.filter((service) => service.Service_ID !== serviceId);
    },

},
created() {
    // Call the function to fetch services based on user role
    this.fetchServicesBasedOnUserRole();
},
components: {
    ServicesLayout,
    FooterPartial,
},
mounted() {
    console.log('ServicesView mounted');
},
beforeDestroy() {
    console.log('ServicesView will be destroyed');
},
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