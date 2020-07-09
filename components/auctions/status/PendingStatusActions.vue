<template>
  <v-card-actions>
    <v-spacer />

    <v-btn
      text
      color="red"
      @click="updateStatus(auction, 'DRAFT')"
      v-text="$t(`auctions.statuses.DRAFT.back`)"
    />

    <v-btn
      text
      color="primary"
      @click="updateStatus(auction, 'UPCOMING')"
      v-text="$t(`auctions.statuses.UPCOMING.to`)"
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
