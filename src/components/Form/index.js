import React, { forwardRef } from "react"
import { Box } from "rebass"
import { Label, Input } from "@rebass/forms"

export const FormGroup = forwardRef(({ label, as = Input, ...props }, ref) => (
  <Label
    css={`
      flex-direction: column;
    `}
    width={1 / 2}
    my={2}
  >
    {label}

    <Box mt={2} as={as} ref={ref} {...props}></Box>
  </Label>
))
