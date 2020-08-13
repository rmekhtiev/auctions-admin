<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        Лоты
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="auction" icon color="primary" @click="createLot()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <v-list-item
        v-for="(lot, index) in lots"
        :key="`lot-${index}-id-${lot.id}`"
        two-line
      >
        <v-list-item-content two-line>
          <v-list-item-title>
            {{ lot.attributes.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t(`lots.statuses.${lot.attributes.status}`) }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item @click="deleteLot(lot)">
                <v-list-item-icon>
                  <v-icon>mdi-delete-alert</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Удалить</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="updateLot(lot)">
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
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import LotDialog from '~/components/lots/LotDialog'

export default {
  props: {
    lots: {
      type: Array,
      required: true,
    },
    auction: {
      type: Object,
      default: null,
    },
  },

  methods: {
    async createLot() {
      const dialog = await this.$dialog.showAndWait(LotDialog, {
        persistent: true,
      })

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          relationships: {
            auction: {
              data: {
                type: 'auctions',
                id: `${this.auction.id}`,
              },
            },
          },
        }

        await this.$store.dispatch('lots/create', formData)
        this.$store.dispatch('lots/loadRelated', {
          parent: { id: this.auction.id, type: 'auctions' },
        })
      }
    },
    async updateLot(lot) {
      const dialog = await this.$dialog.showAndWait(LotDialog, {
        final: lot,
        title: 'Редактирование лота',
        persistent: true,
      })

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          id: lot.id,
          type: 'lots',
          relationships: {
            auction: {
              data: {
                type: 'auctions',
                id: `${this.auction.id}`,
              },
            },
          },
        }
        await this.$store.dispatch('lots/update', formData)
        this.$store.dispatch('lots/loadById', {
          id: lot.id,
        })
      }
    },
    async deleteLot(lot) {
      const res = await this.$dialog.confirm({
        text: 'Вы уверены, что хотите удалить лот?',
        title: 'Внимание',
      })
      if (res !== false) {
        this.$store.dispatch('lots/delete', lot)
      }
    },
  },
}
</script>
