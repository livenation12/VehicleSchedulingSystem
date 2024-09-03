import express from "express"
import { createVehicle, getVehicles } from "../controllers/vehicleController.js"
import { adminAuth } from "../middlewares/authMiddleware.js"
import { fileUpload } from "../middlewares/fileUploadMiddleware.js"
const router = express.Router()

router.get('/', getVehicles)
router.post('/', adminAuth, fileUpload, createVehicle)

export default router