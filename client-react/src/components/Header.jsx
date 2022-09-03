import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { motion } from 'framer-motion'
import { MdShoppingBasket } from 'react-icons/md'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import logo from '../assets/logo.png'
import { app } from '../config/firebase'

const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const login = async () => {
    const res = await signInWithPopup(firebaseAuth, provider)

    console.log(res)
  }

  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Ciudad</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Inicio
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menú
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Acerca de
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Servicios
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl"
              alt="userProfile"
              onClick={login}
            />
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full h-full p-4"></div>
    </header>
  )
}

export default Header
