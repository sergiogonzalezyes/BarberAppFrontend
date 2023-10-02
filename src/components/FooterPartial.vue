<template>
    <v-footer padless>
      <v-card class="text-center" flat tile>
        <v-card-title class="justify-center">
          <div class="subheading">Get connected with us on social networks!</div>
          <div class="icon-group">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-2"
              light
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text class="py-2 black--text text-center">
          {{ new Date().getFullYear() }} — <strong>D-Cutz</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterPartial',
    data: () => ({
        icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    }),
}
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
