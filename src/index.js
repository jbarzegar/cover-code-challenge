import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "emotion-theming"
import theme from "@rebass/preset"
import { LocationProvider } from "./state/location"
import "./index.css"

import App from "./App"
render(
  <ThemeProvider
    theme={{
      ...theme,
      colors: {
        ...theme.colors,
        secondary: "#E90943",
        primary: "#0A31AE",
      },
      radii: {
        default: 20,
      },
    }}
  >
    <LocationProvider>
      <App />
    </LocationProvider>
  </ThemeProvider>,
  document.getElementById("root")
)
