import type { Request, Response } from "express"
import { verify } from "jsonwebtoken"
import application from "../../config/application"
import type { attributes } from "./types"

export default function wrapper(attr: attributes) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      if (attr.settings.level === "free") return await attr.handle(req, res)
      if (!req.headers["authorization"]) throw new Error("Não autorizado")

      const credential: any = verify(
        req.headers["authorization"],
        application.key
      )

      if (!credential) throw new Error("Não autorizado")

      if (credential.needChange) {
        res.status(200).json({
          success: false,
          data: {
            needChange: true,
            credential: req.headers["authorization"]
          },
          message: "Usuário precisa alterar a senha."
        })

        return
      }

      req.user = {
        id: credential.id
      }

      if (credential.groupSuper && credential.super)
        return await attr.handle(req, res)

      const allowedGroup = attr.settings.groupCode?.findIndex(
        item => item === credential.groupName
      )

      if (!allowedGroup || allowedGroup < 0)
        throw new Error("Ação não autorizada pelo grupo")

      if (attr.settings.level === "controlled")
        return await attr.handle(req, res)

      const selectedFeature: any =
        credential.credentials[`${attr.settings.featureCode}`]

      if (!selectedFeature || selectedFeature.length <= 0)
        throw new Error("Não autorizado")

      if (!attr.settings.action) throw new Error("Não autorizado")

      const hasAction = selectedFeature.findIndex(
        (i: any) => i === attr.settings.action
      )

      if (hasAction < 0) throw new Error("Não autorizado")

      return await attr.handle(req, res)
    } catch (error: any) {
      res.status(200).json({
        success: false,
        message: error.message
      })
    }
  }
}
