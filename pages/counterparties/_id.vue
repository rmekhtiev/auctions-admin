<template>
  <div id="counterparty">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <counterparty-info-card :counterparty="counterparty" no-link />
        <div v-if="!counterparty.attributes.display_address" class="mt-8">
          <v-alert color="info" border="left" elevation="2" colored-border>
            <v-row align="center" no-gutters>
              <v-col class="grow"> У контрагента не указан адрес. </v-col>
              <v-col class="shrink">
                <v-btn
                  class="mt-2 inline"
                  color="info"
                  text
                  @click="addAddress()"
                  >Добавить</v-btn
                >
              </v-col>
            </v-row>
          </v-alert>
        </div>
      </v-col>
      <v-col sm="12" md="6" lg="4">
        <counterparty-legal-card :counterparty="counterparty" no-link />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CounterpartyInfoCard from '../../components/counterparties/CounterpartyInfoCard'
import CounterpartyLegalCard from '../../components/counterparties/CounterpartyLegalCard'
import AddressDialog from '~/components/counterparties/addresses/AddressDialog'

export default {
  components: { CounterpartyLegalCard, CounterpartyInfoCard },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('counterparties/loadById', {
        id: params.id,
        options: {
          // XDEBUG_SESSION_START: 'PHPSTORM'
        },
      }),
    ])
  },

  computed: {
    counterparty() {
      return this.$store.getters['counterparties/byId']({
        id: this.$route.params.id,
      })
    },
  },
  methods: {
    async addAddress() {
      const dialog = await this.$dialog.showAndWait(AddressDialog)

      if (dialog !== false) {
        const formData = {
          attributes: dialog.attributes,
          relationships: {
            addressable: {
              data: {
                id: this.$route.params.id,
                type: 'counterparties',
              },
            },
          },
        }
        formData.attributes.country_code = 'BY'

        this.$store.dispatch('addresses/create', formData).then(() => {
          this.$store.dispatch('counterparties/loadById', {
            id: this.$route.params.id,
          })
        })
      }
    },
  },
}
</script>
