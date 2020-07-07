<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        Аукцион
      </div>
    </v-card-text>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar>
            <v-icon>mdi-format-title</v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ auction.attributes.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Банкротство
          </v-list-item-title>
          <v-list-item-subtitle>
            Тип
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $moment(auction.attributes.starts_at).format('LLL') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Начало
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $moment(auction.attributes.ends_at).format('LLL') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Конец
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        nuxt
        :to="{
          name: 'counterparties-id',
          params: { id: auction.relationships.seller.data.id },
        }"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{
              $store.getters['counterparties/byId']({
                id: auction.relationships.seller.data.id,
              }).attributes.display_name
            }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Продавец
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        nuxt
        :to="{
          name: 'counterparties-id',
          params: { id: auction.relationships.organizer.data.id },
        }"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{
              $store.getters['counterparties/byId']({
                id: auction.relationships.organizer.data.id,
              }).attributes.display_name
            }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Организатор
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AuctionInfoCard',
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },
}
</script>
