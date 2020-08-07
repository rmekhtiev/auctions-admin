<template>
  <div>
    <v-text-field
      v-model="full_name"
      label="ФИО"
      placeholder="Введите ФИО"
      :rules="rules.counterparties.full_name"
    />
    <v-text-field
      v-model="passport_number"
      label="Серия и номер паспорта"
      placeholder="Введите серию и номер паспорта"
    />
    <v-text-field
      v-model="passport_personal"
      label="Личный номер паспорта"
      placeholder="Введите личный номер паспорта"
    />
    <v-text-field
      v-model="passport_issuer"
      label="Кем выдан паспорт"
      placeholder="Введите кем выдан паспорт"
    />
    <v-text-field
      v-model="passport_date"
      label="Когда выдан паспорт"
      placeholder="Введите когда выдан паспорт"
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
  name: 'IndividualForm',
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

    document: {},
    passport_number: '',
    passport_issuer: '',
    passport_date: '',
    passport_personal: '',

    name: {},
    full_name: '',
  }),
  watch: {
    full_name(val) {
      // ? todo: как поправить?
      Object.assign(this.name, { full_name: val })
      Object.assign(this.value, { name: this.name })
    },
    passport_number(val) {
      // ? todo: как поправить?
      Object.assign(this.document, { passport_number: val })
      Object.assign(this.value, { document: this.document })
    },
    passport_issuer(val) {
      // ? todo: как поправить?
      Object.assign(this.document, { passport_issuer: val })
      Object.assign(this.value, { document: this.document })
    },
    passport_date(val) {
      // ? todo: как поправить?
      Object.assign(this.document, { passport_date: val })
      Object.assign(this.value, { document: this.document })
    },
    passport_personal(val) {
      // ? todo: как поправить?
      Object.assign(this.document, { passport_personal: val })
      Object.assign(this.value, { document: this.document })
    },
  },
  created() {
    // eslint-disable-next-line no-prototype-builtins
    this.full_name = this.final.hasOwnProperty('name')
      ? this.final.name.full_name
      : ''
    // eslint-disable-next-line no-prototype-builtins
    this.passport_number = this.final.hasOwnProperty('document')
      ? this.final.document.passport_number
      : ''
    // eslint-disable-next-line no-prototype-builtins
    this.passport_issuer = this.final.hasOwnProperty('document')
      ? this.final.document.passport_issuer
      : ''
    // eslint-disable-next-line no-prototype-builtins
    this.passport_date = this.final.hasOwnProperty('document')
      ? this.final.document.passport_date
      : ''
    // eslint-disable-next-line no-prototype-builtins
    this.passport_personal = this.final.hasOwnProperty('document')
      ? this.final.document.passport_personal
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
