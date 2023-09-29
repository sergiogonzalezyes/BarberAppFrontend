<template>
  <div>
    <!-- Parallax Component for Nice Background -->
    <v-parallax 
      height="400" 
      :src="backgroundImage"
      contain
      class="background-image text-center text-white"
    >

    </v-parallax>

    <v-col align="center">
          <v-btn
            color="transparent"
            class="mx-0"
            large
            href="#"
            border-radius="20"
          >
            Book an Appointment
          </v-btn>
        </v-col>

    <!-- Container for Photos -->
    <v-container fluid class="my-5">
      <v-row>
        <v-col
          v-for="(photo, index) in photos"
          :key="index"
          cols="12"
          md="4"
          class="d-flex align-center"
        >
          <v-card 
            :elevation="6"
            class="flex-grow-1 mx-3"
          >
            <v-img 
              :src="photo.src" 
              :alt="photo.alt" 
              height="300px"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="headline">{{ photo.alt }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>


export default {
  data() {
    return {
      // Example photos
      backgroundImage: require('@/assets/d_cutz_mobile.jpg'),
      photos: [
        {
          src: require('/public/sample1.png'),
          alt: 'Services',
        },
        {
          src: require('/public/sample2.png'),
          alt: 'Promotions',
        },
        {
          src: require('/public/sample3.png'),
          alt: 'Reviews',
        },
        // ... add more photos as needed
      ],
    };
  },
};

</script>

<style scoped>

</style>