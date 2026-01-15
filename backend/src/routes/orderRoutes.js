import { Router } from "express";
import { getOrder, placeOrder, cancelOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = Router()

router.route("/placeOrder").post(placeOrder)
router.route("/:userId").get(getOrder)
router.route("/:orderId/cancel").patch(cancelOrder)

// Admin: update order status
router.route("/:orderId/status").patch(updateOrderStatus)

export default router
