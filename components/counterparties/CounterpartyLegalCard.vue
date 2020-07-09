<template>
  <div v-if="counterparty.attributes._type === 'UL'">
    <CounterpartyLegalEntityCard
      :counterparty="counterparty"
      :address="address"
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
    address: {
      type: Object,
      required: true,
    },
    heading: {
      type: String,
      default: '',
    },
    noLink: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
