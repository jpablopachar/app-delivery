import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StateProvider } from './context/State-Provider'
import './index.css'
import reducer from './store/reducers/reducer'
import { initialState } from './store/state'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App/>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
)
