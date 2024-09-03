import express from "express"
import authRoutes from "./authRoutes.js"
import vehicleRoutes from "./vehicleRoutes.js"
import adminRoutes from "./adminRoutes.js"
import { requireAuth } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/admin", adminRoutes)
router.use("/vehicles", requireAuth, vehicleRoutes)
export default router