<template>
  <v-card>
    <v-card-title>
      <div class="overline">Заявки на участие</div>
    </v-card-title>
    <v-data-table :headers="headers" :items="participationRequests">
      <template v-slot:item.counterparty="{ item }">
        <nuxt-link
          :to="{
            name: 'auctions-id',
            params: {
              id: item.relationships.counterparty.data.id,
            },
          }"
        >
          {{
            $store.getters['counterparties/byId']({
              id: item.relationships.counterparty.data.id,
            }).attributes.display_name
          }}
        </nuxt-link>
      </template>
      <template v-slot:item.author="{ item }">
        <nuxt-link
          :to="{
            name: 'users-id',
            params: {
              id: item.relationships.author.data.id,
            },
          }"
        >
          @{{
            $store.getters['users/byId']({
              id: item.relationships.author.data.id,
            }).attributes.login
          }}
        </nuxt-link>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="!item.attributes.approved_at"
          @click="approveRequest(item)"
        >
          mdi-check
        </v-icon>
        <v-icon v-else @click="rejectRequest(item)">
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
      required: true,
    },
  },
  data: () => ({
    headers: [
      { text: 'Контрагент', value: 'counterparty' },
      { text: 'Пользователь', value: 'author' },
      { text: 'Действия', align: 'right', value: 'actions', sortable: false },
    ],
  }),
  methods: {
    async approveRequest(item) {
      const res = await this.$dialog.confirm({
        text: 'Вы уверены, что одобрить участие?',
        title: 'Внимание',
      })
      if (res !== false) {
        item.attributes.approved_at = this.$moment()
        await this.$store.dispatch('participation-requests/update', item)
        this.$store.dispatch('participation-requests/loadById', {
          id: item.id,
        })
      }
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
