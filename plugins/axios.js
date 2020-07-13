export default function (nuxt) {
  const { $axios, app } = nuxt
  const { $toast } = app

  // eslint-disable-next-line
  $axios.onRequest((config) => {})

  $axios.onError((error) => {
    switch (error.response.status) {
      case 403:
        $toast.error('Forbidden')
        break
      case 406:
        $toast.error('Ошибка валидации')
        break
      case 500:
        $toast.error('Ошибка сервера')
    }
  })

  $axios.onResponse((response) => {
    switch (response.status) {
      case 201:
        $toast.success('Успешно создано')
        break
      case 202:
        $toast.success('Обновлено')
        break
      case 204:
        $toast.success('Удалено')
    }
  })
}
