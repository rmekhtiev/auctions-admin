<template>
  <div>
    <template>
      <v-list-item :key="bet.id">
        <template>
          <v-list-item-content>
            <v-list-item-title>
              {{
                $store.getters['counterparties/byId']({
                  id: bet.relationships.counterparty.data.id,
                }).attributes.display_name
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                $store.getters['users/byId']({
                  id: bet.relationships.author.data.id,
                }).attributes.email
              }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ $moment(bet.attributes.created_at).format('LLL') }},
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text class="mb-2">{{
              bet.attributes.bet_amount | currency
            }}</v-list-item-action-text>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list dense>
                <v-list-item @click="deleteBet()">
                  <v-list-item-icon>
                    <v-icon>mdi-delete-alert</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Удалить</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="updateBet()">
                  <v-list-item-icon>
                    <v-icon>mdi-lead-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Редактировать</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </template>
      </v-list-item>
      <!-- <v-divider v-if="index + 1 < bets.length" :key="index"></v-divider> -->
    </template>
  </div>
</template>

<script>
import BetDialog from '~/components/auctions/bets/BetDialog'

export default {
  name: 'BetListItem',

  props: {
    bet: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async updateBet() {
      const dialog = await this.$dialog.showAndWait(BetDialog, {
        final: this.bet,
        title: 'Редактирование ставки',
        persistent: true,
      })

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          relationships: {
            author: {
              data: {
                type: 'users',
                id: this.bet.relationships.author.data.id,
              },
            },
            auction: {
              data: {
                type: 'auctions',
                id: this.bet.relationships.auction.data.id,
              },
            },
            counterparty: {
              data: {
                type: 'counterparties',
                id: this.bet.relationships.counterparty.data.id,
              },
            },
          },
          id: this.bet.id,
          type: 'bets',
        }
        this.$store.dispatch('bets/update', formData)
      }
    },

    async deleteBet() {
      const res = await this.$dialog.confirm({
        text: 'Вы уверены, что хотите удалить ставку?',
        title: 'Внимание',
      })
      if (res !== false) {
        this.$store.dispatch('bets/delete', this.bet)
      }
    },
  },
}
</script>
