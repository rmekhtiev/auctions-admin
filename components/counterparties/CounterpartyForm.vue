<template>
  <v-form>
    <v-text-field
      v-model="value.type"
      label="Тип"
      placeholder="Введите тип"
      :value="'UL'"
    />
    <v-text-field v-model="value.inn" label="УНП" placeholder="Введите УНП" />
    <v-text-field v-model="value.egr" label="ЕГР" placeholder="Введите ЕГР" />
    <v-text-field
      v-model="value.egr_date"
      label="Дата выдачи ЕГР"
      placeholder="Введите дату выдачи ЕГР"
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
  }),
  watch: {
    full_name() {
      // todo
      Object.assign(this.name, { full_name: this.full_name })
      Object.assign(this.value, { name: this.name })
    },
    short_name() {
      // todo
      Object.assign(this.name, { short_name: this.short_name })
      Object.assign(this.value, { name: this.name })
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.inn.focus()
    }, 100)
  },
}
</script>
