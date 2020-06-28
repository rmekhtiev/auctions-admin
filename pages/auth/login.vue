<template>
  <v-layout align-center justify-center column fill-height>
    <v-card class="elevation-1 pa-3">
      <v-card-text>
        <v-form @submit.prevent="login()" @keyup.enter="login()">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            name="email"
            autocomplete="username"
          >
          </v-text-field>
          <v-text-field
            v-model="form.password"
            :append-icon="password_visible ? 'visibility' : 'visibility_off'"
            label="Пароль"
            :type="password_visible ? 'text' : 'password'"
            name="password"
            autocomplete="current-password"
            @click:append="password_visible = !password_visible"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.prevent="login()">
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  layout: 'minimal',

  data: () => ({
    password_visible: false,
    form: {
      email: '',
      password: '',
    },
  }),

  methods: {
    login() {
      this.$auth.loginWith('local', {
        data: this.form,
      })
    },
  },
}
</script>
