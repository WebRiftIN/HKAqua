import { Router } from "express";
import { loginUser, logout, registerUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/auth.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyToken,logout)

export default router;