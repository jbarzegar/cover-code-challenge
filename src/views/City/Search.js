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
      <form
        onSubmit={e => {
          e.preventDefault()
          fetchLocationData(search)
        }}
      >
        <Label mb={1}>Enter your city/address or zip/postal code</Label>
        <Input
          type="text"
          onChange={e => setSearch(e.currentTarget.value)}
        ></Input>
      </form>

      {fetching ? (
        <Loading />
      ) : (
        <Box>
          {locations.map(x => (
            <Box
              onClick={() => saveLoc(x)}
              key={uniqueId(x.formatted)}
              my={2}
              py={1}
              css={`
                border-bottom: 1px solid #000;
                cursor: pointer;
              `}
            >
              <Text>{x.formatted}</Text>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default Search
