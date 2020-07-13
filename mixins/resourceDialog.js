export default {
  props: {
    final: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    editedValue: {
      attributes: {},
    },

    actions: {
      false: 'Отмена',
      true: {
        text: 'OK',
        color: 'primary',
      },
    },
  }),
  computed: {
    isCreate() {
      return true
    },
  },
  mounted() {
    // setTimeout(this.fillEditedValue, 1000)
  },
  methods: {
    handleClick(_res, action) {
      this.$emit('submit', action.key === true ? this.editedValue : action.key)
      return false
    },
    fillEditedValue() {
      // this.editedValue.attributes = {
      //   ...this.editedValue.attributes,
      //   ...this.final
      // }
    },
  },
}
