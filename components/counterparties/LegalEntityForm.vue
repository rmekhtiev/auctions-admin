<template>
  <div>
    <v-text-field
      v-model.trim="value.inn"
      label="УНП"
      placeholder="Введите УНП"
      counter="9"
      :rules="rules.counterparties.inn"
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
          :rules="rules.counterparties.egr_date"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="value.egr_date"
        locale="ru"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="full_name"
      label="Полное название организации"
      placeholder="Введите полное название организации"
      :rules="rules.counterparties.full_name"
    />
    <v-text-field
      v-model="short_name"
      label="Краткое название организации"
      placeholder="Введите краткое название организации"
      :rules="rules.counterparties.short_name"
    />
    <v-text-field
      v-model="value.email"
      label="Электронная почта"
      placeholder="Введите электронную почту"
      :rules="rules.counterparties.email"
    />
    <v-text-field
      v-model="value.phone"
      label="Номер телефона"
      placeholder="Введите номер телефона"
      :rules="rules.counterparties.phone"
      @keypress="onlyNumber"
    />
  </div>
</template>

<script>
import formRules from '~/mixins/formRules'

export default {
  name: 'LegalEntityForm',
  mixins: [formRules],
  props: {
    value: {
      type: Object,
      required: true,
    },
    final: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    menu: false,

    name: {},
    full_name: '',
    short_name: '',
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
  created() {
    // eslint-disable-next-line no-prototype-builtins
    this.full_name = this.final.hasOwnProperty('name')
      ? this.final.name.full_name
      : ''
    // eslint-disable-next-line no-prototype-builtins
    this.short_name = this.final.hasOwnProperty('name')
      ? this.final.name.short_name
      : ''
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
