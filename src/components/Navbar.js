import React from "react"
import { Flex, Text, Box, Link as ReLink, Button } from "rebass"
import { Link as WouterLink } from "wouter"
import { useLocationContext } from "state/location"

import MaterialIcon from "components/MaterialIcon"

const Link = props => <ReLink as={WouterLink} {...props} />

export default ({ hidden = false }) => {
  const { currentLocation } = useLocationContext()

  return (
    <Flex
      css={`
        display: ${hidden ? "none" : "flex"};
      `}
      px={3}
      py={2}
      color="black"
      bg="white"
      alignItems="center"
    >
      <Link color="secondary" fontSize={4} variant="nav" to="/">
        AutoFind
      </Link>

      <Box mx="auto" />

      <Link variant="nav" to="/city">
        <Flex
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "primary",
            },
          }}
          alignItems="center"
        >
          <MaterialIcon icon="location_city" />
          <Text>{`${currentLocation.components.city ||
            currentLocation.components.county} ${currentLocation.components
            .neighbourhood || currentLocation.components.state}`}</Text>
          <Button
            sx={{
              fontSize: 0,
              cursor: "pointer",
            }}
            ml={3}
          >
            Change Location
          </Button>
        </Flex>
      </Link>
    </Flex>
  )
}
