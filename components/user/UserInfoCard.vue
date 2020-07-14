<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        Пользователь
      </div>
      <v-spacer />
      <v-btn icon @click="updateUser()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
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
            <v-icon x-small color="red darken-4">
              mdi-close-circle-outline
            </v-icon>
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
      <v-list-item two-line>
        <v-list-item-icon>
          <v-icon>
            mdi-calendar
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $moment(user.attributes.created_at).format('ll') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Дата регистрации
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import UserDialog from '~/components/user/UserDialog'

export default {
  name: 'UserInfoCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async updateUser() {
      const dialog = await this.$dialog.showAndWait(UserDialog, {
        final: this.user,
        authUser: this.$auth.user, // Так как в диалоге нельзя вызвать $auth, передаем prop todo
        persistent: true,
      })

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          id: this.user.id,
          type: 'users',
        }
        this.$store.dispatch('users/update', formData)
      }
    },
  },
}
</script>
