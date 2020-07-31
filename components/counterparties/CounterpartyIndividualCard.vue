<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        {{ heading || 'Физическое лицо' }}
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
      <v-list-item>
        <v-list-item-icon>
          <v-icon>
            mdi-account
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
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-icon>
          <v-icon>
            mdi-passport
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ counterparty.attributes.document.passport_number }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ counterparty.attributes.document.passport_personal }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            Выдан {{ counterparty.attributes.document.passport_issuer }}
            {{ counterparty.attributes.document.passport_date }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="counterparty.attributes.display_address" two-line>
        <v-list-item-icon>
          <v-icon>
            mdi-home
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="white-space: initial;">
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
  name: 'CounterpartyIndividualCard',
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
