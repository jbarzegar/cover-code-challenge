import React, { useState, useEffect } from "react"
import { Text, Box, Flex } from "rebass"
import CurrencyFormat from "react-currency-format"
import { get, capitalize, uniqueId } from "lodash"

import { checkListing } from "api"

import MaterialIcon from "components/MaterialIcon"
import Container from "components/Container"
import Loading from "components/Loading"
import Link from "components/Link"

const InfoText = props => <Text flex={1} my={3} fontSize={3} {...props} />

export default ({ params }) => {
  const [fetchFailed, setFailed] = useState(false)
  const [listing, setListing] = useState()
  const listingId = get(params, "listingId")

  useEffect(() => {
    if (listingId) {
      checkListing(listingId)
        .then(l => setListing(l))
        .catch(err => {
          setFailed(true)
        })
    }
  }, [listingId])

  if (!listing) {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }

  const build = Object.entries(listing.build).filter(([k]) => k !== "trim_r")

  return (
    <Container>
      <Link
        to="/"
        css={`
          display: flex;
          align-items: center;
        `}
        mb={4}
        fontSize={3}
      >
        <MaterialIcon icon="arrow_back" />
        <Text pl={3} mt={"-5px"}>
          Back to search
        </Text>
      </Link>
      {fetchFailed && (
        <Text>
          Sorry Could not get listing (PS, May be getting rate limited)
        </Text>
      )}
      <Text mb={4} fontSize={5} fontWeight={700}>
        {listing.heading}
      </Text>

      <Text
        color={"text"}
        fontSize={4}
        fontWeight={700}
        as="a"
        href={listing.vdp_url}
      >
        <Flex alignItems="center">
          <Text>Go to listing</Text>
          <MaterialIcon ml={2} fontSize={4} icon="call_made"></MaterialIcon>
        </Flex>
      </Text>

      {listing.price ? (
        <CurrencyFormat
          value={listing.price}
          displayType={"text"}
          thousandSeparator
          prefix={"$"}
          renderText={value => (
            <Text mt={3} fontSize={4}>
              {value}
            </Text>
          )}
        />
      ) : (
        <Text mt={3} fontSize={4}>
          No Price Listed
        </Text>
      )}
      <Flex>
        <Box flex={1} mt={4}>
          <Text fontWeight="bold" mb={3} fontSize={4}>
            Info
          </Text>

          <Text flex={0.5} fontSize={3}>
            Condition: {listing.inventory_type}
          </Text>
          <InfoText>Exterior Color: {listing.base_ext_color}</InfoText>
          <InfoText>Interior Color: {listing.base_int_color}</InfoText>
          {build.map(([k, v]) => (
            <InfoText key={uniqueId("build")}>
              {capitalize(k.split("_").join(" "))}: {v}
            </InfoText>
          ))}

          <InfoText>Vin: {listing.vin}</InfoText>
        </Box>

        <Box flex={1} mt={4}>
          <Text fontWeight="bold" mb={3} fontSize={4}>
            Dealer Info
          </Text>

          <InfoText>{listing.dealer.name}</InfoText>
          <InfoText>{listing.dealer.street}</InfoText>
          <InfoText>
            {listing.dealer.city} {listing.dealer.state}
          </InfoText>

          <Text fontSize={3} as="a" href={`https://${listing.dealer.website}`}>
            Dealership Website
          </Text>
        </Box>

        <Box flex={1} ml="auto" mt={4}>
          {!listing.media.photo_links.length ? (
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: 350,
                width: 350,
                border: "1px solid",
                borderColor: "gray",
              }}
            >
              <MaterialIcon color="gray" fontSize="50px" icon="block" />
              <Text color="gray" fontSize={2}>
                No Images provided with this listing
              </Text>
            </Flex>
          ) : (
            listing.media.photo_links
              .slice(0, 3)
              .map(x => (
                <Box
                  key={uniqueId("listing_img")}
                  as="img"
                  my={2}
                  width="100%"
                  alt={listing.heading}
                  src={x}
                />
              ))
          )}
        </Box>
      </Flex>
    </Container>
  )
}
