import { Router } from "express";
import { adminLogin, getAllContacts, getAllOrders, updateOrderStatus, updateDeliveryInfo, deleteOrder } from "../controllers/adminController.js";

const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(getAllOrders)
router.route("/getAllContacts").get(getAllContacts)
router.route("/updateOrderStatus").put(updateOrderStatus)
router.route("/updateDeliveryInfo").put(updateDeliveryInfo)
router.route("/deleteOrder").delete(deleteOrder)

export default router
