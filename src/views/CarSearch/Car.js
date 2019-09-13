import React, { useState } from "react"
import useForm from "react-hook-form"
import { Button, Box, Flex } from "rebass"
import { uniqBy } from "lodash"

import { checkMMY } from "api"
import { FormGroup, FormHeading } from "components/Form"
import Loading from "components/Loading"
import { useLocationContext } from "state/location"

import { FormError } from "./utils"

const CarSearchForm = ({
  setSearchResult,
  setHasFetched,
  fetching,
  setFetching,
  setSearchFailed,
  preferUsed,
}) => {
  const [formError, setFormError] = useState(null)
  const { register, handleSubmit, errors } = useForm()
  const { currentLocation } = useLocationContext()

  const submit = async data => {
    // Either `make` or `model` should be filled in at minimum to allow the form to submit
    if (!data.make && !data.model) {
      return setFormError("Requires make or model")
    } else {
      setFormError(null)
    }
    setHasFetched(false)
    setFetching(true)
    try {
      const resp = await checkMMY({
        data: {
          ...data,
          car_type: preferUsed ? "used" : "new",
          latitude: currentLocation.geometry.lat,
          longitude: currentLocation.geometry.lng,
        },
      })

      setSearchResult(uniqBy(resp.listings, "id"))
      setHasFetched(true)
      setFetching(false)
    } catch (e) {
      setSearchFailed(true)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(submit)}>
      {formError && <FormError>{formError}</FormError>}
      <FormGroup
        my={2}
        label={"Make (Manufacturer)"}
        name={"make"}
        type={"text"}
        placeholder={"eg: Ford"}
        ref={register}
      />

      <FormGroup
        my={2}
        label={"Model"}
        type={"text"}
        name={"model"}
        placeholder={"eg: Mustang"}
        ref={register}
      />
      {errors.model && (
        <FormError>
          {errors.model.type === "required" && "Model is required"}
        </FormError>
      )}

      <Flex my={2}>
        <FormGroup
          label={"Year"}
          type={"number"}
          name={"year"}
          ref={register}
        />

        <Box mx={2} />

        <FormGroup
          label={"Radius (Miles)"}
          type={"number"}
          name={"radius"}
          defaultValue={10}
          ref={register}
        />
      </Flex>

      {fetching ? (
        <Loading />
      ) : (
        <Button variant="primary" type="submit">
          Search
        </Button>
      )}
    </Box>
  )
}

export default props => {
  return (
    <Box my={4}>
      <FormHeading my={3}>Search by Model/Make/Year</FormHeading>
      <Flex flex={1}>
        <CarSearchForm {...props} />
      </Flex>
    </Box>
  )
}
