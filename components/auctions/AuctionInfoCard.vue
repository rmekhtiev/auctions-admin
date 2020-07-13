<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        Аукцион
      </div>
      <v-spacer />
      <v-btn icon @click="updateAuction()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
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
            {{ $moment(auction.attributes.starts_at).format('LL') }},
            {{ $moment(auction.attributes.starts_at).format('LT') }} -
            {{ $moment(auction.attributes.ends_at).format('LT') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Дата проведения
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cash</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ auction.attributes.price_start | currency }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Начальная цена
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cash-marker</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ auction.attributes.price_min | currency }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Минимальная цена
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cash-refund</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ auction.attributes.deposit | currency }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Залог
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        nuxt
        :to="{
          name: 'counterparties-id',
          params: { id: seller.id },
        }"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ seller.attributes.display_name }}
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
          params: { id: organizer.id },
        }"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ organizer.attributes.display_name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Организатор
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="auction.attributes.display_address">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ auction.attributes.display_address }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Адрес
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import AuctionDialog from '~/components/auctions/AuctionDialog'

export default {
  name: 'AuctionInfoCard',
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    seller() {
      return this.$store.getters['counterparties/byId']({
        id: this.auction.relationships.seller.data.id,
      })
    },
    organizer() {
      return this.$store.getters['counterparties/byId']({
        id: this.auction.relationships.organizer.data.id,
      })
    },
  },
  methods: {
    async updateAuction() {
      const final = this.auction
      final.attributes.seller_id = this.auction.relationships.seller.data.id
      final.attributes.organizer_id = this.auction.relationships.organizer.data.id
      const dialog = await this.$dialog.showAndWait(AuctionDialog, {
        final,
      })

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          relationships: {
            seller: {
              data: {
                type: 'counterparties',
                id: `${dialog.attributes.seller_id}`,
              },
            },
            organizer: {
              data: {
                type: 'counterparties',
                id: `${dialog.attributes.organizer_id}`,
              },
            },
          },
          id: this.auction.id,
          type: 'auctions',
        }
        this.$store.dispatch('auctions/update', formData).then(() => {
          this.$store.dispatch('auctions/loadById', {
            id: this.$route.params.id,
          })
        })
      }
    },
  },
}
</script>
