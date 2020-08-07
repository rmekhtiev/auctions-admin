export default {
  data: () => ({
    rules: {
      counterparties: {
        email: [
          (value) => !!value || 'Это поле обязательное',
          (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Введите email'
          },
        ],
        inn: [
          (value) => !!value || 'Это поле обязательное',
          (value) => {
            const pattern = /[0-9]{9}/
            return pattern.test(value) || 'Неверный УНП'
          },
        ],
        phone: [(value) => !!value || 'Это поле обязательное'],
        full_name: [(value) => !!value || 'Это поле обязательное'],
        short_name: [(value) => !!value || 'Это поле обязательное'],
        egr_date: [(value) => !!value || 'Это поле обязательное'],
        type: [(value) => !!value || 'Это поле обязательное'],
      },
      addresses: {
        country_code: [(value) => !!value || 'Это поле обязательное'],
        state: [(value) => !!value || 'Это поле обязательное'],
        city: [(value) => !!value || 'Это поле обязательное'],
        address: [(value) => !!value || 'Это поле обязательное'],
        postal_code: [(value) => !!value || 'Это поле обязательное'],
      },
      lots: {
        required: [(value) => !!value || 'Это поле обязательное'],
      },
    },
  }),
}
