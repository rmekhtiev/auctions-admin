<template>
  <v-form>
    <v-text-field
      ref="login"
      v-model="value.login"
      prepend-icon="mdi-account"
      label="Логин"
      required
    />
    <v-text-field
      ref="email"
      v-model="value.email"
      prepend-icon="mdi-email"
      label="E-mail"
      required
    />
    <v-select
      ref="role"
      v-model="value.role"
      :items="roles"
      item-text="name"
      item-value="value"
      item-disabled="disabled"
      prepend-icon="mdi-account-box-outline"
      label="Роль"
      required
      :disabled="
        final.role === 'ADMIN' && authUser.attributes.role === 'MODERATOR'
      "
    />
  </v-form>
</template>

<script>
import resourceForm from '../../mixins/resourceForm'

export default {
  name: 'UserForm',
  mixins: [resourceForm],
  props: {
    authUser: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    roles: [
      { value: 'ADMIN', name: 'Администратор', disabled: false },
      { value: 'MODERATOR', name: 'Модератор', disabled: false },
      { value: 'USER', name: 'Пользователь', disabled: false },
      { value: 'BANKRUPTCY_MANGER', name: 'Антикризисный', disabled: false },
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 100)
    this.roles.map((item) => {
      this.authUser.attributes.role === 'MODERATOR' &&
      (item.value === 'ADMIN' || item.value === 'MODERATOR')
        ? (item.disabled = true)
        : (item.disabled = false)
    })
  },
}
</script>
