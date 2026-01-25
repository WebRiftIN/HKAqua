import { Router } from "express";
import { getOrder, placeOrder, cancelOrder, updateOrderStatus } from "../controllers/orderController.js";
import verifyToken from "../middlewares/auth.js";
import verifyJWT from "../middlewares/adminAuth.js";

const router = Router()

router.route("/placeOrder").post(verifyToken,placeOrder)
router.route("/:userId").get(verifyToken,getOrder)
router.route("/:orderId/cancel").patch(verifyToken,cancelOrder)

// Admin: update order status
router.route("/:orderId/status").patch(verifyJWT,updateOrderStatus)

export default router
