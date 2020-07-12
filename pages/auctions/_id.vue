<template>
  <div id="auction">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <auction-info-card :auction="auction" class="mb-6" />

        <div v-if="!auction.attributes.display_address">
          <v-alert color="info" border="left" elevation="2" colored-border>
            <v-row align="center" no-gutters>
              <v-col class="grow"> У аукциона не указан адрес. </v-col>
              <v-col class="shrink">
                <v-btn
                  class="mt-2 inline"
                  color="info"
                  text
                  @click="addAddress()"
                  >Добавить</v-btn
                >
              </v-col>
            </v-row>
          </v-alert>
        </div>

        <lots-list-card
          :lots="lots"
          :auction="auction"
          @created="loadAuction({ id: $route.params.id })"
        />
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <counterparty-legal-card
          :counterparty="organizer"
          :heading="'Организатор'"
          class="mb-6"
        />
        <counterparty-legal-card :counterparty="seller" :heading="'Продавец'" />
      </v-col>
      <v-col sm="12" md="6" lg="4" class="order-first order-lg-last">
        <auction-status-card :auction="auction" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import auctions from '~/mixins/resources/auctions'
import AddressDialog from '~/components/counterparties/addresses/AddressDialog'

export default {
  mixins: [auctions],

  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('auctions/loadById', {
        id: params.id,
      }),
      store.dispatch('lots/loadRelated', {
        parent: {
          id: params.id,
          type: 'auctions',
        },
      }),
    ])
  },

  computed: {
    auction() {
      return this.$store.getters['auctions/byId']({
        id: this.$route.params.id,
      })
    },
    lots() {
      return this.$store.getters['lots/related']({
        parent: this.auction,
      })
    },
    seller() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'seller',
      })
    },
    organizer() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'organizer',
      })
    },
  },

  methods: {
    async addAddress() {
      const dialog = await this.$dialog.showAndWait(AddressDialog)

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          relationships: {
            addressable: {
              data: {
                id: this.$route.params.id,
                type: 'auctions',
              },
            },
          },
        }
        formData.attributes.country_code = 'BY'

        this.$store.dispatch('addresses/create', formData).then(() => {
          this.$store.dispatch('auctions/loadById', {
            id: this.$route.params.id,
          })
        })
      }
    },
  },
}
</script>
