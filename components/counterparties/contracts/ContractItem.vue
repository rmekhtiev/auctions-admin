<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>
        mdi-file-document-outline
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ contract.attributes._type }}
        <v-btn
          v-if="!contract.attributes.sign_at"
          small
          color="primary"
          class="ml-6"
          @click="signContract()"
          ><v-icon>mdi-check</v-icon></v-btn
        >
      </v-list-item-title>
      <v-list-item-subtitle
        v-if="!contract.attributes.sign_at"
        class="red--text text--darken-4"
      >
        <v-icon x-small color="red darken-4">mdi-close-circle-outline</v-icon>
        Не подписан
      </v-list-item-subtitle>
      <v-list-item-subtitle v-else>
        От {{ $moment(contract.attributes.sign_at).format('DD-MM-YYYY') }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import ContractSignDialog from '~/components/counterparties/contracts/ContractSignDialog'

export default {
  name: 'ContractItem',
  props: {
    contract: {
      type: Object,
      default: null,
    },
  },
  methods: {
    async signContract() {
      const dialog = await this.$dialog.showAndWait(ContractSignDialog)
      if (dialog !== false) {
        const formData = this.contract
        formData.attributes.sign_at = this.$moment().format('YYYY-MM-DD')
        this.$store.dispatch('contracts/update', formData)
      }
    },
  },
}
</script>
