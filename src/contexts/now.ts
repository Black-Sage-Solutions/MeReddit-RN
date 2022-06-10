import { createContext } from 'react'

const NowContext = createContext<Date>(new Date())

export default NowContext
