import qs from "query-string"

// A simple wrapper around fetch to better handle query strings
// and keep data handling simple by requiring the caller to handle it themselves
const sendRequest = async (
  url,
  { params = {}, handleResponse = () => {}, options = {} }
) => {
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

export default sendRequest
