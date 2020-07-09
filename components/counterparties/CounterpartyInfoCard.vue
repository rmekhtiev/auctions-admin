<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        {{ heading }}
      </div>
    </v-card-text>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>
            mdi-domain
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ counterparty.attributes.display_name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-icon>
          <v-icon>mdi-pound</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ counterparty.attributes.inn }}
          </v-list-item-title>
          <v-list-item-subtitle>
            УНП
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(`counterparties.types.${counterparty.attributes._type}`) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
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
  },
}
</script>
