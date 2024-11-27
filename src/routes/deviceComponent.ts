import express from "express"
import DeviceComponentRepository from "../cases/repositories/DeviceComponent"
import DeviceComponentService from "../cases/services/DeviceComponent"
import DeviceComponentController from "../cases/controllers/DeviceComponent"
import wrapper from "../lib/wrapper"
const deviceComponentRoute = express.Router()
const deviceComponentRepository = new DeviceComponentRepository()
const deviceComponentService = new DeviceComponentService(
  deviceComponentRepository
)
const deviceComponentController = new DeviceComponentController(
  deviceComponentService
)

deviceComponentRoute.post(
  "/new",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await deviceComponentController.create({
          name: req.body.name,
          deviceId: req.body.deviceId,
          createdBy: +req.user.id
        })
      )
    },
    settings: { level: "full" }
  })
)

deviceComponentRoute.post(
  "/",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await deviceComponentController.search({
          name: req.body.name,
          deviceId: req.body.deviceId,
          limit: req.body.limit,
          offset: req.body.offset
        })
      )
    },
    settings: {
      level: "full"
    }
  })
)

deviceComponentRoute.get(
  "/:id",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await deviceComponentController.getById({
          id: +req.params.id
        })
      )
    },
    settings: {
      level: "full"
    }
  })
)

deviceComponentRoute.put(
  "/:id/update",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await deviceComponentController.update({
          id: +req.params.id,
          name: req.body.name,
          deviceId: req.body.deviceId,
          updatedBy: +req.user.id
        })
      )
    },
    settings: { level: "full" }
  })
)

deviceComponentRoute.delete(
  "/:id/delete",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await deviceComponentController.delete({
          id: +req.params.id,
          deletedBy: +req.user.id
        })
      )
    },
    settings: {
      level: "full"
    }
  })
)

export default deviceComponentRoute
