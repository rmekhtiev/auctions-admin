<template>
  <dialog-card
    title="Создание аукциона"
    :actions="actions"
    :handle="handleClick"
  >
    <lot-form v-model="editedValue.attributes" />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import LotForm from './LotForm'
import resourceDialog from '~/mixins/resourceDialog'

export default {
  name: 'AuctionDialog',
  components: { LotForm, DialogCard },
  mixins: [resourceDialog],
  auction: {
    type: Object,
    default: null,
  },
}
</script>
