import Router from 'express'
import { bookService } from '../controllers/serviceController.js'

const router = Router()

router.route("/book-service").post(bookService)

export default router