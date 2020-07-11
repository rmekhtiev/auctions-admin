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
        <span
          v-if="!contract.attributes.sign_at"
          class="red--text text--darken-4"
        >
          (Не подписан)
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>На {{ $t('contracts.types.' + contract.attributes._type) }}</span>
        <span v-if="contract.attributes.signed">
          от {{ $moment(contract.attributes.sign_at).format('DD-MM-YYYY') }}
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="!contract.attributes.sign_at">
      <v-btn icon color="primary" @click="signContract()">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn
        icon
        color="primary"
        link
        target="_blank"
        :href="contract.attributes.path"
      >
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
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
      const dialog = await this.$dialog.confirm({
        text: 'Вы уверены, что хотите подписать договор?',
        title: 'Внимание',
      })
      if (dialog !== false) {
        const formData = this.contract
        formData.attributes.sign_at = this.$moment().format('YYYY-MM-DD')
        this.$store.dispatch('contracts/update', formData)
      }
    },
  },
}
</script>
