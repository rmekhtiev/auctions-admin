<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        {{ heading || 'Юридическое лицо' }}
      </div>
      <v-spacer />
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
            {{ counterparty.attributes.name.full_name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-icon>
          <v-icon>mdi-pound</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            УНП: <span>{{ counterparty.attributes.inn }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            от {{ $moment(counterparty.attributes.egr_date).format('LL') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="counterparty.attributes.display_address">
        <v-list-item-content>
          <v-list-item-title>
            <span>{{ counterparty.attributes.display_address }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            Адрес
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'CounterpartyLegalEntityCard',
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
    heading: {
      type: String,
      default: 'Юридическое лицо',
    },
    noLink: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
