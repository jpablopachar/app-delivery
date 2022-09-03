import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateContainer, Header, MainContainer } from './components'

function App () {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <div className='w-screen h-auto flex flex-col bg-primary'>
          <Header/>
          <main className="mt-24 p-8 w-full">
              <Routes>
                <Route path='/*' element={<MainContainer/>}/>
                <Route path='/create-item' element={<CreateContainer/>}/>
              </Routes>
          </main>
        </div>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
