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
          >
            <template v-slot:item.attributes.counterparty_id="{ item }">
              {{
                $store.getters['counterparties/byId']({
                  id: item.attributes.counterparty_id,
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

export default {
  name: 'Index',
  mixins: [serverSidePaginated({ resource: 'auctions' }), users],
  data: () => ({
    headers: [
      { text: 'Аукцион', value: 'id' },
      { text: 'Контрагент', value: 'attributes.counterparty_id' },
    ],
  }),
}
</script>
