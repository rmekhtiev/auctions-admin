<template>
  <v-form>
    <v-select
      v-model="value._type"
      label="Тип"
      placeholder="Введите тип"
      :items="types"
      :rules="rules.type"
    >
    </v-select>
    <v-text-field
      v-model="value.inn"
      label="УНП"
      placeholder="Введите УНП"
      counter="9"
      :rules="rules.inn"
    />
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="value.egr_date"
          label="Дата ЕГР"
          placeholder="Введите дату внесения в ЕГР"
          :rules="rules.egr_date"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="value.egr_date"
        @input="menu = false"
        locale="ru"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="full_name"
      label="Полное название организации"
      placeholder="Введите полное название организации"
      :rules="rules.full_name"
    />
    <v-text-field
      v-model="short_name"
      label="Краткое название организации"
      placeholder="Введите краткое название организации"
      :rules="rules.short_name"
    />
    <v-text-field
      v-model="value.email"
      label="Электронная почта"
      placeholder="Введите электронную почту"
      :rules="rules.email"
    />
    <v-text-field
      v-model="value.phone"
      label="Номер телефона"
      placeholder="Введите номер телефона"
      @keypress="onlyNumber"
      :rules="rules.phone"
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
  methods: {
    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault()
      }
    },
  },
}
</script>
