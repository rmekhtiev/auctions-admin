export default function ({ $auth }) {
  if (
    $auth.user &&
    $auth.user.attributes.role !== 'ADMIN' &&
    $auth.user.attributes.role !== 'MODERATOR'
  ) {
    return $auth.redirect('logout')
  }
}
