<template>
  <v-app>
    <the-drawer v-model="drawer" />
    <v-app-bar fixed app dark color="secondary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main style="background-color: rgb(248, 250, 254);">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      title: 'Реалторги',
    }
  },
}
</script>
