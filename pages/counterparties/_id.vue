<template>
  <div id="counterparty">
    <counterparty-info-card
      :counterparty="counterparty"
    ></counterparty-info-card>
  </div>
</template>

<script>
import CounterpartyInfoCard from '../../components/counterparties/CounterpartyInfoCard'
export default {
  name: 'Id',
  components: { CounterpartyInfoCard },
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
