<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        {{ heading }}
      </div>
      <v-spacer />
      <v-btn icon @click="updateCounterparty()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-if="!noLink"
        icon
        :to="{ name: 'counterparties-id', params: { id: counterparty.id } }"
      >
        <v-icon>mdi-link-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-list>
      <v-list-item two-line>
        <v-list-item-icon>
          <v-icon>
            mdi-domain
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ counterparty.attributes.display_name }}
            <v-icon
              v-if="counterparty.attributes.has_signed_contracts"
              color="green"
              small
              class="mb-1"
            >
              mdi-check-circle-outline
            </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t(`counterparties.types.${counterparty.attributes._type}`) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="
          counterparty.attributes._type === 'UL' ||
          counterparty.attributes._type === 'IP'
        "
        two-line
      >
        <v-list-item-icon>
          <v-icon>mdi-pound</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            УНП: {{ counterparty.attributes.inn }}
          </v-list-item-title>
          <v-list-item-subtitle>
            от {{ $moment(counterparty.attributes.egr_date).format('LL') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-icon>
          <v-icon>
            mdi-calendar
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $moment(counterparty.attributes.created_at).format('ll') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Дата добавления
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="counterparty.attributes.display_address">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="white-space: initial;">
            {{ counterparty.attributes.display_address }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import CounterpartyDialog from '~/components/counterparties/CounterpartyDialog'

export default {
  name: 'CounterpartyInfoCard',
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
    heading: {
      type: String,
      default: 'Контрагент',
    },
    noLink: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async updateCounterparty() {
      const dialog = await this.$dialog.showAndWait(CounterpartyDialog, {
        final: this.counterparty,
        persistent: true,
      })

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          id: this.counterparty.id,
          type: 'counterparties',
        }
        await this.$store.dispatch('counterparties/update', formData)
        this.$store.dispatch('counterparties/loadById', {
          id: this.$route.params.id,
        })
      }
    },
  },
}
</script>
