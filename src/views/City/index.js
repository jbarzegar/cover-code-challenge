import React, { useEffect, useState, useCallback } from "react"
import { Flex, Button, Text } from "rebass"
import { useLocation } from "wouter"

import MaterialIcon from "components/MaterialIcon"
import Loading from "components/Loading"
import { useLocationContext } from "state/location"

import Search from "./Search"
import { useLocationFetcher } from "./utils"

export default () => {
  const [fetching, setFetching] = useState(false)
  const [enterManually, setEnterManually] = useState(false)
  const [location, setLocation] = useState()
  const { setCurrentLocation } = useLocationContext()
  const [, setBrowserLocation] = useLocation()

  const saveLoc = useCallback(
    locData => {
      setCurrentLocation(locData)
      setBrowserLocation("/")
    },
    [setBrowserLocation, setCurrentLocation]
  )

  const fetchLocationData = useLocationFetcher({ setFetching, setLocation })

  useEffect(() => {
    setTimeout(() => {
      setFetching(true)
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchLocationData(`${coords.latitude}, ${coords.longitude}`)
        },
        err => {
          console.warn(err)
          setFetching(false)
          setEnterManually(true)
        },
        {
          timeout: 6000,
          enableHighAccuracy: true,
        }
      )
    }, 1000)

    return () => {
      setFetching(false)
      setEnterManually(false)
    }
  }, [fetchLocationData, saveLoc, setEnterManually, setLocation])

  const shouldShowCityConfirm = location && !enterManually

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex alignItems="center" mb={2}>
        <MaterialIcon fontSize={32} icon="location_city"></MaterialIcon>
        {fetching && (
          <Text fontSize={4}>Attempting to detect your location...</Text>
        )}
        {!fetching && (
          <Text fontSize={4}>
            {shouldShowCityConfirm
              ? "Does this look right?"
              : enterManually
              ? "Where are you looking?"
              : ""}
          </Text>
        )}
      </Flex>
      {shouldShowCityConfirm ? (
        <>
          <Text fontSize={2}>{location[0].formatted}</Text>
          <Flex mt={3}>
            <Button mr={2} onClick={() => setEnterManually(true)}>
              No
            </Button>
            <Button onClick={() => saveLoc(location[0])}>Yes!</Button>
          </Flex>
        </>
      ) : fetching ? (
        <Loading />
      ) : (
        enterManually && <Search saveLoc={saveLoc} />
      )}
    </Flex>
  )
}
