import express from "express";
import EventDetailsController from '../controllers/eventDetails.js'
import verify from "../middleware/verify.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router()

router.post('/createEventDetails', verify, verifyAdmin, EventDetailsController.createEventDetails)
router.get('/getEventDetails/:eventId', verify, EventDetailsController.getEventDetails)
router.put('/updateEventDetails/:eventId', verify, verifyAdmin, EventDetailsController.updateEventDetails)
router.get('/getAllEvents', verify, EventDetailsController.getAllEvents)

export default router