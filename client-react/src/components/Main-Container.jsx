import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useStateValue } from '../hooks/useStateValue'
import CartContainer from './Cart-Container'
import HomeContainer from './Home-Container'
import MenuContainer from './Menu-Container'
import RowContainer from './Row-Container'

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue()
  const [scroll, setScroll] = useState(0)

  useEffect(() => {}, [scroll, cartShow])

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer/>
      <section className="w-full my-6">
        <div className="w-full flex-items-center justify-center">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:content before:w-44 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Frutas frescas y saludables
          </p>
          <div className="hidden md.flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScroll(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScroll(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scroll={scroll}
          flag={true}
          data={foodItems?.filter((item) => item.category === 'fruits')}
        />
      </section>
      <MenuContainer/>
      {cartShow && <CartContainer/>}
    </div>
  )
}

export default MainContainer
