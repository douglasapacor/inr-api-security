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
    handle: async (req, res, next) => {
      res.status(200).json(
        await actionController.create({
          name: req.body.name,
          canonical: req.body.canonical,
          createdBy: +req.user.id
        })
      )
      next()
    },
    settings: { level: "full" }
  })
)

actionRoute.post(
  "/",
  wrapper({
    handle: async (req, res, next) => {
      res.status(200).json(
        await actionController.search({
          name: req.body.name,
          canonical: req.body.canonical,
          limit: req.body.limit,
          offset: req.body.offset
        })
      )
      next()
    },
    settings: {
      level: "full"
    }
  })
)

actionRoute.get(
  "/:id",
  wrapper({
    handle: async (req, res, next) => {
      res.status(200).json(
        await actionController.getById({
          id: +req.params.id
        })
      )
      next()
    },
    settings: {
      level: "free"
    }
  })
)

actionRoute.put(
  "/:id/update",
  wrapper({
    handle: async (req, res, next) => {
      res.status(200).json(
        await actionController.update({
          id: +req.params.id,
          name: req.body.name,
          canonical: req.body.canonical,
          updatedBy: +req.user.id
        })
      )
      next()
    },
    settings: { level: "full" }
  })
)

actionRoute.delete(
  "/:id/delete",
  wrapper({
    handle: async (req, res, next) => {
      res.status(200).json(
        await actionController.delete({
          id: +req.params.id,
          deletedBy: +req.user.id
        })
      )
      next()
    },
    settings: {
      level: "full"
    }
  })
)

export default actionRoute
