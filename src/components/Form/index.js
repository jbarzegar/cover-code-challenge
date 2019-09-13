import React, { forwardRef } from "react"
import { Box, Text } from "rebass"
import { Label, Input } from "@rebass/forms"

export const FormGroup = forwardRef(({ label, as = Input, ...props }, ref) => (
  <Label
    css={`
      flex-direction: column;
    `}
    width={"100%"}
    my={2}
  >
    {label}

    <Box mt={2} as={as} ref={ref} {...props}></Box>
  </Label>
))

export const FormHeading = props => (
  <Text fontSize={3} fontWeight={700} {...props}></Text>
)
