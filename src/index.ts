import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import http from "http"
import application from "./config/application"
import { Start } from "./lib/start"
import router from "./router"
const app = express()
const httpServer = http.createServer(app)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.meta = {
    date: new Date(),
    method: req.method,
    start: new Date().getMilliseconds()
  }

  res.on("finish", () => {
    req.meta.finish = new Date().getMilliseconds()
    console.log(
      `"${req.baseUrl}${req.path}" | ${req.meta.method} | ${
        (req.meta.finish - req.meta.start) / 1000
      } second(s)`
    )
  })

  next()
})
app.use(router)

httpServer.listen(application.port, async () => {
  new Start().initialize()

  let finalHost =
    application.env === "dev"
      ? `${application.host}:${application.port}`
      : `${application.host}`

  console.log(`Api ${application.name} running on: ${finalHost}`)
})
