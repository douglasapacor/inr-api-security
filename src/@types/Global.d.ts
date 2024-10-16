/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client"

declare global {
  var databaseClient: PrismaClient
  interface BigInt {
    toJSON(): Number
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this)
}
