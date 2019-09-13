import React, { useState } from "react"
import { Button, Text, Flex, Box } from "rebass"
import { Checkbox, Label } from "@rebass/forms"
import useForm from "react-hook-form"
import { uniqBy, capitalize } from "lodash"

import { checkVin } from "api"
import { FormGroup, FormHeading } from "components/Form"
import Loading from "components/Loading"
import { useLocationContext } from "state/location"

import { FormError } from "./utils"

const matchTypes = ["make", "model", "year"]

const VinSearchForm = ({
  setSearchResult,
  setHasFetched,
  fetching,
  setFetching,
  setSearchFailed,
  preferUsed,
}) => {
  const { register, handleSubmit, errors } = useForm()
  const [match, setMatch] = useState(matchTypes)

  const { currentLocation } = useLocationContext()

  const submit = async data => {
    setFetching(true)
    setHasFetched(false)
    try {
      let resp = await checkVin({
        ...data,
        car_type: preferUsed ? "used" : "new",
        match: match.join(","),
        latitude: currentLocation.geometry.lat,
        longitude: currentLocation.geometry.lng,
      })
      setSearchResult(uniqBy(resp.listings, "id"))
      setFetching(false)
      setHasFetched(true)
    } catch (e) {
      setSearchFailed(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormHeading mt={4} mb={3}>
        Find similar inventory using a VIN
      </FormHeading>

      <FormGroup
        name="vin"
        type="text"
        placeholder="VIN"
        ref={register({
          required: true,
          minLength: 17,
          // https://regexr.com/3ars8
          pattern: /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/g,
        })}
      />
      {errors.vin && (
        <FormError>
          {errors.vin.type === "pattern" && "You have not entered a valid VIN"}
        </FormError>
      )}

      <FormHeading mt={4}>Find similar cars matching:</FormHeading>
      <Flex my={3}>
        {matchTypes.map(m => (
          <Box mr={4}>
            <Label sx={{ cursor: "pointer" }} alignItems="center">
              {capitalize(m)}
              <Checkbox
                checked={match.includes(m)}
                onChange={() => {
                  if (match.includes(m)) {
                    setMatch(match.filter(x => m !== x))
                  } else {
                    setMatch([...match, m])
                  }
                }}
              ></Checkbox>
            </Label>
          </Box>
        ))}
      </Flex>

      <FormGroup
        my={3}
        name="radius"
        type="number"
        defaultValue={10}
        label="Radius (Miles)"
        ref={register}
      />

      {fetching ? (
        <Loading />
      ) : (
        <Button variant="primary" type="submit">
          Search
        </Button>
      )}
    </form>
  )
}

export default VinSearchForm
