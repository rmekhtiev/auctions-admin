<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        {{ heading }}
      </div>
    </v-card-text>
    <div v-for="contract in contracts" :key="contract.id">
      <contract-item :contract="contract" />
    </div>
  </v-card>
</template>

<script>
import ContractItem from '~/components/counterparties/contracts/ContractItem'

export default {
  name: 'ContractInfoCard',
  components: { ContractItem },
  props: {
    contracts: {
      type: Object,
      required: true,
    },
    heading: {
      type: String,
      default: 'Договора',
    },
  },
}
</script>
