<template>
  <v-col sm="12" md="6" xl="4">
    <v-card>
      <v-card-text>
        <div class="overline">
          Юридическое лицо
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
            УИН
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ counterparty.attributes.egr }} от
            {{ counterparty.attributes.egr_date }}
          </v-list-item-title>
          <v-list-item-subtitle>
            ЕГР
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'CounterpartyLegalEntityCard',
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
  },
}
</script>
