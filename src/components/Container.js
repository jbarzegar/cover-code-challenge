import React from "react"
import { Box } from "rebass"

export default ({ ...props }) => (
  <Box
    css={`
      max-width: 70%;
    `}
    mx="auto"
    px={2}
    py={3}
    {...props}
  />
)
