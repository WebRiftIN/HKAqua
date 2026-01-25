import { Router } from "express";
import { adminLogin, deleteContact, deleteOrder, getAllContacts, getAllOrders, getAllServices, deleteService,updateService,adminLogout, adminDashboard } from "../controllers/adminController.js";
import verifyJWT from '../middlewares/adminAuth.js'
const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(verifyJWT,getAllOrders)
router.route("/getAllContacts").get(verifyJWT,getAllContacts)
router.route("/deleteOrder/:orderId").delete(verifyJWT,deleteOrder)
router.route("/deleteContact/:contactId").delete(verifyJWT,deleteContact)
router.route("/getAllServices").get(verifyJWT,getAllServices)
router.route("/deleteService/:servicesId").delete(verifyJWT,deleteService)
router.route("/updateService/:id").put(verifyJWT,updateService)
router.route("/logout").post(verifyJWT,adminLogout)
router.route("/getAdminDashboard").get(verifyJWT,adminDashboard)

// Note: Ensure that deleteService is imported from the appropriate controller

export default router
