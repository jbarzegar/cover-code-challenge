import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "emotion-theming"
import theme from "@rebass/preset"
import { LocationProvider } from "./state/location"
import "./index.css"

import App from "./App"

render(
  <ThemeProvider theme={theme}>
    <LocationProvider>
      <App />
    </LocationProvider>
  </ThemeProvider>,
  document.getElementById("root")
)
