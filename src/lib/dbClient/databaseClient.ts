import { PrismaClient } from "@prisma/client"

let databaseClient: PrismaClient

if (process.env.NODE_ENV === "production") {
  databaseClient = new PrismaClient({
    log: ["info", "warn", "error"]
  })
} else {
  if (!global.databaseClient) {
    global.databaseClient = new PrismaClient({
      log: ["info", "warn", "error"]
    })
  }

  databaseClient = global.databaseClient
}

export default databaseClient
