<template>
  <v-form>
    <v-text-field value="BY" disabled label="Страна" autocomplete="no" />
    <v-text-field
      v-model="value.state"
      label="Область"
      :rules="rules.addresses.state"
      autocomplete="no"
    />
    <v-text-field
      v-model="value.city"
      label="Город"
      :rules="rules.addresses.city"
      autocomplete="no"
    />
    <v-text-field
      v-model="value.address"
      label="Адрес"
      :rules="rules.addresses.address"
      autocomplete="no"
    />
    <v-text-field
      v-model="value.postal_code"
      label="Индекс"
      :rules="rules.addresses.postal_code"
      counter="6"
      autocomplete="no"
      @keypress="onlyNumber"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'
import formRules from '~/mixins/formRules'

export default {
  name: 'AddressForm',
  mixins: [resourceForm, formRules],
}
</script>
