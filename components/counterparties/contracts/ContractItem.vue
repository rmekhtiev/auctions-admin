<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>
        mdi-file-document-outline
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ contract.attributes.title }}
        <v-btn
          v-if="!contract.attributes.sign_at"
          small
          color="primary"
          class="ml-6"
          @click="signContract()"
          ><v-icon>mdi-check</v-icon></v-btn
        >
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>На {{ $t('contracts.types.' + contract.attributes._type) }}</span>
        <span v-if="!contract.attributes.sign_at">(Не подписан)</span>
        <span v-else
          >от
          {{ $moment(contract.attributes.sign_at).format('DD-MM-YYYY') }}</span
        >
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
