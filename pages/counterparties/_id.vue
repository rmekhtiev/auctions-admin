<template>
  <div id="counterparty">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <counterparty-info-card :counterparty="counterparty" no-link />
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <counterparty-legal-card :counterparty="counterparty" no-link />
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
    ])
  },

  computed: {
    counterparty() {
      return this.$store.getters['counterparties/byId']({
        id: this.$route.params.id,
      })
    },
  },
}
</script>
