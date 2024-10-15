import express from 'express'
import UserController from '../controllers/user.js'
import verify from '../middleware/verify.js'
import verifyAdmin from '../middleware/verifyAdmin.js'

const router = express.Router()

router.get('/getAllUsers', verify, verifyAdmin, UserController.getAllUsers)
router.get('/getAllRegiteredEvents', verify, verifyAdmin, UserController.getAllRegiteredEvents)
router.get('/getAllRegisteredEventsByUserId', verify, UserController.getAllRegisteredEventsByUserId)
router.get('/getProfile', verify, UserController.getProfile)
router.put('/updateProfile', verify, UserController.updateProfile)
router.post('/registerEvent', verify, UserController.registerEvent)
router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.get('/getUserRegistrationStatus/:eventId', verify, UserController.getUserRegistrationStatus)
router.get('/getAllApprovedRegisteredEventsByUserId', verify, UserController.getAllApprovedRegisteredEventsByUserId)
router.post('/forgotPassword', UserController.forgotPassword)
router.post('/resetPassword/:token', UserController.resetPassword)

export default router