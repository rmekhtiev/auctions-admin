<template>
  <dialog-card
    title="Создание контрагента"
    :actions="actions"
    :handle="handleClick"
  >
    <counterparty-form
      v-model="editedValue.attributes"
      :final="final.attributes"
    />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import CounterpartyForm from '../../components/counterparties/CounterpartyForm'
import resourceDialog from '../../mixins/resourceDialog'

export default {
  name: 'CounterpartyDialog',
  components: { CounterpartyForm, DialogCard },
  mixins: [resourceDialog],
  props: {
    counterparty: {
      type: Object,
      default: null,
    },
  },
}
</script>
