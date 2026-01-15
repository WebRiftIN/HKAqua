import { Router } from "express";
import { adminLogin, deleteOrder, getAllContacts, getAllOrders } from "../controllers/adminController.js";

const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(getAllOrders)
router.route("/getAllContacts").get(getAllContacts)
router.route("/deleteOrder/:orderId").post(deleteOrder)

export default router