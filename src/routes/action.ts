import express from "express"
import wrapper from "../lib/wrapper"
import ActionRepository from "../cases/repositories/Action"
import ActionService from "../cases/services/Action"
import ActionController from "../cases/controllers/Action"
const actionRoute = express.Router()
const actionRepository = new ActionRepository()
const actionService = new ActionService(actionRepository)
const actionController = new ActionController(actionService)

actionRoute.post(
  "/new",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await actionController.create({
          name: req.body.name,
          canonical: req.body.canonical,
          createdBy: +req.user.id
        })
      )
    },
    settings: { level: "full", featureCode: "action", action: "write" }
  })
)

actionRoute.post(
  "/",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await actionController.search({
          name: req.body.name,
          canonical: req.body.canonical,
          limit: req.body.limit,
          offset: req.body.offset
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "action",
      action: "read"
    }
  })
)

actionRoute.get(
  "/get-all",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(await actionController.getAll())
    },
    settings: {
      level: "full",
      featureCode: "action",
      action: "read"
    }
  })
)

actionRoute.get(
  "/:id",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await actionController.getById({
          id: +req.params.id
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "action",
      action: "read"
    }
  })
)

actionRoute.put(
  "/:id/update",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await actionController.update({
          id: +req.params.id,
          name: req.body.name,
          canonical: req.body.canonical,
          updatedBy: +req.user.id
        })
      )
    },
    settings: { level: "full", featureCode: "action", action: "write" }
  })
)

actionRoute.delete(
  "/:id/delete",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await actionController.delete({
          id: +req.params.id,
          deletedBy: +req.user.id
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "action",
      action: "write"
    }
  })
)

export default actionRoute
