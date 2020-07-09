import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter, {
  symbol: 'BYN',
  thousandsSeparator: ' ',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'after',
  symbolSpacing: true,
})
