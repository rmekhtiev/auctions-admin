<template
  ><div id="users" class="mb-16">
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
            Контрагенты
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :options.sync="iteratorOptions"
            :server-items-length="totalItems"
            :loading="itemsLoading"
            multi-sort
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import serverSidePaginated from '../../mixins/serverSidePaginated'
import counterparties from '../../mixins/resources/counterparties'

export default {
  name: 'Index',
  mixins: [serverSidePaginated({ resource: 'counterparties' }), counterparties],
  data: () => ({
    headers: [
      { text: 'Тип', value: 'attributes.type' },
      { text: 'Название', sortable: false, value: 'attributes.display_name' },
    ],
  }),
}
</script>
