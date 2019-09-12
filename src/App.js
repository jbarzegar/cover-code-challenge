import React, { useEffect } from "react"
import Navbar from "components/Navbar"
import { useRoute, useLocation, Redirect } from "wouter"
import { useLocationContext } from "./state/location"

import Router from "./Router"

const App = () => {
  const { currentLocation } = useLocationContext()
  const [match] = useRoute("/city")
  const [, setLocation] = useLocation()

  const shouldFetchCity = currentLocation === {} || !currentLocation.formatted

  useEffect(() => {
    if (shouldFetchCity && !match) {
      setLocation("/city")
    }
  }, [shouldFetchCity, match, setLocation])

  return (
    <>
      {!shouldFetchCity && <Navbar />}
      <Router />
    </>
  )
}

export default App
