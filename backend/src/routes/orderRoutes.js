import { Router } from "express";
import { getOrder, placeOrder } from "../controllers/orderController.js";

const router = Router()

router.route("/placeOrder").post(placeOrder)
router.route("/:userId").get(getOrder)

export default router