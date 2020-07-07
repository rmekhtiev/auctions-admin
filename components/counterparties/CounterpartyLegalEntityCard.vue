<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        {{ heading }}
      </div>
    </v-card-text>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ counterparty.attributes.display_name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Короткое название
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ counterparty.attributes.name.full_name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Полное название
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
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
      <v-list-item-content>
        <v-list-item-title>
          {{ counterparty.attributes.egr }} от
          {{ $moment(counterparty.attributes.egr_date).format('LL') }}
        </v-list-item-title>
        <v-list-item-subtitle>
          ЕГР
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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
