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
      prepend-icon="mdi-account-box-outline"
      label="Роль"
      required
      :disabled="final.role === 'MODERATOR'"
    >
      <template v-slot:item="{ item }">{{ item }}</template>
    </v-select>
    <v-select
      ref="role"
      v-model="value.role"
      :items="roles"
      prepend-icon="mdi-account-box-outline"
      label="Роль"
      required
      :disabled="final.role === 'MODERATOR'"
    >
      <template v-slot:item="{ item }">{{ item }}</template>
    </v-select>
  </v-form>
</template>

<script>
import resourceForm from '../../mixins/resourceForm'

export default {
  name: 'UserForm',
  mixins: [resourceForm],
  data: () => ({
    roles: ['ADMIN', 'MODERATOR', 'USER', 'BANKRUPTCY_MANGER'],
  }),
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 100)
    console.log(this.$auth)
  },
}
</script>
