import express from "express"
import deviceComponentRoute from "./routes/deviceComponent"
import actionRoute from "./routes/action"
import featureRoute from "./routes/feature"
import groupRoute from "./routes/group"
import userRoute from "./routes/user"

const router = express.Router()

router.use("/action", actionRoute)
router.use("/device_component", deviceComponentRoute)
router.use("/feature", featureRoute)
router.use("/group", groupRoute)
router.use("/user", userRoute)

export default router
