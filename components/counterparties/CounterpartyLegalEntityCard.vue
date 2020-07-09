<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        {{ heading }}
      </div>
    </v-card-text>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ counterparty.attributes.display_name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ counterparty.attributes.name.full_name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            УНП: <span>{{ counterparty.attributes.inn }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            от {{ $moment(counterparty.attributes.egr_date).format('LL') }}
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
  },
}
</script>
