<template>
  <div id="auction">
    <v-row>
      <v-col sm="12" md="6">
        <auction-info-card :auction="auction" />
      </v-col>
      <v-col sm="12" md="6">
        <counterparty-info-card
          :counterparty="
            $store.getters['counterparties/byId']({
              id: auction.relationships.organizer.data.id,
            })
          "
          :heading="'Организатор'"
          class="mb-8"
        />
        <counterparty-info-card
          :counterparty="
            $store.getters['counterparties/byId']({
              id: auction.relationships.seller.data.id,
            })
          "
          :heading="'Продавец'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuctionInfoCard from '~/components/auctions/AuctionInfoCard'
import CounterpartyInfoCard from '~/components/counterparties/CounterpartyInfoCard'
export default {
  components: { CounterpartyInfoCard, AuctionInfoCard },
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
  },
}
</script>
