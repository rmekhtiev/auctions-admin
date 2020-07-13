import _ from 'lodash'
import { removeStringPrefix } from '~/util/helpers'

const serverSidePaginated = (options) =>
  createMixin(options.resource, options.includes, options.watchSelection)

const createMixin = (resource, includes, _watchSelection = false) => {
  const data = () => ({
    filter: {},
    iteratorOptions: {
      itemsPerPage: 15,
      page: 1,
    },
    itemsLoading: true,
  })

  const computed = {
    items() {
      return this.$store.getters[resource + '/where'](this.serverPayload)
    },

    totalItems() {
      return this.$store.getters[resource + '/lastMeta']
        ? this.$store.getters[resource + '/lastMeta'].total
        : 0
    },

    pureFilter() {
      return _(this.filter).omitBy(_.isNull).omitBy(_.isUndefined).value()
    },

    sortString() {
      let str = ''

      this.iteratorOptions.sortBy &&
        this.iteratorOptions.sortBy.forEach((name, index) => {
          str +=
            (this.iteratorOptions.sortDesc[index] ? '-' : '') +
            removeStringPrefix(name, 'attributes.')
        })

      return str
    },

    serverPayload() {
      return {
        filter: this.pureFilter,
        options: {
          'page[number]': this.iteratorOptions.page,
          'page[limit]': this.iteratorOptions.itemsPerPage,
          sort: this.sortString,
          include: includes,
        },
      }
    },
  }

  return {
    data,
    computed,
    watch: {
      iteratorOptions: {
        handler() {
          this.loadItems()
        },
        deep: true,
      },
    },

    methods: {
      loadItems() {
        this.itemsLoading = true

        return this.$store
          .dispatch(resource + '/loadWhere', this.serverPayload)
          .then(() => {
            return this.loadRelated().then(() => {
              this.itemsLoading = false
            })
          })
      },

      loadRelated() {
        return Promise.resolve()
      },
    },
  }
}

export default serverSidePaginated
