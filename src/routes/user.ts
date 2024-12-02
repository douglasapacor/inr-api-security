import express from "express"
import wrapper from "../lib/wrapper"
import UserController from "../cases/controllers/User"
import UserService from "../cases/services/User"
import UserRepository from "../cases/repositories/User"
import EmailProvider from "../cases/providers/Email"
import PermissionRepository from "../cases/repositories/Permissions"

const userRoute = express.Router()

const userRepository = new UserRepository()
const emailProvider = new EmailProvider()
const permissionRepository = new PermissionRepository()
const userService = new UserService(
  userRepository,
  emailProvider,
  permissionRepository
)
const userController = new UserController(userService)

userRoute.post(
  "/new",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.create({
          name: req.body.name,
          email: req.body.email,
          active: req.body.active,
          super: req.body.super,
          cpf: req.body.cpf,
          rg: req.body.rg,
          cellphone: req.body.cellphone,
          groupId: req.body.groupId,
          address: req.body.address,
          permissions: req.body.permissions,
          createdById: +req.user.id
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "user",
      groupCode: ["admin"]
    }
  })
)

userRoute.get(
  "/:id",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.getById({
          id: +req.params.id
        })
      )
    },
    settings: {
      level: "full",
      action: "read",
      featureCode: "user",
      groupCode: ["admin"]
    }
  })
)

userRoute.put(
  "/:id/update",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.update({
          id: +req.params.id,
          name: req.body.name,
          email: req.body.email,
          active: req.body.active,
          super: req.body.super,
          cellphone: req.body.cellphone,
          groupId: +req.body.groupId,
          updatedById: +req.user.id,
          address: req.body.address,
          cpf: req.body.cpf,
          rg: req.body.rg,
          permissions: req.body.permissions
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "user",
      groupCode: ["admin"]
    }
  })
)

userRoute.delete(
  "/:id/delete",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.delete({
          id: +req.params.id,
          deletedBy: +req.user.id
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "user",
      groupCode: ["admin"]
    }
  })
)

userRoute.post(
  "/",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.search({
          name: req.body.name,
          email: req.body.email,
          cpf: req.body.cpf,
          rg: req.body.rg,
          cellphone: req.body.cellphone,
          groupId: req.body.groupId,
          active: req.body.active,
          super: req.body.super,
          limit: req.body.limit,
          offset: req.body.offset
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "user",
      groupCode: ["admin"]
    }
  })
)

userRoute.post(
  "/authentication",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.authentication({
          login: req.body.login,
          password: req.body.password
        })
      )
    },
    settings: {
      level: "free"
    }
  })
)

userRoute.post(
  "/recovery_password",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recoveryPassword({
          login: req.params.login
        })
      )
    },
    settings: {
      level: "free"
    }
  })
)

userRoute.post(
  "/confirm_recovery",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.confirmRecovery({
          user: req.body.user,
          oldPassword: req.body.oldPassword,
          newPassword: req.body.newPassword
        })
      )
    },
    settings: {
      level: "free"
    }
  })
)

export default userRoute
