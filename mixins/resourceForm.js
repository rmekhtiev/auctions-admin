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

      this.$emit('input', finalized)
    },
  },
}
