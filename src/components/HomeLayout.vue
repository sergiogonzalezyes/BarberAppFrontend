<template>
  <div>
    <!-- Parallax Component for Nice Background -->
    <v-parallax 
      height="400" 
      :src="backgroundImage"
      contain
      class="background-image text-center text-white "
    >
    </v-parallax>
    <v-divider class="my-5"></v-divider>
    <v-col align="center">
      <v-btn
        color="transparent"
        class="mx-0"
        large
        border-radius="20"
        @click="handleBookNow"
      >
        Book an Appointment
      </v-btn>
    </v-col>
    <v-divider class="my-5"></v-divider>
    <v-col align="center">
      <v-btn
        color="transparent"
        class="mx-0"
        large
        border-radius="20"
        @click="handleBookNow"
      >
        Services
      </v-btn>
    </v-col>
    <v-divider class="my-5"></v-divider>

    <!-- Carousel for Photos -->
    <v-container fluid class="my-5">
    <v-carousel cycle>
      <v-carousel-item 
        class="carousel-item"
        v-for="(photo, index) in photos"
        :key="index"
        
      >
        <v-img 
          :src="photo.src" 
          :alt="photo.alt" 
          height="100%"
          class="white--text align-end carousel-img"

        >
          <v-card-title class="headline carousel-title ">{{ photo.alt }}</v-card-title>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundImage: require('@/assets/d_cutz_mobile.jpg'),
      photos: [
        {
          src: 'sample1.png',// Adjust the paths
          alt: 'About Us',
          path: '/about',
        },
        {
          src: 'sample2.png',  // Adjust the paths
          alt: 'Promotions',
        },
        {
          src: 'sample3.png',  // Adjust the paths
          alt: 'Reviews',
        },
      ],
    };
  },
  methods: {
    handleBookNow() {
      this.$router.push('/services');
    },
  },
};
</script>


<style scoped>
.background-image {
  background: rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* New Styles for Carousel */
.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-img {
  object-fit: cover;
  width: 100%;
}

.carousel-title {
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  margin-bottom: 440px;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>