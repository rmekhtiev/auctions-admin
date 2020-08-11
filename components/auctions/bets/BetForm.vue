<template>
  <v-form>
    <v-text-field
      v-model="value.bet_amount"
      type="number"
      label="Сумма ставки"
      required
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  mixins: [resourceForm],
}
</script>
