import React from "react"
import { Flex, Text, Box, Link as ReLink } from "rebass"
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
      px={2}
      color="white"
      bg="black"
      alignItems="center"
    >
      <Link variant="nav" to="/">
        AutoFind
      </Link>

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
          <Text>{`${currentLocation.components.city} ${currentLocation
            .components.neighbourhood ||
            currentLocation.components.state}`}</Text>
        </Flex>
      </Link>

      <Box mx="auto" />
    </Flex>
  )
}
