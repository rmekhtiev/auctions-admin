<template>
  <dialog-card
    title="Добавление адреса"
    :actions="actions"
    :handle="handleClick"
  >
    <address-form v-model="editedValue.attributes" />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import resourceDialog from '~/mixins/resourceDialog'
import AddressForm from '~/components/counterparties/addresses/AddressForm'

export default {
  name: 'AddressDialog',
  components: { AddressForm, DialogCard },
  mixins: [resourceDialog],
  props: {
    address: {
      type: Object,
      default: null,
    },
  },
}
</script>
