import qs from "query-string"
import sleep from "shleep"

// A simple wrapper around fetch to better handle query strings
// and keep data handling simple by requiring the caller to handle it themselves
const sendRequest = async (
  url,
  { params = {}, handleResponse = () => {}, options = {} }
) => {
  const send = async () => {
    try {
      const queryStr = qs.stringify(params)
      const queryParams = !!queryStr ? `?${queryStr}` : ""
      const resp = await fetch(url + queryParams, options)

      if (!resp.ok) {
        throw resp
      }

      const data = await handleResponse(resp)

      return data
    } catch (e) {
      throw e
    }
  }

  // This nested try/catch is an attempt to better handle issues with marketshares rate limiting
  // marketshare's api rate limit is 1 respest per second. If the rate limit is hit, this should gracefully reattempt the request
  try {
    const resp = await send()

    return resp
  } catch (e) {
    try {
      await sleep(1000) // Wait for the rate limit to expire
      const resp = await send()
      return resp
    } catch (e) {
      throw e
    }
  }
}

export default sendRequest
