<template>
  <div id="users" class="mb-16">
    <v-row id="filters">
      <v-col sm="6" md="3">
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
      <v-col sm="6" md="2">
        <v-select
          v-model="filter.status"
          :items="auctionStatuses"
          prepend-inner-icon="mdi-account-supervisor"
          label="Статус"
          single-line
          filled
          clearable
          multiple
          name="status"
          item-value="value"
          item-text="title"
          @input="loadItems()"
        />
      </v-col>

      <v-col sm="6" md="2">
        <v-select
          v-model="filter.lot_category"
          :items="categories"
          prepend-inner-icon="mdi-account-supervisor"
          label="Категория"
          single-line
          filled
          clearable
          multiple
          name="lot_category"
          item-value="value"
          item-text="name"
          @input="loadItems()"
        />
      </v-col>

      <v-col sm="6" md="2">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.start"
              label="Дата начала"
              single-line
              filled
              clearable
              readonly
              prepend-inner-icon="mdi-calendar-check"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="filter.start" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="loadStart()">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col sm="6" md="2">
        <v-menu
          ref="menu"
          v-model="menu2"
          prepend-inner-icon="mdi-account-supervisor"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.end"
              label="Дата окончания"
              prepend-inner-icon="mdi-calendar-check"
              single-line
              filled
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker v-model="filter.end" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="loadEnd()">OK</v-btn>
          </v-date-picker>
        </v-menu>
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
            @click:row="(_e, { item }) => openAuctionPage(item)"
          >
            <template v-slot:item.attributes.starts_at="{ item }">
              {{ $moment(item.attributes.starts_at).format('LL') }},
              {{ $moment(item.attributes.starts_at).format('LT') }}
            </template>
            <template v-slot:item.attributes.ends_at="{ item }">
              {{ $moment(item.attributes.ends_at).format('LL') }},
              {{ $moment(item.attributes.ends_at).format('LT') }}
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

            <template v-slot:item.attributes.created_at="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" class="grey--text" v-on="on">
                    {{ $moment(item.attributes.created_at).fromNow() }}</span
                  >
                </template>
                <span>{{
                  $moment(item.attributes.created_at).format('LLL')
                }}</span>
              </v-tooltip>
            </template>

            <template v-slot:item.attributes.status="{ item }">
              {{ $t(`auctions.statuses.${item.attributes.status}.self`) }}
            </template>

            <template v-slot:item.attributes.price_start="{ item }">
              {{ item.attributes.price_start | currency }}
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
    menu: false,
    menu2: false,
    headers: [
      { text: '№', value: 'id' },
      { text: 'Название', value: 'attributes.title' },
      { text: 'Начало торгов', value: 'attributes.starts_at' },
      { text: 'Окончание торгов', value: 'attributes.ends_at' },

      { text: 'Продавец', value: 'relationships.seller.data.id' },
      { text: 'Организатор', value: 'relationships.organizer.data.id' },
      { text: 'Статус', value: 'attributes.status' },
      {
        text: 'Начальная цена',
        align: 'right',
        sortable: false,
        value: 'attributes.price_start',
      },
      { text: 'Дата создания', value: 'attributes.created_at', align: 'right' },
    ],
    categories: [
      { value: 'realty', name: 'Недвижимость' },
      { value: 'vehicle', name: 'Транспорт' },
      { value: 'equipment', name: 'Оборудование' },
      { value: 'receivables', name: 'Дебиторская задолжность' },
      { value: 'enterprise', name: 'Предприятие' },
      { value: 'spare-part', name: 'Запчасти' },
      { value: 'inventory', name: 'Инвентарь' },
    ],
  }),
  methods: {
    loadStart() {
      this.menu = false
      this.loadItems()
    },
    loadEnd() {
      this.menu2 = false
      this.loadItems()
    },

    async createAuction(openPage = true) {
      const dialog = await this.$dialog.showAndWait(AuctionDialog, {
        persistent: true,
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
        }
        await this.$store.dispatch('auctions/create', formData)
        const auction = this.$store.getters['auctions/lastCreated']
        return openPage && this.openAuctionPage(auction)
      }
    },
  },
}
</script>
