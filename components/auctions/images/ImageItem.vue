<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-avatar>
        <v-img :src="image.attributes.path" :alt="image.attributes.title" />
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ image.attributes.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>
          Добавлено {{ $moment(image.attributes.created_at).format('lll') }}
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="deleteImage(image)">
            <v-list-item-icon>
              <v-icon>mdi-delete-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Удалить</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'ImageItem',
  props: {
    image: {
      type: Object,
      default: null,
    },
  },
  methods: {
    async deleteImage(image) {
      const dialog = await this.$dialog.confirm({
        text: 'Вы уверены, что хотите удалить изображение?',
        title: 'Внимание',
      })
      if (dialog !== false) {
        this.$store.dispatch('auction-images/delete', image)
      }
    },
  },
}
</script>
