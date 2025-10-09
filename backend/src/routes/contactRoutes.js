import { Router } from "express";
import { contactUs } from "../controllers/contactController.js";

const router = Router();

router.route("/contact").post(contactUs)

export default router