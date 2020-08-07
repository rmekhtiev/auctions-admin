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
        <auction-status-card :auction="auction" class="mb-6" />

        <image-info-card
          :auction="auction"
          :images="images"
          @created="loadImages"
        />
      </v-col>
    </v-row>
    <v-row v-if="participationRequests.length">
      <v-col sm="12" md="12" lg="8">
        <participation-requests-table
          :participation-requests="participationRequests"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import auctions from '~/mixins/resources/auctions'
import AddressDialog from '~/components/counterparties/addresses/AddressDialog'
import ParticipationRequestsTable from '~/components/participation-requests/ParticipationRequestsTable'

export default {
  components: { ParticipationRequestsTable },
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
      store.dispatch('participation-requests/loadRelated', {
        parent: {
          id: params.id,
          type: 'auctions',
        },
      }),
      store.dispatch('auction-images/loadRelated', {
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
    participationRequests() {
      return this.$store.getters['participation-requests/related']({
        parent: this.auction,
      })
    },
    images() {
      return this.$store.getters['auction-images/related']({
        parent: this.auction,
      })
    },
  },

  methods: {
    loadImages() {
      return this.$store.dispatch('auction-images/loadRelated', {
        parent: this.auction,
      })
    },

    async addAddress() {
      const dialog = await this.$dialog.showAndWait(AddressDialog, {
        persistent: true,
      })

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

        await this.$store.dispatch('addresses/create', formData)
        this.$store.dispatch('auctions/loadById', {
          id: this.$route.params.id,
        })
      }
    },
  },
}
</script>
