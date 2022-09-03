import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateContainer, Header, MainContainer } from './components'
import { StateProvider } from './context/State-Provider'
import reducer from './store/reducers/reducer'
import { initialState } from './store/state'

function App () {
  return (
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
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
      </StateProvider>
    </BrowserRouter>
  )
}

export default App
