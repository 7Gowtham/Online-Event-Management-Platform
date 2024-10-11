import express from 'express'
import EventAnalyticsController from '../controllers/eventAnalytics.js'
import verify from '../middleware/verify.js'
import verifyAdmin from '../middleware/verifyAdmin.js'

const router = express.Router()

router.get('/getTotalTicketsSold/:eventId', verify, verifyAdmin, EventAnalyticsController.getTotalTicketsSold)
router.get('/getTotalRevenue/:eventId', verify, verifyAdmin, EventAnalyticsController.getTotalRevenue)
router.get('/getAttendanceRate/:eventId', verify, verifyAdmin, EventAnalyticsController.getAttendanceRate)
router.get('/getTicketSalesBreakdown/:eventId', verify, verifyAdmin, EventAnalyticsController.getTicketSalesBreakdown)

export default router