<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        {{ heading }}
      </div>
      <v-spacer />
      <v-btn icon color="primary" @click="createContract()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <div v-for="contract in contracts" :key="contract.id">
      <contract-item :contract="contract" />
    </div>
  </v-card>
</template>

<script>
import { serialize } from 'object-to-formdata'

import ContractDialog from './ContractDialog'
import ContractItem from './ContractItem'

export default {
  name: 'ContractInfoCard',
  components: { ContractItem },
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
    contracts: {
      type: Array,
      required: true,
    },
    heading: {
      type: String,
      default: 'Договоры',
    },
  },
  methods: {
    async createContract() {
      const dialog = await this.$dialog.showAndWait(ContractDialog, {
        persistent: true,
      })

      if (dialog !== false) {
        const data = {
          attributes: dialog.attributes,
          relationships: {
            counterparty: {
              data: {
                type: 'counterparties',
                id: `${this.counterparty.id}`,
              },
            },
          },
          type: 'contracts',
        }
        const formData = serialize({ data })

        //! store.dispatch(...) не работает с файлами, поэтомy приходится делать так
        this.$axios
          .post('/contracts', formData)
          .then(async ({ data: result }) => {
            await this.$store.commit('contracts/STORE_RECORD', result.data)
            // eslint-disable-next-line prettier/prettier
            await this.$store.commit('contracts/STORE_LAST_CREATED', result.data)
            await this.$emit('created', this.$store.getters['lots/lastCreated'])
          })
      }
    },
  },
}
</script>
