import Login from "../components/Login"
import Signup from "../components/Signup"
import RegisterEvent from "../components/RegisterEvent"
import CreateEvent from "../components/CreateEvent"
import Home from "../components/Home"
import Dashboard from "../components/Dashboard"
import Events from "../components/Events"
import LandingPage from "../components/LandingPage"
import { Navigate } from "react-router-dom"
import AdminGaurd from './AdminGaurd'
import ProtectedRoute from './ProtectedRoute'
import EditEvent from "../components/EditEvent"
import CreateTicket from "../components/CreateTicket"
import ViewEventDetails from "../components/ViewEventDetails"
import CreateEventDetails from "../components/CreateEventDetails"
import EditEventDetails from "../components/EditEventDetails"
import PurchaseTicket from "../components/PurchaseTicket"
import TopBar from "../components/common/TopBar"
import CheckOut from "../components/CheckOut"
import MyTickets from "../components/MyTickets"
import AllUserTickets from "../components/AllUserTickets"
import UserProfile from "../components/UserProfile"
import EventAnalytics from "../components/EventAnalytics"
import EventCalender from "../components/EventCalender"
import Layout from "../components/Layout"
import ForgotPassword from "../components/ForgotPassword"
import ResetPassword from "../components/ResetPassword"
import CheckOutSuccess from "../components/CheckOutSuccess"
import ContactPage from "../components/ContactPage"

export default [
    {
        path:'/oemp',
        element:<Layout><LandingPage/></Layout>
    },
    {
        path:'/login',
        element:<Layout><Login/></Layout>
    },
    {
        path:'/signup',
        element:<Layout><Signup/></Layout>
    },
    {
        path:'/forgot-password',
        element:<Layout><ForgotPassword/></Layout>
    },
    {
        path:'/reset-password/:token',
        element:<Layout><ResetPassword/></Layout>
    },
    {
        path:'/dashboard',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><Dashboard/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/home',
        element:<ProtectedRoute><Layout><TopBar/><Home/></Layout></ProtectedRoute>
    },
    {
        path:'/register-event',
        element:<ProtectedRoute><Layout><TopBar/><RegisterEvent/></Layout></ProtectedRoute>
    },
    {
        path:'/create-event',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><CreateEvent/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/events',
        element:<ProtectedRoute><Layout><TopBar/><Events/></Layout></ProtectedRoute>
    },
    {
        path:'/edit-event/:eventId',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><EditEvent/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/create-event-details',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><CreateEventDetails/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/view-details/:eventId',
        element:<ProtectedRoute><Layout><TopBar/><ViewEventDetails/></Layout></ProtectedRoute>
    },
    {
        path:'/edit-event-details/:eventId',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><EditEventDetails/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/create-ticket',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><CreateTicket/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/purchase-ticket/:eventId/:ticketId',
        element:<ProtectedRoute><Layout><TopBar/><PurchaseTicket/></Layout></ProtectedRoute>
    },
    {
        path:'/mytickets',
        element:<ProtectedRoute><Layout><TopBar/><MyTickets/></Layout></ProtectedRoute>
    },
    {
        path:'/alltickets',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><AllUserTickets/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/create-checkout-session',
        element:<ProtectedRoute><Layout><TopBar/><CheckOut/></Layout></ProtectedRoute>
    },
    {
        path:'/analytics/:eventId',
        element:<AdminGaurd><ProtectedRoute><Layout><TopBar/><EventAnalytics/></Layout></ProtectedRoute></AdminGaurd>
    },
    {
        path:'/calender-view',
        element:<ProtectedRoute><Layout><TopBar/><EventCalender/></Layout></ProtectedRoute>
    },
    {
        path:'/profile',
        element:<ProtectedRoute><Layout><TopBar/><UserProfile/></Layout></ProtectedRoute>
    },
    {
        path:'/success',
        element:<ProtectedRoute><Layout><TopBar/><CheckOutSuccess/></Layout></ProtectedRoute>
    },
    {
        path:'/contact',
        element:<ProtectedRoute><Layout><TopBar/><ContactPage/></Layout></ProtectedRoute>
    },
    {
        path:'/*',
        element:<Navigate to = '/oemp'/>
    },

]