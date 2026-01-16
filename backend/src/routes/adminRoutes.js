import { Router } from "express";
import { adminLogin, deleteContact, deleteOrder, getAllContacts, getAllOrders, getAllServices } from "../controllers/adminController.js";

const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(getAllOrders)
router.route("/getAllContacts").get(getAllContacts)
router.route("/deleteOrder/:orderId").delete(deleteOrder)
router.route("/deleteContact/:contactId").delete(deleteContact)
router.route("/getAllServices").get(getAllServices)

export default router
