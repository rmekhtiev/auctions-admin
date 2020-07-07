export default {
  data: () => ({
    userRoles: [
      { title: 'Администратор', value: 'ADMIN' },
      { title: 'Модератор', value: 'MODERATOR' },
      { title: 'Антикризисный', value: 'BANKRUPTCY_MANGER' },
      { title: 'Пользователь', value: 'USER' },
    ],
  }),
  computed: {},
  methods: {
    openUserPage({ id }) {
      this.$router.push({ name: 'users-id', params: { id } })
    },
  },
}
