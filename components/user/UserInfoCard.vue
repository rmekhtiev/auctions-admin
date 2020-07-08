<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        Пользователь
      </div>
    </v-card-text>
    <v-list>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-avatar color="primary">
            <img :src="user.attributes.avatar" :alt="user.attributes.login" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> @{{ user.attributes.login }} </v-list-item-title>
          <v-list-item-subtitle
            v-if="!user.attributes.verified_at"
            class="red--text text--darken-4"
          >
          <v-icon x-small color="red darken-4">mdi-close-circle-outline</v-icon>
          Не подтвержден
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :href="`mailto:${user.attributes.email}`" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.attributes.email }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>
            mdi-calendar
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $moment(user.attributes.created_at).format('ll') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'UserInfoCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
