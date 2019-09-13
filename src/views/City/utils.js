import { useCallback } from "react"
import sendRequest from "utils/sendRequest"

// Fetch location data via https://opencagedata.com/api
// This function supports both reverse and forwards geocoding
export const useLocationFetcher = ({ setLocation }) =>
  useCallback(
    async location => {
      const params = {
        key: process.env.REACT_APP_OPEN_CAGE_TOKEN,
        q: location,
        bounds: "-168.39844,24.84657,-50.62500,80.05805",
        limit: 5,
      }

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
    },
    [setLocation]
  )
