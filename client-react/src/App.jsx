import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateContainer, Header, MainContainer } from './components'
import { useStateValue } from './hooks/useStateValue'
import { SET_FOOD_ITEMS } from './store/types'
import { getAllFoodItems } from './utils/firebase-functions'

function App () {
  const [{ foodItems }, dispatch] = useStateValue()

  console.log(foodItems)

  const fetchData = async () => {
    const data = await getAllFoodItems()

    if (data) {
      dispatch({
        type: SET_FOOD_ITEMS,
        foodItems: data
      })

      console.log(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header/>
        <main className="mt-16 md:mt-24 p-8 w-full">
          <Routes>
            <Route path='/*' element={<MainContainer/>}/>
            <Route path='/create-item' element={<CreateContainer/>}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
