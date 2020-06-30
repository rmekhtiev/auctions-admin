<template>
  <div>
    <CounterpartyLegalEntityCard
      :counterparty="counterparty"
    ></CounterpartyLegalEntityCard>
  </div>
</template>

<script>
import CounterpartyLegalEntityCard from '../../components/counterparties/CounterpartyLegalEntityCard'
export default {
  name: 'CounterpartyLegalCard',
  components: { CounterpartyLegalEntityCard },
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
  },
}
</script>
