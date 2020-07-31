<template>
  <v-card>
    <v-card-title>
      <div class="overline">
        {{ heading }}
      </div>
      <v-spacer />
      <v-btn icon color="primary" @click="createImage()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <div v-for="image in images" :key="image.id">
      <!-- <image-item :image="image" /> -->
      <div class="">{{ image.attributes.path }}</div>
      <v-img :src="image.attributes.path"></v-img>
    </div>
  </v-card>
</template>

<script>
import { serialize } from 'object-to-formdata'

import ImageDialog from './ImageDialog'

export default {
  name: 'ImageInfoCard',
  props: {
    auction: {
      type: Object,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    heading: {
      type: String,
      default: 'Приложения',
    },
  },
  methods: {
    async createImage() {
      const dialog = await this.$dialog.showAndWait(ImageDialog, {
        persistent: true,
      })

      if (dialog !== false) {
        const data = {
          attributes: dialog.attributes,
          relationships: {
            auction: {
              data: {
                type: 'auctions',
                id: `${this.auction.id}`,
              },
            },
          },
          type: 'auction-images',
        }
        const formData = serialize({ data })

        //! store.dispatch(...) не работает с файлами, поэтомy приходится делать так
        this.$axios
          .post('/auction-images', formData)
          .then(async ({ data: result }) => {
            await this.$store.commit('auction-images/STORE_RECORD', result.data)
            // eslint-disable-next-line prettier/prettier
            await this.$store.commit('auction-images/STORE_LAST_CREATED', result.data)
            await this.$emit(
              'created',
              this.$store.getters['auction-images/lastCreated']
            )
          })
      }
    },
  },
}
</script>
