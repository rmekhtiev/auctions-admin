<template>
  <v-card>
    <v-card-text>
      <div
        class="overline"
        v-text="$t(`auctions.statuses.${auction.attributes.status}.self`)"
      >
        Статус
      </div>
    </v-card-text>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-clock-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $moment(auction.attributes.updated_at).format('lll') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Последнее обновление
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template>
      <draft-status-actions v-if="isDraft" :auction="auction" />
      <pending-status-actions v-if="isPending" :auction="auction" />
      <upcoming-status-actions v-if="isUpcoming" :auction="auction" />
    </template>
  </v-card>
</template>

<script>
export default {
  components: {
    DraftStatusActions: () => import('./DraftStatusActions'),
  },
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDraft() {
      return this.auction.attributes.status === 'DRAFT'
    },
    isPending() {
      return this.auction.attributes.status === 'PENDING'
    },
    isUpcoming() {
      return this.auction.attributes.status === 'UPCOMING'
    },
  },
}
</script>
