<template>
  <dialog-card title="Create" :actions="actions" :handle="handleClick">
    <auction-form v-model="editedValue.attributes" />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import AuctionForm from '~/components/auctions/AuctionForm'
import resourceDialog from '~/mixins/resourceDialog'
export default {
  name: 'AuctionDialog',
  components: { AuctionForm, DialogCard },
  mixins: [resourceDialog],
  auction: {
    type: Object,
    default: null,
  },
}
</script>
