<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="overline">{{ heading }}</div>
        <v-spacer />
      </v-card-title>
      <v-list>
        <div v-for="bet in bets" :key="bet.id">
          <bet-list-item :bet="bet" />
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'BetsInfoCard',

  props: {
    bets: {
      type: Array,
      required: true,
    },
    heading: {
      type: String,
      default: 'Ставки',
    },
  },
}
</script>
