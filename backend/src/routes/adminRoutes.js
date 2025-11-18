import { Router } from "express";
import { adminLogin, getAllOrders } from "../controllers/adminController.js";

const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(getAllOrders)

export default router