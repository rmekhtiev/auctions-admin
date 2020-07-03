<template>
  <dialog-card title="Create" :actions="actions" :handle="handleClick">
    <user-form v-model="editedValue.attributes"></user-form>
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'

import resourceDialog from '../../mixins/resourceDialog'
import UserForm from '~/components/user/UserForm'

export default {
  name: 'UserDialog',
  components: { UserForm, DialogCard },
  mixins: [resourceDialog],
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
}
</script>
