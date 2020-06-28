export default {
  data: () => ({
    userRoles: [
      { title: 'Администратор', slug: 'ADMIN' },
      { title: 'Модератор', slug: 'MODERATOR' },
      { title: 'Антикризисный', slug: 'BANKRUPTCY_MANGER' },
      { title: 'Пользователь', slug: 'USER' },
    ],
  }),
  computed: {},
  methods: {
    openUserPage({ id }) {
      this.$router.push({ name: 'users-id', params: { id } })
    },
  },
}
