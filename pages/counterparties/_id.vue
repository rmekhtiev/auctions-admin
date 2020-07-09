<template>
  <div id="counterparty">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <counterparty-info-card
          :counterparty="counterparty"
          :address="address"
          no-link
        />
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <counterparty-legal-card
          :counterparty="counterparty"
          :address="address"
          no-link
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CounterpartyInfoCard from '../../components/counterparties/CounterpartyInfoCard'
import CounterpartyLegalCard from '../../components/counterparties/CounterpartyLegalCard'

export default {
  components: { CounterpartyLegalCard, CounterpartyInfoCard },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('counterparties/loadById', {
        id: params.id,
        options: {
          // XDEBUG_SESSION_START: 'PHPSTORM'
        },
      }),
      store.dispatch('addresses/loadRelated', {
        parent: { id: params.id, type: 'counterparties' },
        relationship: 'address',
      }),
    ])
  },

  computed: {
    counterparty() {
      return this.$store.getters['counterparties/byId']({
        id: this.$route.params.id,
      })
    },
    address() {
      return this.$store.getters['addresses/related']({
        parent: {
          id: this.$route.params.id,
          type: 'counterparties',
        },
        relationship: 'address',
      })
    },
  },
}
</script>
