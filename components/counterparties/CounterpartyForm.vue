<template>
  <v-form>
    <v-select
      v-model="value._type"
      label="Тип"
      placeholder="Введите тип"
      :items="types"
    />
    <v-text-field v-model="value.inn" label="УНП" placeholder="Введите УНП" />
    <v-text-field
      v-model="value.egr_date"
      label="Дата ЕГР"
      placeholder="Введите дату внесения в ЕГР"
    />
    <v-text-field
      v-model="full_name"
      label="Полное название организации"
      placeholder="Введите полное название организации"
    />
    <v-text-field
      v-model="short_name"
      label="Краткое название организации"
      placeholder="Введите краткое название организации"
    />
    <v-text-field
      v-model="value.email"
      label="Электронная почта"
      placeholder="Введите электронную почту"
    />
    <v-text-field
      v-model="value.phone"
      label="Номер телефона"
      placeholder="Введите номер телефона"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  name: 'CounterpartyForm',
  mixins: [resourceForm],
  data: () => ({
    menu: false,
    full_name: '',
    short_name: '',
    name: {},
    types: ['UL'],
  }),
  watch: {
    full_name(val) {
      // ? todo: как поправить?
      Object.assign(this.name, { full_name: val })
      Object.assign(this.value, { name: this.name })
    },
    short_name(val) {
      // ? todo: как поправить?
      Object.assign(this.name, { short_name: val })
      Object.assign(this.value, { name: this.name })
    },
  },
}
</script>
