<template>
  <v-form>
    <v-text-field v-model="value.title" label="Название" required />
    <v-select
      ref="role"
      v-model="value._type"
      :items="types"
      label="Тип"
      required
    >
      <template v-slot:item="{ item }">{{ item }}</template>
    </v-select>
    <template>
      <v-file-input
        v-model="value.contract"
        accept="application/pdf"
        label="Скан"
      />
    </template>
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  mixins: [resourceForm],
  data: () => ({
    types: ['BANKRUPTCY_BIDDING', 'NORMAL_BIDDING'],
  }),
}
</script>
