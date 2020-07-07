<template>
  <div v-if="counterparty.attributes._type === 'UL'">
    <CounterpartyLegalEntityCard
      :counterparty="counterparty"
      :heading="heading"
    />
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
    heading: {
      type: String,
      required: false,
    },
  },
}
</script>
