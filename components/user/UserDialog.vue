<template>
  <dialog-card
    title="Создание пользователя"
    :actions="actions"
    :handle="handleClick"
  >
    <user-form
      v-model="editedValue.attributes"
      :final="final.attributes"
      :auth-user="authUser"
    ></user-form>
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
    authUser: {
      type: Object,
      default: null,
    },
  },
}
</script>
