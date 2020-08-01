<template>
  <v-form>
    <v-text-field v-model="value.title" label="Название" required />

    <template>
      <v-file-input v-model="value.image" label="Изображение" />
    </template>
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  mixins: [resourceForm],
}
</script>
