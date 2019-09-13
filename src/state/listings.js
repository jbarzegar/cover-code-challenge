import React, { createContext, useState, useContext } from "react"

const ListingsContext = createContext([])

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([])

  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      {children}
    </ListingsContext.Provider>
  )
}

export const useListingsContext = () => useContext(ListingsContext)
