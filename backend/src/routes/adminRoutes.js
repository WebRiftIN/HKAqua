import { Router } from "express";
import { adminLogin, deleteContact, deleteOrder, getAllContacts, getAllOrders, getAllServices, deleteService,updateService,adminLogout, adminDashboard } from "../controllers/adminController.js";

const router = Router()

router.route("/login").post(adminLogin)
router.route("/getAllOrders").get(getAllOrders)
router.route("/getAllContacts").get(getAllContacts)
router.route("/deleteOrder/:orderId").delete(deleteOrder)
router.route("/deleteContact/:contactId").delete(deleteContact)
router.route("/getAllServices").get(getAllServices)
router.route("/deleteService/:servicesId").delete(deleteService);
router.put('/updateService/:id', updateService);
router.post('/logout', adminLogout);
router.route("/getAdminDashboard").get(adminDashboard)

// Note: Ensure that deleteService is imported from the appropriate controller

export default router
