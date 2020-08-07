<template>
  <div>
    <CounterpartyLegalEntityCard
      v-if="counterparty.attributes._type === 'UL'"
      v-bind="$props"
    />
    <CounterpartyIndividualCard
      v-if="counterparty.attributes._type === 'FL'"
      v-bind="$props"
    />
    <CounterpartyIndividualEntrepreneurCard
      v-if="counterparty.attributes._type === 'IP'"
      v-bind="$props"
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
    CounterpartyIndividualCard: () =>
      import('@/components/counterparties/CounterpartyIndividualCard'),
    CounterpartyIndividualEntrepreneurCard: () =>
      import(
        '@/components/counterparties/CounterpartyIndividualEntrepreneurCard'
      ),
  },
  props: {
    counterparty: {
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
