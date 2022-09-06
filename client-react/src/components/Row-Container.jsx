import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import notFound from '../assets/NotFound.svg'
import { useStateValue } from '../hooks/useStateValue'
import { SET_CART_ITEMS } from '../store/types'

const RowContainer = ({ flag, data, scroll }) => {
  const rowContainer = useRef()

  const [items, setItems] = useState([])

  const [{ cartItems }, dispatch] = useStateValue()

  const addToCart = () => {
    dispatch({
      type: SET_CART_ITEMS,
      cartItems: items
    })

    localStorage.setItem('cart-items', JSON.stringify(items))
  }

  useEffect(() => {
    rowContainer.current.scrollLeft += scroll
  }, [scroll])

  useEffect(() => addToCart(), [items])

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data && data.length > 0
        ? (
            data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  className="w-full h-full object-contain"
                  alt={item?.title}
                />
              </motion.div>
              <motion.div
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                whileTap={{ scale: 0.75 }}
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calorías
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
            ))
          )
        : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={notFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Artículos No Disponibles
          </p>
        </div>
          )}
    </div>
  )
}

export default RowContainer
