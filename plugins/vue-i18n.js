import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ru from '../lang/ru.json'

Vue.use(VueI18n)

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
      ru,
    },
  })
}
