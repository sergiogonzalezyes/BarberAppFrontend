<template>
  <v-footer padless>
    <v-card class="text-center" flat tile>
      <v-card-title class="justify-center">
        <div class="subheading">Follow us on Instagram!</div>
        <div class="icon-group">
          <v-btn
            class="mx-2"
            :color="$vuetify.theme.dark ? 'white' : 'black'"
            icon
            @click="redirectToInstagram"
          >
            <v-icon size="24px">
              mdi-instagram
            </v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="py-2 text-center" :color="$vuetify.theme.dark ? 'white' : 'black'">
        {{ new Date().getFullYear() }} — <strong>D-Cutz</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterPartial',
  methods: {
    redirectToInstagram() {
      window.open('https://instagram.com/danny_37posey?igshid=NzZlODBkYWE4Ng==', '_blank');
    },
  },
};
</script>

<style scoped>
.subheading {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

.icon-group {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
