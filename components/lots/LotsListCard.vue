<template>
  <v-card>
    <v-card-text>
      <div class="overline">
        Лоты
      </div>
    </v-card-text>

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
export default {
  props: {
    lots: {
      type: Array,
      required: true,
    },
  },
}
</script>
