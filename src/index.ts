import "dotenv/config"
import express from "express"
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"
import application from "./config/application"
import router from "./router"
import initialize from "./lib/initialize"
const app = express()
const httpServer = http.createServer(app)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, _, next) => {
  req.meta = {
    date: new Date(),
    method: req.method,
    start: new Date().getMilliseconds()
  }

  next()
})

app.use(router)

httpServer.listen(application.port, async () => {
  await initialize()
  console.log(
    `Api "${application.name}" running on: ${application.host}:${application.port}`
  )
})
