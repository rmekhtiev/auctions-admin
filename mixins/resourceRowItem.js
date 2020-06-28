// import consola from 'consola'
import { deepFind } from '~/util/helpers'

const resourceRowItem = (options) => createMixin(options.resource)

const createMixin = () => ({
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
})

export function formatDatetime(item, attribute, moment) {
  return moment.utc(deepFind(item, attribute)).fromNow()
}

export function render(createElement, ctx, valueExtractor = () => null) {
  // consola.log(ctx)
  const { props, slots, data } = ctx
  const computedSlots = slots()

  const columns = props.headers.map((header) => {
    const children = []
    const datetimeNames = ['attributes.created_at', 'attributes.updated_at']

    const value = deepFind(props.item, header.value)
    const slotName = header.value
    const scopedSlot = data.scopedSlots && data.scopedSlots[slotName]
    const regularSlot = computedSlots[slotName]
    const extractedValue = valueExtractor(
      slotName,
      props.item,
      createElement,
      ctx
    )

    if (scopedSlot) {
      children.push(scopedSlot({ item: props.item, header, value }))
    } else if (regularSlot) {
      children.push(regularSlot)
    } else if (extractedValue) {
      children.push(extractedValue)
    } else if (datetimeNames.includes(slotName)) {
      children.push(formatDatetime(props.item, slotName, ctx.parent.$moment))
    } else {
      children.push(value == null ? value : String(value))
    }

    const textAlign = `text-${header.align || 'start'}`

    return createElement(
      'td',
      {
        class: {
          [textAlign]: true,
          'v-data-table__divider': header.divider,
        },
        // on: {
        //   click: ctx.listeners.click,
        // },
      },
      children
    )
  })

  return createElement('tr', {}, columns)
}

export default resourceRowItem
