import { render as renderRowItem } from '../../mixins/resourceRowItem'

const valueExtractor = (attribute, _item, _h) => {
  switch (attribute) {
    default:
      return null
  }
}

export default {
  name: 'UserRowItem',
  functional: true,
  props: {
    headers: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    rtl: Boolean,
  },

  render: (createElement, hack) =>
    renderRowItem(createElement, hack, valueExtractor),
}
