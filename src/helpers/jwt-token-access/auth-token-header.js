export default function authHeader() {
  const authUser = getData("authUser")
  const obj = authUser

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else {
    return {}
  }
}
