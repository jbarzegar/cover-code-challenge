import { useCallback } from "react"
import sendRequest from "utils/sendRequest"

// Fetch location data via https://opencagedata.com/api
// This function supports both reverse and forwards geocoding
export const useLocationFetcher = ({ setFetching, setLocation }) =>
  useCallback(
    async location => {
      const params = {
        key: process.env.REACT_APP_OPEN_CAGE_TOKEN,
        q: location,
        limit: 5,
      }

      setFetching(true)
      const data = await sendRequest("/opencagedata", {
        params,
        handleResponse: resp => resp.json(),
        options: {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      })

      setLocation(data.results)
      setFetching(false)
    },
    [setLocation, setFetching]
  )
