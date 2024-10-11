export default {
    LOGIN:{
        path:'/user/login',
        auth:false
    },
    SIGNUP:{
        path:'/user/signup',
        auth:false
    },
    GET_ALL_USERS:{
        path:'/user/getAllUsers',
        auth:true
    },
    REGISTER_EVENT:{
        path:'/user/registerEvent',
        auth:true
    },
    GET_ALL_REGISTERED_EVENTS:{
        path:'/user/getAllRegiteredEvents',
        auth:true
    },
    GET_ALL_REGISTERED_EVENTS_BY_USERID:{
        path:'/user/getAllRegisteredEventsByUserId',
        auth:true
    },
    CREATE_EVENT:{
        path:'/event/create',
        auth:true
    },
    GET_ALL_EVENTS:{
        path:'/event/getAllEvents',
        auth:true
    },
    CHANGE_STATUS:{
        path:'/event/changeStatus',
        auth:true
    },
    EDIT_EVENT:{
        path:'/event/editEvent',
        auth:true
    },
    DELETE_EVENT_BY_USERID:{
        path:'/event/deleteEventById',
        auth:true
    },
    CREATE_TICKET:{
        path:'/ticket/createTicket',
        auth:true
    },
    PURCHASE_TICKET:{
        path:'/ticket/purchaseTicket',
        auth:true
    },
    GET_USER_TICKET:{
        path:'/ticket/getUserTicket',
        auth:true
    },
    GET_ALL_USER_TICKET:{
        path:'/ticket/getAllUserTickets',
        auth:true
    },
    ADMIN_CREATED_TICKETS:{
        path:'/ticket/getAllAdminCreatedTickets',
        auth:true
    },
    CREATE_EVENT_DETAILS:{
        path:'/eventDetails/createEventDetails',
        auth:true
    },
    GET_EVENT_DETAILS:{
        path:'/eventDetails/getEventDetails',
        auth:true
    },
    EDIT_EVENT_DETAILS:{
        path:'/eventDetails/updateEventDetails',
        auth:true
    },
    CHECKOUT_SESSION:{
        path:'/ticket/createCheckoutSession',
        auth:true
    },
    GET_PROFILE:{
        path:'/user/getProfile',
        auth:true
    },
    UPDATE_PROFILE:{
        path:'/user/updateProfile',
        auth:true
    },
    GET_TOTAL_TICKETS_SOLD:{
        path:'/analytics/getTotalTicketsSold',
        auth:true
    },
    GET_TOTAL_REVENUE:{
        path:'/analytics/getTotalRevenue',
        auth:true
    },
    GET_ATTENDANCE_RATE:{
        path:'/analytics/getAttendanceRate',
        auth:true
    },
    GET_TICKET_SALES_BREAKDOWN:{
        path:'/analytics/getTicketSalesBreakdown',
        auth:true
    },
    GET_ALL_EVENTS_CALENDER_VIEW:{
        path:'/eventDetails/getAllEvents',
        auth:true
    }
    

}