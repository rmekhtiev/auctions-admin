<template>
  <v-list-item v-if="$auth.loggedIn" two-line>
    <v-list-item-avatar>
      <v-avatar color="primary">
        <span class="white--text headline">
          {{ $auth.user.attributes.avatar_name }}
        </span>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="title">
        {{ $auth.user.attributes.name }}
      </v-list-item-title>
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
