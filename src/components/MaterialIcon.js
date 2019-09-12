/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import MIcon from "@material/react-material-icon"
import { Box } from "rebass"

export default ({
  icon = "",
  hasRipple = false,
  fontSize = "24px",
  ...props
}) => (
  <Box fontSize={fontSize} {...props}>
    <MIcon
      css={css`
        font-size: inherit;
      `}
      icon={icon}
      hasRipple={hasRipple}
    />
  </Box>
)
