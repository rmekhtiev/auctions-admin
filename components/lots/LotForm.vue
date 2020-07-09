<template>
  <v-form>
    <v-text-field v-model="value.title" label="Название" :rules="rules.title" />
    <v-text-field
      v-model="value.price_start"
      label="Начальная цена"
      type="numbers"
      :rules="rules.title"
      suffix="BYN"
    />
    <v-text-field
      v-model="value.price_min"
      label="Минимальная цена"
      type="numbers"
      :rules="rules.title"
      suffix="BYN"
    />
    <v-text-field
      v-model="value.deposit"
      label="Залог"
      type="numbers"
      :rules="rules.title"
      suffix="BYN"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  name: 'AuctionForm',

  mixins: [resourceForm],

  data: () => ({
    rules: {
      title: [(value) => !!value || 'Это поле обязательное'],
    },
  }),
}
</script>
