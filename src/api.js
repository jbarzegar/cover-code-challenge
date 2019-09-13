import sendRequest from "utils/sendRequest"

export const apiHost = "https://marketcheck-prod.apigee.net/v1"
export const defaultParams = {
  api_key: process.env.REACT_APP_API_MARKET_CHECK_TOKEN,
}

export const checkVin = ({ vin, ...data }) =>
  sendRequest(`${apiHost}/search`, {
    params: {
      ...defaultParams,
      ...data,
      vins: vin,
      start: 0,
      row: 10,
    },
    handleResponse: resp => resp.json(),
  })

// MMY = make model year
export const checkMMY = async ({ data }) => {
  if (!data) return

  return sendRequest(`${apiHost}/search`, {
    params: {
      ...defaultParams,
      ...data,
    },
    handleResponse: resp => resp.json(),
  })
}

export const checkListing = async listingId =>
  sendRequest(`${apiHost}/listing/${listingId}`, {
    params: defaultParams,
    handleResponse: resp => resp.json(),
  })
