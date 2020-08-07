<template>
  <dialog-card
    title="Создание приложения"
    :actions="actions"
    :handle="handleClick"
  >
    <image-form v-model="editedValue.attributes" />
  </dialog-card>
</template>

<script>
import DialogCard from 'vuetify-dialog/src/components/DialogCard'
import ImageForm from './ImageForm'
import resourceDialog from '~/mixins/resourceDialog'

export default {
  components: { ImageForm, DialogCard },
  mixins: [resourceDialog],
  props: {
    auction: {
      type: Object,
      default: null,
    },
    image: {
      type: Object,
      default: null,
    },
  },
}
</script>
