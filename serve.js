const express = require("express")
const app = express()
const proxy = require("./proxy")
const path = require("path")
const chalk = require("chalk")

const buildPath = path.resolve(__dirname, "build")
const port = process.env.PORT || 5000

proxy(app)

app.use(express.static(buildPath))

app.get("*", (_, res) => {
  res.sendFile(path.join(buildPath, "index.html"))
})

app.listen(port, () => {
  console.log("")
  console.log(chalk.green(`Server running on localhost:${port}`))
})
