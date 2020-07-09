<template>
  <div id="auction">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <auction-info-card :auction="auction" class="mb-6" />

        <lots-list-card
          :lots="lots"
          :auction="auction"
          @created="loadAuction({ id: $route.params.id })"
        />
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <counterparty-legal-card
          :counterparty="organizer"
          :heading="'Организатор'"
          class="mb-6"
        />
        <counterparty-legal-card :counterparty="seller" :heading="'Продавец'" />
      </v-col>
      <v-col sm="12" md="6" lg="4" class="order-first order-lg-last">
        <auction-status-card :auction="auction" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import auctions from '~/mixins/resources/auctions'

export default {
  mixins: [auctions],

  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('auctions/loadById', {
        id: params.id,
      }),
      store.dispatch('lots/loadRelated', {
        parent: {
          id: params.id,
          type: 'auctions',
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
    lots() {
      return this.$store.getters['lots/related']({
        parent: this.auction,
      })
    },
    seller() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'seller',
      })
    },
    organizer() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'organizer',
      })
    },
  },

  method: {},
}
</script>
