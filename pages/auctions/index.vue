<template>
  <div id="users" class="mb-16">
    <v-row id="filters">
      <v-col sm="6" md="4">
        <v-text-field
          v-model="filter.search"
          prepend-inner-icon="mdi-magnify"
          label="Поиск"
          single-line
          filled
          clearable
          autocomplete="off"
          name="search"
          @keyup.enter="loadItems()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Аукционы
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :options.sync="iteratorOptions"
            :server-items-length="totalItems"
            :loading="itemsLoading"
            multi-sort
            @click:row="(_e, { item }) => openAuctionPage(item)"
          >
            <template v-slot:item.attributes.starts_at="{ item }">
              {{ $moment(item.attributes.starts_at).format('LL') }},
              {{ $moment(item.attributes.starts_at).format('LT') }} -
              {{ $moment(item.attributes.ends_at).format('LT') }}
            </template>
            <template v-slot:item.attributes.price_start="{ item }">
              {{ item.attributes.price_start | currency }}
            </template>
            <template v-slot:item.relationships.organizer.data.id="{ item }">
              {{
                $store.getters['counterparties/byId']({
                  id: item.relationships.organizer.data.id,
                }).attributes.display_name
              }}
            </template>
            <template v-slot:item.relationships.seller.data.id="{ item }">
              {{
                $store.getters['counterparties/byId']({
                  id: item.relationships.seller.data.id,
                }).attributes.display_name
              }}
            </template>
            <template v-slot:item.attributes.status="{ item }">
              {{ $t(`auctions.statuses.${item.attributes.status}.self`) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="primary" fixed bottom right dark fab @click="createAuction()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import serverSidePaginated from '~/mixins/serverSidePaginated'
import users from '~/mixins/resources/users'
import auctions from '~/mixins/resources/auctions'
import AuctionDialog from '~/components/auctions/AuctionDialog'

export default {
  name: 'Index',
  mixins: [serverSidePaginated({ resource: 'auctions' }), users, auctions],
  data: () => ({
    headers: [
      { text: '№', value: 'id' },
      { text: 'Название', value: 'attributes.title' },
      { text: 'Начало торгов', value: 'attributes.starts_at' },
      { text: 'Начальная цена', value: 'attributes.price_start' },
      { text: 'Продавец', value: 'relationships.seller.data.id' },
      { text: 'Организатор', value: 'relationships.organizer.data.id' },
      { text: 'Статус', value: 'attributes.status' },
    ],
  }),
  methods: {
    async createAuction(openPage = true) {
      const dialog = await this.$dialog.showAndWait(AuctionDialog)

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
        }
        this.$store.dispatch('auctions/create', formData).then(() => {
          const auction = this.$store.getters['auctions/lastCreated']
          return openPage && this.openAuctionPage(auction)
        })
      }
    },
  },
}
</script>
