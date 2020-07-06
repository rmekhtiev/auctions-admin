export default {
  data: () => ({}),
  computed: {},
  methods: {
    openAuctionPage({ id }) {
      this.$router.push({ name: 'auctions-id', params: { id } })
    },
  },
}
