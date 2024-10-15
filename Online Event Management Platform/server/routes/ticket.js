import express from 'express'
import TicketController from '../controllers/ticket.js'
import verify from '../middleware/verify.js'
import verifyAdmin from '../middleware/verifyAdmin.js'

const router = express.Router()

router.post('/createTicket', verify, verifyAdmin, TicketController.createTicket)
router.get('/getAllAdminCreatedTickets', verify, verifyAdmin, TicketController.getAllAdminCreatedTickets)
router.post('/purchaseTicket/:eventId/:ticketId', verify, TicketController.purchaseTicket)
router.get('/getUserTicket', verify, TicketController.getUserTicket)
router.get('/getAllUserTickets', verify, verifyAdmin, TicketController.getAllUserTickets)
router.post('/createCheckoutSession', verify, TicketController.createCheckoutSession)
router.get('/confirmPayment', verify, TicketController.confirmPayment)
router.post('/cancelTicket/:bookingId', verify, TicketController.cancelTicket)

export default router