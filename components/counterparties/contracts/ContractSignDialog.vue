<template>
  <dialog-card
    title="Подписание договора"
    :actions="actions"
    :handle="handleClick"
  >
    Вы уверены, что хотите подписать договор? <br />
    Дата подписания {{ $moment().format('DD-MM-YYYY') }}
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import resourceDialog from '~/mixins/resourceDialog'

export default {
  name: 'ContractSignDialog',
  components: { DialogCard },
  mixins: [resourceDialog],
  props: {
    contract: {
      type: Object,
      default: null,
    },
  },
}
</script>
