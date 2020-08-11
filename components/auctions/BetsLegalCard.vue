<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="overline">{{ heading }}</div>
        <v-spacer />
      </v-card-title>
      <v-list>
        <bet-list-item :bets="bets" />
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'BetsLegalCard',

  props: {
    bets: {
      type: Object,
      required: true,
    },
    heading: {
      type: String,
      default: 'Ставки',
    },
  },
}
</script>
