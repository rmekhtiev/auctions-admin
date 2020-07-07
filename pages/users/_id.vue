<template>
  <div id="user" class="mb-16">
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <UserInfoCard :user="user"></UserInfoCard>
      </v-col/>
    </v-row>
  </div>
</template>

<script>
import UserInfoCard from '~/components/user/UserInfoCard'
export default {
  name: 'Id',
  components: { UserInfoCard },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('users/loadById', {
        id: params.id,
        options: {
          // XDEBUG_SESSION_START: 'PHPSTORM'
        },
      }),
    ])
  },

  computed: {
    user() {
      return this.$store.getters['users/byId']({
        id: this.$route.params.id,
      })
    },
  },
}
</script>
