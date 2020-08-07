export default {
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
  created() {
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
      // Object.assign(this.value, finalized)  ? todo: как поправить?

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
