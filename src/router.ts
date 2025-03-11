import express from "express"
import featureRoute from "./routes/feature"
import groupRoute from "./routes/group"
import userRoute from "./routes/user"

const router = express.Router()

router.use("/feature", featureRoute)
router.use("/group", groupRoute)
router.use("/user", userRoute)

export default router
