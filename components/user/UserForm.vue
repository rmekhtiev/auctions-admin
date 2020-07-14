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
    role: [
      { value: 'ADMIN', name: 'Администратор' },
      { value: 'MODERATOR', name: 'Модератор' },
      { value: 'USER', name: 'Пользователь' },
      { value: 'BANKRUPTCY_MANGER', name: 'Антикризисный' },
    ],
  }),
  computed: {
    roles() {
      this.role.map((item) => {
        item.disabled =
          this.authUser.attributes.role !== 'ADMIN' &&
          (item.value === 'ADMIN' || item.value === 'MODERATOR')
      })
      return this.role
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 100)
  },
}
</script>
