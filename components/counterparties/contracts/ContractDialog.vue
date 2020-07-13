<template>
  <dialog-card
    title="Создание договора"
    :actions="actions"
    :handle="handleClick"
  >
    <contract-form v-model="editedValue.attributes" />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import ContractForm from './ContractForm'
import resourceDialog from '~/mixins/resourceDialog'

export default {
  components: { ContractForm, DialogCard },
  mixins: [resourceDialog],
  props: {
    counterparty: {
      type: Object,
      default: null,
    },
    contract: {
      type: Object,
      default: null,
    },
  },
}
</script>
