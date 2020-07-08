<template>
  <div id="counterparty">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <counterparty-info-card :counterparty="counterparty" no-link class="mb-8" />
        <contract-info-card :contracts="contracts" />
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
import ContractInfoCard from '~/components/counterparties/contracts/ContractInfoCard'

export default {
  components: { ContractInfoCard, CounterpartyLegalCard, CounterpartyInfoCard },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('counterparties/loadById', {
        id: params.id,
      }),
      store.dispatch('contracts/loadRelated', {
        parent: { id: params.id, type: 'counterparties' },
      }),
    ])
  },

  computed: {
    counterparty() {
      return this.$store.getters['counterparties/byId']({
        id: this.$route.params.id,
      })
    },
    contracts() {
      return this.$store.getters['contracts/related']({
        parent: { id: this.$route.params.id, type: 'counterparties' },
      })
    },
  },
}
</script>
