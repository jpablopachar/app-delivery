import { useContext } from 'react'
import StateContext from '../context/State-Provider'

export const useStateValue = () => useContext(StateContext)
