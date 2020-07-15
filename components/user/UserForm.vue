<template>
  <v-form>
    <v-text-field
      ref="login"
      v-model="value.login"
      prepend-icon="mdi-account"
      label="Логин"
      required
    ></v-text-field>
    <v-text-field
      ref="email"
      v-model="value.email"
      prepend-icon="mdi-email"
      label="E-mail"
      required
    ></v-text-field>
    <v-select
      ref="role"
      v-model="value.role"
      :items="roles"
      item-text="name"
      item-value="value"
      prepend-icon="mdi-account-box-outline"
      label="Роль"
      required
    >
    </v-select>
  </v-form>
</template>

<script>
import resourceForm from '../../mixins/resourceForm'

export default {
  name: 'UserForm',
  mixins: [resourceForm],
  data: () => ({
    roles: [
      { value: 'ADMIN', name: 'Администратор' },
      { value: 'MODERATOR', name: 'Модератор' },
      { value: 'USER', name: 'Пользователь' },
      { value: 'BANKRUPTCY_MANGER', name: 'Антикризисный' },
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 100)
  },
}
</script>
