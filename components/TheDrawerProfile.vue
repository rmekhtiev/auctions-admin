<template>
  <v-list-item v-if="$auth.loggedIn" two-line>
    <v-list-item-avatar>
      <v-avatar color="primary">
        <img :src="$auth.user.avatar" :alt="$auth.user.login" />
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="title" v-text="`@${$auth.user.login}`" />
      <v-list-item-subtitle>
        subtext
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="logout()">
        <v-icon color="grey lighten-1">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
  <v-skeleton-loader v-else type="list-item-avatar-two-line" />
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
