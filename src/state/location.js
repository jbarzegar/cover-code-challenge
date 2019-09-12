import React, { createContext, useState, useContext, useEffect } from "react"

const getSavedCurrentLocation = () => {
  const currentLocation = localStorage.getItem("currentLocation")

  if (!currentLocation) {
    return {}
  } else {
    return JSON.parse(currentLocation)
  }
}

export const LocationContext = createContext({
  currentLocation: {},
  setCurrentLocation: () => {},
})

export const LocationProvider = props => {
  const [currentLocation, setCurrentLocation] = useState(
    getSavedCurrentLocation()
  )

  useEffect(() => {
    if (currentLocation && Object.keys(currentLocation).length) {
      localStorage.setItem("currentLocation", JSON.stringify(currentLocation))
    }
  }, [currentLocation])

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
      }}
      {...props}
    ></LocationContext.Provider>
  )
}

export const useLocationContext = () => useContext(LocationContext)
