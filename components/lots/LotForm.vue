<template>
  <v-form>
    <v-text-field
      v-model="value.title"
      label="Название"
      :rules="rules.lots.required"
    />
    <v-select
      v-model="value.category"
      :items="categories"
      item-value="value"
      item-text="name"
      label="Категория"
      :rules="rules.lots.required"
    />
    <v-text-field
      v-model="value.price_start"
      label="Начальная цена"
      type="numbers"
      :rules="rules.lots.required"
      suffix="BYN"
    />
    <v-text-field
      v-model="value.price_min"
      label="Минимальная цена"
      type="numbers"
      :rules="rules.lots.required"
      suffix="BYN"
    />
    <v-text-field
      v-model="value.deposit"
      label="Залог"
      type="numbers"
      :rules="rules.lots.required"
      suffix="BYN"
    />
    <v-text-field
      v-model="value.step"
      label="Шаг"
      type="numbers"
      :rules="rules.title"
      suffix="BYN"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'
import formRules from '~/mixins/formRules'

export default {
  name: 'AuctionForm',

  mixins: [resourceForm, formRules],

  data: () => ({
    categories: [
      { value: 'realty', name: 'Недвижимость' },
      { value: 'vehicle', name: 'Транспорт' },
      { value: 'equipment', name: 'Оборудование' },
      { value: 'receivables', name: 'Дебиторская задолжность' },
      { value: 'enterprise', name: 'Предприятие' },
      { value: 'spare-part', name: 'Запчасти' },
      { value: 'inventory', name: 'Инвентарь' },
    ],
  }),
}
</script>
