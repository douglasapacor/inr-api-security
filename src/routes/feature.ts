import express from "express"
import FeatureController from "../cases/controllers/Feature"
import ActionRepository from "../cases/repositories/Action"
import { FeatureRepository } from "../cases/repositories/Feature"
import FeatureService from "../cases/services/Feature"
import wrapper from "../lib/wrapper"

const featureRoute = express.Router()

const featureRepository = new FeatureRepository()
const actionRepository = new ActionRepository()
const featureService = new FeatureService(featureRepository, actionRepository)
const featureController = new FeatureController(featureService)

featureRoute.post(
  "/new",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await featureController.create({
          name: req.body.name,
          canonical: req.body.canonical,
          createdBy: +req.user.id,
          actions: req.body.actions,
          active: req.body.active,
          visible: req.body.visible,
          deviceComponentsId: req.body.deviceComponentsId,
          icon: req.body.icon,
          path: req.body.path
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "feature",
      action: "write",
      groupCode: ["admin"]
    }
  })
)

featureRoute.post(
  "/",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await featureController.search({
          name: req.body.name,
          canonical: req.body.canonical,
          active: req.body.active,
          visible: req.body.visible,
          deviceComponentsId: req.body.deviceComponentsId,
          icon: req.body.icon,
          path: req.body.path,
          limit: req.body.limit,
          offset: req.body.offset
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "feature",
      action: "read",
      groupCode: ["admin"]
    }
  })
)

featureRoute.get(
  "/get-all",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(await featureController.getAllFeatures())
    },
    settings: {
      level: "free",
      featureCode: "feature",
      action: "read",
      groupCode: ["admin"]
    }
  })
)

featureRoute.get(
  "/actions/:id",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await featureController.getFeaturesActions({
          id: +req.params.id
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "feature",
      action: "read",
      groupCode: ["admin"]
    }
  })
)

featureRoute.get(
  "/:id",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await featureController.getById({
          id: +req.params.id
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "feature",
      action: "read",
      groupCode: ["admin"]
    }
  })
)

featureRoute.put(
  "/:id/update",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await featureController.update({
          id: +req.params.id,
          name: req.body.name,
          canonical: req.body.canonical,
          updatedBy: +req.user.id,
          actions: req.body.actions,
          active: req.body.active,
          visible: req.body.visible,
          deviceComponentsId: req.body.deviceComponentsId,
          icon: req.body.icon,
          path: req.body.path
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "feature",
      action: "write",
      groupCode: ["admin"]
    }
  })
)

featureRoute.delete(
  "/:id/delete",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await featureController.delete({
          id: +req.params.id,
          deletedBy: +req.user.id
        })
      )
    },
    settings: {
      level: "full",
      featureCode: "feature",
      action: "write",
      groupCode: ["admin"]
    }
  })
)

export default featureRoute
