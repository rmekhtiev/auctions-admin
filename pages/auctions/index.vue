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
              {{ $moment(item.attributes.starts_at).format('lll') }}
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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import serverSidePaginated from '~/mixins/serverSidePaginated'
import users from '~/mixins/resources/users'
import auctions from '~/mixins/resources/auctions'

export default {
  name: 'Index',
  mixins: [serverSidePaginated({ resource: 'auctions' }), users, auctions],
  data: () => ({
    headers: [
      { text: '№', value: 'id' },
      { text: 'Название', value: 'attributes.title' },
      { text: 'Начало торгов', value: 'attributes.starts_at' },
      { text: 'Продавец', value: 'relationships.seller.data.id' },
      { text: 'Организатор', value: 'relationships.organizer.data.id' },
    ],
  }),
}
</script>
