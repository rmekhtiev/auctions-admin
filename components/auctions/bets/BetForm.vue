<template>
  <v-form>
    <v-text-field
      v-model="value.bet_amount"
      type="number"
      label="Сумма ставки"
      required
      :step="auction.attributes.step"
      :min="auction.attributes.price_min"
      suffix="BYN"
      onkeydown="return false"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  mixins: [resourceForm],
  props: {
    betId: {
      type: String,
      required: true,
    },
  },
  computed: {
    auction() {
      return this.$store.getters['auctions/byId']({
        id: this.betId,
      })
    },
  },
}
</script>
