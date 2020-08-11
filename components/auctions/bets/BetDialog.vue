<template>
  <dialog-card title="Правка ставки" :actions="actions" :handle="handleClick">
    <bet-form v-model="editedValue.attributes" />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import resourceDialog from '~/mixins/resourceDialog'

export default {
  components: { DialogCard },
  mixins: [resourceDialog],
  props: {
    bet: {
      type: Object,
      default: null,
    },
  },
}
</script>
