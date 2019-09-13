import React, { useState } from "react"
import { Box, Text } from "rebass"
import { Input, Label } from "@rebass/forms"
import { uniqueId } from "lodash"

import Loading from "components/Loading"

import { useLocationFetcher } from "./utils"

const Search = ({ saveLoc }) => {
  const [search, setSearch] = useState()
  const [locations, setLocations] = useState([])
  const [fetching, setFetching] = useState(false)

  const fetchLocationData = useLocationFetcher({
    setFetching,
    setLocation: setLocations,
  })

  return (
    <>
      <Box
        as="form"
        mx="auto"
        sx={{
          minWidth: 380,
        }}
        onSubmit={e => {
          e.preventDefault()
          fetchLocationData(search)
        }}
      >
        {/* <Label mb={1}>Enter your address or zip/postal code</Label> */}
        <Input
          type="text"
          w={1 / 2}
          placeholder={"address or zip/postal code"}
          onChange={e => setSearch(e.currentTarget.value)}
        ></Input>
      </Box>

      {fetching ? (
        <Loading />
      ) : (
        <Box>
          {locations.map(x => (
            <Box
              onClick={() => saveLoc(x)}
              key={uniqueId(x.formatted)}
              my={3}
              py={2}
              css={`
                border-bottom: 1px solid #000;
                cursor: pointer;
              `}
            >
              <Text fontWeight={700} fontSize={2}>
                {x.formatted}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default Search
