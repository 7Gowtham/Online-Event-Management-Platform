import express from 'express'
import UserRoutes from './user.js'
import EventRoutes from './event.js'
import TicketRoutes from './ticket.js'
import EventDetailsRoutes from './eventDetails.js'
import EventAnalyticsRoutes from './eventAnalytics.js'

const router = express.Router()

router.use('/user', UserRoutes)
router.use('/event', EventRoutes)
router.use('/ticket', TicketRoutes)
router.use('/eventDetails', EventDetailsRoutes)
router.use('/analytics', EventAnalyticsRoutes)

export default router