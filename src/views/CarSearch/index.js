import React, { useState, useEffect, useRef } from "react"
import { Box, Text, Flex, Card, Heading } from "rebass"
import CurrencyFormat from "react-currency-format"
import { get } from "lodash"

import Link from "components/Link"
import Container from "components/Container"

import { useListingsContext } from "state/listings"
import VinSearchForm from "./Vin"
import Car from "./Car"

const Tab = ({ active = false, ...props }) => (
  <Box
    bg={active ? "primary" : "white"}
    color={active ? "white" : "text"}
    py={1}
    px={4}
    sx={{
      cursor: "pointer",
      transition: "background ease 0.3s, border-color ease 0.3s",
      border: "1px solid",
      borderColor: "primary",
      "&:hover": {
        color: "white",
        borderColor: "secondary",
        backgroundColor: "secondary",
      },
    }}
    {...props}
  ></Box>
)

const CarSearch = () => {
  // Either 'vin' or 'mmy'
  const [searchingBy, setSearchingBy] = useState(
    localStorage.getItem("searchBy") || "vin"
  )
  const [fetching, setFetching] = useState()
  const [searchFailed, setSearchFailed] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [avgPrice, setAvgPrice] = useState()
  const resultsRef = useRef()
  const { listings, setListings } = useListingsContext()

  useEffect(() => {
    localStorage.setItem("searchBy", searchingBy)
  }, [searchingBy])

  useEffect(() => {
    if (hasFetched) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [hasFetched])

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
    if (listings.length) {
      // Get the average price for all shown listings
      const sum = listings
        .filter(x => !!x.price)
        .map(x => x.price)
        .reduce((prev, next) => prev + next, 0)

      setAvgPrice((sum / listings.length).toFixed(2))
    }
  }, [listings])

  const isEmpty = hasFetched && listings.length <= 0

  const searchComponents = {
    mmy: () => (
      <Car
        setHasFetched={setHasFetched}
        fetching={fetching}
        setFetching={setFetching}
        setSearchResult={setListings}
        setSearchFailed={setSearchFailed}
      />
    ),
    vin: () => (
      <Box my={4}>
        <Text fontSize={3}>Search by VIN</Text>
        <VinSearchForm
          setHasFetched={setHasFetched}
          fetching={fetching}
          setFetching={setFetching}
          setSearchResult={setListings}
          setSearchFailed={setSearchFailed}
        />
      </Box>
    ),
  }

  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      as={Flex}
    >
      <Card
        m="auto"
        p={5}
        flexDirection="column"
        justifyContent="space-between"
        mt={4}
      >
        <Heading fontWeight={700} mb={4} fontSize={6}>
          Search For a Vehicle
        </Heading>
        <Text fontWeight="bold" mb={3} fontSize={2}>
          Search by:
        </Text>
        <Flex>
          <Tab
            onClick={() => setSearchingBy("mmy")}
            active={searchingBy === "mmy"}
          >
            Make/Model/Year
          </Tab>
          <Tab
            onClick={() => setSearchingBy("vin")}
            active={searchingBy === "vin"}
          >
            VIN
          </Tab>
        </Flex>

        {searchComponents[searchingBy]()}

        {isEmpty && (
          <Text color="red" fontSize={3}>
            No Listings found
          </Text>
        )}
      </Card>

      <Box flex={2} py={4} ref={resultsRef}>
        {searchFailed && (
          <Text fontSize={3}>
            Sorry, something went wrong. (PS. May be getting rate limited)
          </Text>
        )}
        {!isEmpty && (
          <>
            {avgPrice && (
              <CurrencyFormat
                value={avgPrice}
                displayType={"text"}
                thousandSeparator
                prefix={"$"}
                renderText={value => (
                  <Text fontWeight={700} my={4} fontSize={3}>
                    Average listing price: {value}
                  </Text>
                )}
              />
            )}

            {hasFetched && (
              <Text fontSize={4}>Found {listings.length} Listings:</Text>
            )}

            {listings.map(listing => (
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
