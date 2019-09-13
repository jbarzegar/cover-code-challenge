import React, { useEffect, useState, useCallback } from "react"
import { Flex, Button, Text, Box, Heading } from "rebass"
import { useLocation } from "wouter"

import Loading from "components/Loading"
import { useLocationContext } from "state/location"

import Search from "./Search"
import { useLocationFetcher } from "./utils"

const buttonStyle = {
  transition: "background ease 0.3s",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "secondary",
  },
}

const OnboardingHeading = props => (
  <Heading
    sx={{
      maxWidth: 800,
    }}
    mx="auto"
    mb={5}
    width={"60%"}
    fontSize={5}
    {...props}
  />
)

export default () => {
  const [shouldDetectLocation, setShouldDetectLocation] = useState(false)
  const [autoDetectFailed, setAutoDetectedFailed] = useState(false)
  const [enterManually, setEnterManually] = useState(false)
  const [location, setLocation] = useState()
  const [locationOutsideUSA, setLocationOutsideUSA] = useState(false)
  const { setCurrentLocation } = useLocationContext()
  const [, setBrowserLocation] = useLocation()
  const [firstRunComplete] = useState(
    localStorage.getItem("firstRunComplete") || false
  )

  const saveLoc = useCallback(
    locData => {
      if (
        locData.components.country !== "USA" &&
        locData.components.country !== "Canada"
      ) {
        setLocationOutsideUSA(true)
      } else {
        setCurrentLocation(locData)
        setBrowserLocation("/")
        localStorage.setItem("firstRunComplete", true)
      }
    },
    [setBrowserLocation, setCurrentLocation]
  )

  const fetchLocationData = useLocationFetcher({
    setLocation,
  })

  useEffect(() => {
    if (shouldDetectLocation) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            fetchLocationData(`${coords.latitude}, ${coords.longitude}`)
          },
          err => {
            setShouldDetectLocation(false)
            setAutoDetectedFailed(true)
            setEnterManually(true)
          },
          {
            timeout: 1000,
            enableHighAccuracy: true,
          }
        )
      }, 1000)
    }
  }, [
    fetchLocationData,
    saveLoc,
    setEnterManually,
    setLocation,
    shouldDetectLocation,
  ])

  const renderIntro = !shouldDetectLocation && !enterManually

  if (locationOutsideUSA) {
    return (
      <Flex
        flexDirection="column"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <OnboardingHeading>
          Sorry but you must be located in the USA or Canada in order to use
          this application.
        </OnboardingHeading>

        <Button
          sx={buttonStyle}
          onClick={() => {
            setLocationOutsideUSA(false)
            setShouldDetectLocation(false)
            setEnterManually(true)
          }}
        >
          Pick a new location
        </Button>
      </Flex>
    )
  }

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {renderIntro && !firstRunComplete && (
        <Box>
          <OnboardingHeading>
            {/* It is a span. But eslint is being stubborn */}
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Box mr={2} as="span" role="img" aria-label="Waving hand">
              👋
            </Box>
            Hi there! Just before we get started, we need to get an idea of
            where you're located.
          </OnboardingHeading>
        </Box>
      )}

      {shouldDetectLocation && !enterManually && !location && (
        <Heading
          sx={{ display: "flex" }}
          textAlign="center"
          mb={5}
          fontSize={5}
        >
          <Text>Attempting to get your location</Text>
          <Box m="auto">
            <Loading />
          </Box>
        </Heading>
      )}

      {shouldDetectLocation && location && (
        <>
          <Heading
            sx={{ display: "flex" }}
            textAlign="center"
            mb={2}
            fontSize={5}
          >
            Got it! Does it look right to you?
          </Heading>

          <Text fontSize={4}>{location[0].formatted}</Text>

          <Flex mt={4}>
            <Button
              mr={3}
              sx={buttonStyle}
              onClick={() => {
                setShouldDetectLocation(false)
                setEnterManually(true)
              }}
            >
              Nope
            </Button>
            <Button sx={buttonStyle} onClick={() => saveLoc(location[0])}>
              Yes
            </Button>
          </Flex>
        </>
      )}

      {enterManually && !shouldDetectLocation && (
        <>
          {autoDetectFailed && (
            <Text fontSize={3} color="red" fontWeight={700} mb={3}>
              Sorry! We couldn't get your location automatically
            </Text>
          )}
          <Heading mb={3} fontSize={5}>
            Enter your location
          </Heading>
          <Search saveLoc={saveLoc} />
        </>
      )}

      {renderIntro && (
        <Box>
          <Button
            sx={buttonStyle}
            fontSize={3}
            mr={4}
            onClick={() => setShouldDetectLocation(true)}
          >
            Detect my location
          </Button>

          <Button
            sx={buttonStyle}
            fontSize={3}
            onClick={() => setEnterManually(true)}
          >
            Enter location manually
          </Button>

          <Text mt={5} mx="auto" fontWeight={700} textAlign="center">
            Please note you must be located in the
            <Box
              as="span"
              mx={1}
              mr={2}
              sx={{
                color: "secondary",
              }}
            >
              USA or Canada
            </Box>
            to use AutoFind.
          </Text>
        </Box>
      )}
    </Flex>
  )
}
