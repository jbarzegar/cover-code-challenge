import React from "react"
import Loader from "react-loading"

const Loading = props => (
  <Loader {...props} type="bubbles" color="#000" {...props} />
)

export default Loading
