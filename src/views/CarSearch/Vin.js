import React from "react"
import { Button } from "rebass"
import useForm from "react-hook-form"

import { checkVin } from "api"
import { FormGroup } from "components/Form"
import { FormError } from "./utils"

const VinSearchForm = ({
  setSearchResult,
  setHasFetched,
  setFetching,
  setSearchFailed,
}) => {
  const { register, handleSubmit, errors } = useForm()

  const submit = async ({ vin }) => {
    setFetching(true)
    try {
      let resp = await checkVin(vin)
      setSearchResult(resp)
      setFetching(false)
      setHasFetched(true)
    } catch (e) {
      setSearchFailed(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup
        label="Vin"
        name="vin"
        type="text"
        placeholder="VIN"
        ref={register({
          required: true,
          min: 17,
          // https://regexr.com/3ars8
          pattern: /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/g,
        })}
      />
      {errors.vin && (
        <FormError>
          {errors.vin.type === "pattern" && "You have not entered a valid VIN"}
        </FormError>
      )}

      <Button variant="primary" type="submit">
        Search
      </Button>
    </form>
  )
}

export default VinSearchForm
