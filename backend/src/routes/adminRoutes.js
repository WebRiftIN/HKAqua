import { Router } from "express";
import { adminLogin, getAllContacts, getAllOrders } from "../controllers/adminController.js";

const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(getAllOrders)
router.route("/getAllContacts").get(getAllContacts)

export default router