import type { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import type { attributes } from "./types"
import application from "../../config/application"
export default function wrapper(attr: attributes) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (attr.settings.level === "free") {
        return await attr.handle(req, res, next)
      }

      if (!req.headers["authorization"]) throw new Error("Não autorizado")

      const credential: {
        id: number
        super: boolean
        name: string
        groupId: number
        groupName: string
        groupSuper: boolean
        credentials: Record<string, string[]>
        needChange: boolean
      } = JSON.parse(
        verify(req.headers["authorization"], application.key).toString()
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
      }

      req.user.id = credential.id

      if (credential.groupSuper && credential.super)
        return await attr.handle(req, res, next)

      const allowedGroup = attr.settings.groupCode?.findIndex(
        item => item === credential.groupName
      )

      if (!allowedGroup || allowedGroup < 0) throw new Error("Não autorizado")

      if (attr.settings.level === "controlled")
        return await attr.handle(req, res, next)

      const selectedFeature =
        credential.credentials[`${attr.settings.featureCode}`]

      if (!selectedFeature || selectedFeature.length <= 0)
        throw new Error("Não autorizado")

      if (!attr.settings.action) throw new Error("Não autorizado")

      const hasAction = selectedFeature.findIndex(
        i => i === attr.settings.action
      )

      if (hasAction < 0) throw new Error("Não autorizado")

      return await attr.handle(req, res, next)
    } catch (error: any) {
      res.status(200).json({
        success: false,
        message: error.message
      })
    }
  }
}
