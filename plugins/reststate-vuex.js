import { resourceModule } from '@reststate/vuex'
import { jsonapiModule } from 'jsonapi-vuex'

export default function ({ $axios, store }) {
  store.registerModule(
    'users',
    resourceModule({ name: 'users', httpClient: $axios })
  )
  store.registerModule(
    'accounts',
    resourceModule({ name: 'accounts', httpClient: $axios })
  )
  store.registerModule(
    'counterparties',
    resourceModule({ name: 'counterparties', httpClient: $axios })
  )
  store.registerModule(
    'addresses',
    resourceModule({ name: 'addresses', httpClient: $axios })
  )
  store.registerModule(
    'auctions',
    resourceModule({ name: 'auctions', httpClient: $axios })
  )
  store.registerModule(
    'lots',
    resourceModule({ name: 'lots', httpClient: $axios })
  )
  store.registerModule(
    'contracts',
    resourceModule({ name: 'contracts', httpClient: $axios })
  )

  store.registerModule('jv', jsonapiModule($axios))
}
