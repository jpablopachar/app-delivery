import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import logo from '../assets/logo.png'
import { app } from '../config/firebase'
import { useStateValue } from '../hooks/useStateValue'
import { SET_CART_SHOW, SET_USER } from '../store/types'

const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [isMenu, setIsMenu] = useState(false)

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue()

  const login = async () => {
    if (!user) {
      const {
        user: { providerData }
      } = await signInWithPopup(firebaseAuth, provider)

      dispatch({ type: SET_USER, user: providerData[0] })

      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const logout = () => {
    setIsMenu(false)

    localStorage.clear()

    dispatch({ type: SET_USER, user: null })
  }

  const showCart = () => {
    dispatch({
      type: SET_CART_SHOW,
      cartShow: !cartShow
    })
  }

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Delivery App</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Inicio
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menú
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Acerca de
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Servicios
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === 'jpablopachar1993@gmail.com' && (
                  <Link to={'/create-item'}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      Nuevo Artículo <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </div>
        <Link to={'/'} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Ciudad</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === 'jpablopachar1993@gmail.com' && (
                <Link to={'/create-item'}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    Nuevo Artículo <MdAdd />
                  </p>
                </Link>
              )}
              <ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col"
              >
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Inicio
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Menú
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Acerca de
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Servicios
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
