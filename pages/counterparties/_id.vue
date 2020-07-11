<template>
  <div id="counterparty">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <counterparty-info-card
          :counterparty="counterparty"
          no-link
          class="mb-8"
        />
        <contract-info-card
          :counterparty="counterparty"
          :contracts="contracts"
          @created="loadContracts"
        />
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
        options: {
          // include: 'contracts', // todo: load as included
        },
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
        parent: this.counterparty,
      })
    },
  },

  methods: {
    loadContracts() {
      return this.$store.dispatch('contracts/loadRelated', {
        parent: this.counterparty,
      })
    },
  },
}
</script>
