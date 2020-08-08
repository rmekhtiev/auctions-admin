<template>
  <v-card>
    <v-card-title>
      <div class="overline">{{ heading }}</div>
      <v-spacer />
      <v-btn icon color="primary" @click="createImage()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <div v-for="(image, i) in images" :key="image.id" @click="openGallery(i)">
      <image-item :image="image" />
    </div>

    <v-dialog v-model="galleryDialog" max-width="900" class="px-3">
      <v-card>
        <v-carousel v-model="counter" height="auto" hide-delimiter-background>
          <v-carousel-item v-for="(image, i) in images" :key="i">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="black--text">{{
                  image.attributes.title
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action @click="deleteImage(image)">
                <v-btn icon color="red">
                  <v-icon>mdi-delete-alert</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon color="black" @click="galleryDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-sheet max-height="100vh" height="100%">
              <v-row>
                <v-img
                  contain
                  max-height="100vh"
                  :src="image.attributes.path"
                ></v-img>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
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

  data() {
    return {
      galleryDialog: false,
      counter: 0,
    }
  },
  methods: {
    openGallery(i) {
      this.galleryDialog = true
      this.counter = i
    },

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
            await this.$store.commit(
              'auction-images/STORE_LAST_CREATED',
              result.data
            )
            await this.$emit(
              'created',
              this.$store.getters['auction-images/lastCreated']
            )
          })
      }
    },

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
