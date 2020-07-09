<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        Лоты
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="auction" class="text--black" icon @click="createLot()">
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
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
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
      const dialog = await this.$dialog.showAndWait(LotDialog)

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

        this.$store.dispatch('lots/create', formData)
      }
    },
  },
}
</script>
