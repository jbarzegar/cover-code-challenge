import React from "react"
import { Box } from "rebass"
import Loader from "react-loading"

const Loading = props => (
  <Box {...props}>
    <Loader type="bubbles" color="#000" />
  </Box>
)

export default Loading
