import React, { useState, useEffect } from "react"
import { Box, Text, Flex } from "rebass"
import { Radio, Label } from "@rebass/forms"
import CurrencyFormat from "react-currency-format"
import { get } from "lodash"

import Link from "components/Link"
import Container from "components/Container"
import Loading from "components/Loading"
import { useLocationContext } from "state/location"

import VinSearchForm from "./Vin"
import Car from "./Car"

const CarSearch = () => {
  // Either 'vin' or 'mmy'
  const [searchingBy, setSearchingBy] = useState(
    localStorage.getItem("searchBy") || "vin"
  )
  const [fetching, setFetching] = useState()
  const [searchFailed, setSearchFailed] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [result, setResult] = useState([])
  const [avgPrice, setAvgPrice] = useState()
  const { currentLocation } = useLocationContext()

  useEffect(() => {
    localStorage.setItem("searchBy", searchingBy)
  }, [searchingBy])

  useEffect(() => {
    if (fetching) {
      setSearchFailed(false)
    }
  }, [fetching])

  useEffect(() => {
    if (searchFailed) {
      setFetching(false)
    }
  }, [searchFailed])

  useEffect(() => {
    if (result.length) {
      // Get the average price for all shown listings
      const sum = result
        .filter(x => !!x.price)
        .map(x => x.price)
        .reduce((prev, next) => prev + next, 0)

      setAvgPrice((sum / result.length).toFixed(2))
    }
  }, [result])

  const isEmpty = hasFetched && result.length <= 0

  const searchComponents = {
    mmy: () => (
      <Car
        setHasFetched={setHasFetched}
        setFetching={setFetching}
        setSearchResult={setResult}
        setSearchFailed={setSearchFailed}
      />
    ),
    vin: () => (
      <Box my={4}>
        <Text fontSize={3}>Search by VIN</Text>
        <VinSearchForm
          setHasFetched={setHasFetched}
          setFetching={setFetching}
          setSearchResult={setResult}
          setSearchFailed={setSearchFailed}
        />
      </Box>
    ),
  }

  return (
    <Container alignItems="flex-start" as={Flex}>
      <Flex
        flex={2}
        flexDirection="column"
        justifyContent="space-between"
        mt={4}
      >
        <Text mb={2} fontSize={6}>
          Search For Vehicle
        </Text>
        <Flex mb={2}>
          <Text pr={1}>Currently Looking in</Text>
          <Text pr={1}>{currentLocation.components.city}</Text>
          <Text> {currentLocation.components.neighbourhood || ""}</Text>
        </Flex>
        <Link mb={4} to="/city">
          Change Location
        </Link>

        <Text mb={3} fontSize={2}>
          Search by:
        </Text>
        <Flex>
          <Label width="150px" mr={1}>
            <Text>VIN</Text>
            <Radio
              ml={3}
              checked={searchingBy === "vin"}
              onChange={e => setSearchingBy("vin")}
              name="search_by"
              id="vin"
            />
          </Label>
          <Label>
            <Text>Make/Model/Year</Text>
            <Radio
              checked={searchingBy === "mmy"}
              onChange={e => setSearchingBy("mmy")}
              name="search_by"
              id="mmy"
              value="mmy"
            />
          </Label>
        </Flex>

        {searchComponents[searchingBy]()}
      </Flex>

      <Box flex={2} py={4}>
        {fetching && <Loading />}
        {searchFailed && (
          <Text fontSize={3}>
            Sorry, something went wrong. (PS. May be getting rate limited)
          </Text>
        )}
        {isEmpty ? (
          <>
            <Text fontSize={3}>No Listings found</Text>
          </>
        ) : (
          <>
            {avgPrice && (
              <CurrencyFormat
                value={avgPrice}
                displayType={"text"}
                thousandSeparator
                prefix={"$"}
                renderText={value => (
                  <Text my={4} fontSize={3}>
                    Average listing price: {value}
                  </Text>
                )}
              />
            )}

            {hasFetched && (
              <Text fontSize={4}>Found {result.length} Listings:</Text>
            )}

            {result.map(listing => (
              <Box my={3} key={listing.id}>
                <Link to={`/listing/${listing.id}`}>
                  <Text mb={1} fontSize={4}>
                    {listing.heading || listing.seller_name_o}
                  </Text>
                  <Text fontSize={3} color="text">
                    {get(listing, "dealer.city") || listing.city}
                    {get(listing, "dealer.street")}
                  </Text>
                </Link>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Container>
  )
}

export default CarSearch
