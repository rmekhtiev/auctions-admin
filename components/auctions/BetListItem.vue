<template>
  <div>
    <template v-for="(item, index) in bets">
      <v-list-item :key="item.id">
        <template>
          <v-list-item-content>
            <v-list-item-title>
              {{
                $store.getters['counterparties/byId']({
                  id: item.relationships.counterparty.data.id,
                }).attributes.display_name
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                $store.getters['users/byId']({
                  id: item.relationships.author.data.id,
                }).attributes.email
              }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              >{{
                $moment(item.attributes.created_at).format('LLL')
              }},</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text class="mb-2"
              >{{ item.attributes.bet_amount }} руб.</v-list-item-action-text
            >
            <v-icon color="grey" @click="deleteBet(item.id)"
              >mdi-delete
            </v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-divider v-if="index + 1 < bets.length" :key="index"></v-divider>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BetListItem',

  props: {
    bets: {
      type: Array,
      required: true,
    },
  },

  methods: {
    async deleteBet(id) {
      const res = await this.$dialog.confirm({
        text: 'Вы уверены, что хотите удалить ставку?',
        title: 'Внимание',
      })
      if (res !== false) {
        this.$store.dispatch('bets/delete', { id }).then(() => {
          console.log('success')
        })
      }
    },
  },
}
</script>
