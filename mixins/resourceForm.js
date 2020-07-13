export default {
  data: () => ({
    rules: {
      email: [
        (value) => !!value || 'Это поле обязательное',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Введите email'
        },
      ],
      inn: [
        (value) => !!value || 'Это поле обязательное',
        (value) => {
          const pattern = /[0-9]{9}/
          return pattern.test(value) || 'Неверный УНП'
        },
      ],
      phone: [(value) => !!value || 'Это поле обязательное'],
      full_name: [(value) => !!value || 'Это поле обязательное'],
      short_name: [(value) => !!value || 'Это поле обязательное'],
      egr_date: [(value) => !!value || 'Это поле обязательное'],
      type: [(value) => !!value || 'Это поле обязательное'],
    },
  }),
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    final: {
      type: Object,
      default: () => ({}),
    },
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.fillDefaultValues()
  },
  methods: {
    fillDefaultValues() {
      const finalized = { ...this.value }

      for (const [key, value] of Object.entries({
        ...this.final,
        ...this.defaultValues,
      })) {
        // consola.trace(`${key}: ${value}`)
        if (!this.value[key]) {
          finalized[key] = value
        }
      }
      Object.assign(this.value, finalized) // ? todo: как поправить?

      this.$emit('input', finalized)
    },
    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault()
      }
    },
  },
}
