export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear()

  return userInfo
}

export const fetchCart = () => {
  const cartInfo =
    localStorage.getItem('cart-items') !== 'undefined'
      ? JSON.parse(localStorage.getItem('cart-items'))
      : []

  if (!cartInfo) localStorage.clear()

  return cartInfo
}
