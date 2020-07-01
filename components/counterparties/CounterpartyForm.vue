<template>
  <v-form>
    <v-text-field />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  name: 'CounterpartyForm',
  mixins: [resourceForm],
  mounted() {
    setTimeout(() => {
      this.$refs.login.focus()
    }, 100)
  },
}
</script>
