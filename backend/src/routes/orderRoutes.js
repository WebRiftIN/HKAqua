import { Router } from "express";
import { placeOrder } from "../controllers/orderController.js";

const router = Router()

router.route("/placeOrder").post(placeOrder)

export default router