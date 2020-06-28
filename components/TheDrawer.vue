<template>
  <v-navigation-drawer v-model="display" fixed app>
    <the-drawer-profile />

    <template v-for="(rootItem, title) in items">
      <v-divider :key="`nav-menu-divider-${title}`" />

      <v-list :key="`nav-menu-item-${title}`" dense nav subheader class="py-2">
        <v-subheader v-if="title !== 'defaultItems'">
          {{ $t(`menu.${title}.title`) }}
        </v-subheader>
        <v-list-item
          v-for="(item, i) in rootItem"
          :key="`nav-item-${title}-${i}`"
          link
          nuxt
          :to="item.to"
          exact
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(`menu.${title}.items.${i}`)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    items: {
      defaultItems: {
        home: {
          icon: 'mdi-apps',
          to: {
            name: 'index',
          },
        },
      },
      managementItems: {
        users: {
          icon: 'mdi-account-multiple-outline',
          to: {
            name: 'users',
          },
        },
      },
    },
  }),
  computed: {
    display: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
