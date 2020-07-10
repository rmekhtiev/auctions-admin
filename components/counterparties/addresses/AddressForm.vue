<template>
  <v-form>
    <v-text-field
      v-model="value.country_code"
      label="Страна"
      :rules="rules.country_code"
    />
    <v-text-field v-model="value.state" label="Область" :rules="rules.state" />
    <v-text-field v-model="value.city" label="Город" :rules="rules.city" />
    <v-text-field
      v-model="value.address"
      label="Адрес"
      :rules="rules.address"
    />
    <v-text-field
      v-model="value.postal_code"
      label="Индекс"
      :rules="rules.postal_code"
      counter="6"
      @keypress="onlyNumber"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  name: 'AddressForm',
  mixins: [resourceForm],
  data: () => ({
    rules: {
      country_code: [(value) => !!value || 'Это поле обязательное'],
      state: [(value) => !!value || 'Это поле обязательное'],
      city: [(value) => !!value || 'Это поле обязательное'],
      address: [(value) => !!value || 'Это поле обязательное'],
      postal_code: [(value) => !!value || 'Это поле обязательное'],
    },
  }),
}
</script>
