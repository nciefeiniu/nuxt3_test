export const clearAllCookie = () => {
  const cookie = useCookie('website-login-cookie')
  const cookieUserName = useCookie('website-login-username')
  const cookieUserPackage = useCookie('website-login-userpackage')
  cookie.value = null
  cookieUserName.value = null
  cookieUserPackage.value = null
}
