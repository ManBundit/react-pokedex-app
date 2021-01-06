import React, { createContext, useState } from 'react'

export const PokedexContext = createContext()

export default ({ children }) => {
  const [pokedexList, setPokedexList] = useState([])
  const [isActiveModal, setIsActiveModal] = useState(false)
  return (
    <PokedexContext.Provider value={{ 
      pokedexList, 
      setPokedexList,
      isActiveModal,
      setIsActiveModal
    }}>
      {children}
    </PokedexContext.Provider>
  )
}