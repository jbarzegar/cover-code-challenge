import React, { useState } from "react"
import useForm from "react-hook-form"
import { Button, Box, Text, Flex } from "rebass"
import { Checkbox, Label } from "@rebass/forms"

import { checkMMY } from "api"
import { FormGroup } from "components/Form"
import { useLocationContext } from "state/location"

import { FormError } from "./utils"

const CarSearchForm = ({
  setSearchResult,
  setHasFetched,
  setFetching,
  setSearchFailed,
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
    setFetching(true)
    try {
      const resp = await checkMMY({
        data: {
          ...data,
          latitude: currentLocation.geometry.lat,
          longitude: currentLocation.geometry.lng,
        },
      })

      setSearchResult(resp.listings)
      setHasFetched(true)
      setFetching(false)
    } catch (e) {
      setSearchFailed(true)
    }
  }

  return (
    <Box flex={1} as="form" onSubmit={handleSubmit(submit)}>
      {formError && <FormError>{formError}</FormError>}
      <FormGroup
        label={"Make (Manufacturer)"}
        name={"make"}
        type={"text"}
        placeholder={"eg: Ford"}
        ref={register}
      />

      <FormGroup
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

      <Flex width={1 / 2}>
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

      <Label
        css={`
          cursor: pointer;
        `}
        my={3}
        alignItems="center"
      >
        <Text mr={3} fontSize={3}>
          Prefer Used?
        </Text>
        <Checkbox name="used" id="used" ref={register}></Checkbox>
      </Label>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Box>
  )
}

export default props => {
  return (
    <Box my={4}>
      <Text fontSize={3}>Search by Model/Make/Year</Text>
      <Flex flex={1}>
        <CarSearchForm {...props} />
      </Flex>
    </Box>
  )
}
