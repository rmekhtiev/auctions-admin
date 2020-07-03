<template>
  <div v-if="counterparty.attributes._type === 'UL'">
    <CounterpartyLegalEntityCard :counterparty="counterparty" />
  </div>
</template>

<script>
export default {
  name: 'CounterpartyLegalCard',
  components: {
    // for lazy-loading
    CounterpartyLegalEntityCard: () =>
      import('@/components/counterparties/CounterpartyLegalEntityCard'),
  },
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
  },
}
</script>
