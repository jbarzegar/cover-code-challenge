import sendRequest from "utils/sendRequest"

export const apiHost = "https://marketcheck-prod.apigee.net/v1"
export const defaultParams = {
  api_key: process.env.REACT_APP_API_MARKET_CHECK_TOKEN,
}

export const checkVin = vin =>
  sendRequest(`${apiHost}/history/${vin}`, {
    params: defaultParams,
    handleResponse: resp => resp.json(),
  })

// MMY = make model year
export const checkMMY = async ({ data, radius = 10 }) => {
  if (!data) return

  const params = Object.entries(data).reduce((obj, [key, value]) => {
    if (key === "used") {
      // The value of 'used' is a boolean
      obj["car_type"] = !!value ? "used" : "new"
    } else {
      obj[key] = value
    }

    return obj
  }, {})

  return sendRequest(`${apiHost}/search`, {
    params: {
      radius,
      ...defaultParams,
      ...params,
    },
    handleResponse: resp => resp.json(),
  })
}

export const checkListing = async listingId =>
  sendRequest(`${apiHost}/listing/${listingId}`, {
    params: defaultParams,
    handleResponse: resp => resp.json(),
  })
