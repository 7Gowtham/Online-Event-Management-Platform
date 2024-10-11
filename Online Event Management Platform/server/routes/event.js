import express from 'express'
import EventController from '../controllers/event.js'
import verify from '../middleware/verify.js'
import verifyAdmin from '../middleware/verifyAdmin.js'

const router = express.Router()

router.get('/getAllEvents', verify, EventController.getAllEvents)
router.get('/getAllEvents', verifyAdmin, EventController.getAllEvents)
router.post('/create', verify, verifyAdmin, EventController.createEvent)
router.put('/changeStatus/:registrationId', verify, verifyAdmin, EventController.changeStatus)
router.put('/editEvent/:eventId', verify, verifyAdmin, EventController.editEvent)
router.delete('/deleteEventById/:eventId', verify, verifyAdmin, EventController.deleteEventById)

export default router