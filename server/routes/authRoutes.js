import express from "express"
import { create, login, logout, verifyUserToken } from "../controllers/authController.js"
const router = express.Router();

router.get('/verify', verifyUserToken)

router.post('/login', login)

router.post('/', create)

router.get('/logout', logout)

export default router