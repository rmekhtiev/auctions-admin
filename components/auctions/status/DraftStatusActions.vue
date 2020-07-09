<template>
  <v-card-actions>
    <v-spacer />

    <v-btn text color="red" @click="deleteAuction(auction)">
      Удалить
    </v-btn>

    <v-btn
      text
      color="primary"
      @click="updateStatus(auction, 'PENDING')"
      v-text="$t(`auctions.statuses.PENDING.to`)"
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
