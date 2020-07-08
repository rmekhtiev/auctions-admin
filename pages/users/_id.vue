<template>
  <div id="user" class="mb-16">
    <v-row>
      <v-col sm="12" md="6" xl="4">
        <UserInfoCard :user="user"></UserInfoCard>
      </v-col>
      <v-col sm="12" md="6" xl="4">
        <div v-for="counterparty in counterparties" :key="counterparty.id">
          <counterparty-info-card :counterparty="counterparty" class="mb-8" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserInfoCard from '~/components/user/UserInfoCard'
import CounterpartyInfoCard from '~/components/counterparties/CounterpartyInfoCard'
export default {
  name: 'Id',
  components: { CounterpartyInfoCard, UserInfoCard },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('users/loadById', {
        id: params.id,
      }),
      store.dispatch('counterparties/loadRelated', {
        parent: { id: params.id, type: 'users' },
      }),
    ])
  },

  computed: {
    user() {
      return this.$store.getters['users/byId']({
        id: this.$route.params.id,
      })
    },
    counterparties() {
      return this.$store.getters['counterparties/related']({
        parent: { id: this.$route.params.id, type: 'users' },
      })
    },
  },
}
</script>
