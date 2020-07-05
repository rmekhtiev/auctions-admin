export default {
  data: () => ({}),
  computed: {},
  methods: {
    openCounterpartyPage({ id }) {
      this.$router.push({ name: 'counterparties-id', params: { id } })
    },
  },
}
