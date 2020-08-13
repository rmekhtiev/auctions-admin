<template>
  <v-card-actions>
    <v-spacer />
    <v-btn
      text
      color="red"
      @click="updateStatus(auction, 'FAILED')"
      v-text="$t(`auctions.statuses.FAILED.to`)"
    />
  </v-card-actions>
</template>

<script>
import auction from '~/mixins/resources/auctions'

export default {
  mixins: [auction],
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },
}
</script>
