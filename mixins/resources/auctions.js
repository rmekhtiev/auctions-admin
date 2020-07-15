export default {
  data: () => ({
    auctionStatuses: [
      { title: 'Черновик', value: 'DRAFT' },
      { title: 'На модерации', value: 'PENDING' },
      { title: 'Предстоящий', value: 'UPCOMING' },
      { title: 'Отмененные', value: 'CANCELLED' },
      { title: 'Несостоявшиеся', value: 'FAILED' },
      { title: 'Состоявшиеся', value: 'SUCCESSED' },
    ],
  }),

  computed: {},

  methods: {
    openAuctionPage({ id }) {
      this.$router.push({ name: 'auctions-id', params: { id } })
    },

    loadAuction({ id }) {
      return this.$store.dispatch('auctions/loadById', { id })
    },

    async deleteAuction({ id }) {
      const res = await this.$dialog.confirm({
        text: 'Вы уверены, что хотите удалить аукцион?',
        title: 'Внимание',
      })

      if (res !== false) {
        this.$store.dispatch('auctions/delete', { id }).then(() => {
          this.$router.push({ name: 'auctions' })
        })
      }
    },

    async updateStatus(auction, newStatus) {
      const translation = this.$t(`auctions.statuses.${newStatus}.self`)

      const res = await this.$dialog.confirm({
        text: `Вы уверены, что хотите обновить статус на ${translation}?`,
        title: 'Внимание',
        persistent: true,
      })

      if (res !== false) {
        auction.attributes.status = newStatus

        return this.$store.dispatch('auctions/update', auction)
      }
    },
  },
}
