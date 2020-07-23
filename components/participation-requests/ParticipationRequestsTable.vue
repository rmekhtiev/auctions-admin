<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        Заявки на участие
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="participationRequests">
      <template v-slot:item.counterparty="{ item }">
        {{
          $store.getters['counterparties/byId']({
            id: item.relationships.counterparty.data.id,
          }).attributes.display_name
        }}
      </template>
      <template v-slot:item.author="{ item }">
        {{
          $store.getters['users/byId']({
            id: item.relationships.author.data.id,
          }).attributes.login
        }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="!item.attributes.approved_at"
          class="mr-2"
          @click="approveRequest(item)"
        >
          mdi-check
        </v-icon>
        <v-icon @click="rejectRequest(item)">
          mdi-close
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'ParticipationRequestsTable',
  props: {
    participationRequests: {
      type: Array,
    },
  },
  data: () => ({
    headers: [
      { text: 'Контрагент', value: 'counterparty' },
      { text: 'Пользователь', value: 'author' },
      { text: 'Действия', value: 'actions' },
    ],
  }),
  methods: {
    async approveRequest(item) {
      item.attributes.approved_at = this.$moment()
      await this.$store.dispatch('participation-requests/update', item)
      this.$store.dispatch('participation-requests/loadById', {
        id: item.id,
      })
    },
    async rejectRequest(item) {
      item.attributes.approved_at = null
      await this.$store.dispatch('participation-requests/update', item)
      this.$store.dispatch('participation-requests/loadById', {
        id: item.id,
      })
    },
  },
}
</script>
