<template>
  <div id="auction">
    <v-row>
      <v-col sm="12" md="6">
        <auction-info-card :auction="auction" />
      </v-col>
      <v-col sm="12" md="6">
        <counterparty-legal-card
          :counterparty="organizer"
          :heading="'Организатор'"
          class="mb-8"
        />
        <counterparty-legal-card :counterparty="seller" :heading="'Продавец'" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuctionInfoCard from '~/components/auctions/AuctionInfoCard'
import CounterpartyLegalCard from '~/components/counterparties/CounterpartyLegalCard'
export default {
  components: { CounterpartyLegalCard, AuctionInfoCard },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('auctions/loadById', {
        id: params.id,
        options: {
          // XDEBUG_SESSION_START: 'PHPSTORM'
        },
      }),
    ])
  },

  computed: {
    auction() {
      return this.$store.getters['auctions/byId']({
        id: this.$route.params.id,
      })
    },
    seller() {
      return this.$store.getters['counterparties/byId']({
        id: this.auction.relationships.seller.data.id,
      })
    },
    organizer() {
      return this.$store.getters['counterparties/byId']({
        id: this.auction.relationships.organizer.data.id,
      })
    },
  },
}
</script>
