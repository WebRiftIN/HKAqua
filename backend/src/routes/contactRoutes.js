import { Router } from "express";
import { contactUs } from "../controllers/contactController.js";
import verifyToken from "../middlewares/auth.js";

const router = Router();

router.route("/contact").post(verifyToken,contactUs)

export default router