<template>
  <div id="users" class="mb-16">
    <v-row id="filters">
      <v-col sm="6" md="4">
        <v-text-field
          v-model="filter.search"
          prepend-inner-icon="mdi-magnify"
          label="Поиск"
          single-line
          filled
          clearable
          autocomplete="off"
          name="search"
          @keyup.enter="loadItems()"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <v-select
          v-model="filter.role"
          :items="userRoles"
          prepend-inner-icon="mdi-account-supervisor"
          label="Роли"
          single-line
          filled
          multiple
          clearable
          name="roles"
          item-value="value"
          item-text="title"
          @input="loadItems()"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Пользователи
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :options.sync="iteratorOptions"
            :server-items-length="totalItems"
            :loading="itemsLoading"
            @click:row="(_e, { item }) => openUserPage(item)"
          >
            <template v-slot:item.attributes.role="{ item }">
              {{ $t(`roles.${item.attributes.role}`) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-btn color="primary" fixed bottom right dark fab @click="createUser()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import UserRowItem from '../../components/user/UserRowItem'
import serverSidePaginated from '../../mixins/serverSidePaginated'
import users from '../../mixins/resources/users'
import UserDialog from '~/components/user/UserDialog'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { UserRowItem },
  mixins: [serverSidePaginated({ resource: 'users' }), users],
  data: () => ({
    headers: [
      { text: 'Логин', value: 'attributes.login' },
      { text: 'Email', value: 'attributes.email' },
      { text: 'Роль', value: 'attributes.role' },
    ],
  }),
  methods: {
    async createUser(openPage = true) {
      const dialog = await this.$dialog.showAndWait(UserDialog)

      if (dialog !== false) {
        this.$store.dispatch('users/create', dialog).then(() => {
          const user = this.$store.getters['users/lastCreated']
          return openPage && this.openUserPage(user)
        })
      }
    },
  },
}
</script>
