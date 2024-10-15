import {mongoose} from "./index.js";

const purchasedTicketSchema = new mongoose.Schema({
    eventId:{
        type: String,
        required: [true, "Event ID is required"]
    },
    userId:{
        type: String
    },
    ticketId:{
        type: String,
        required:[true, "Ticket ID is required"]
    },
    bookingId:{
        type: String,
    },
    ticket_type:{
        type: String,
        enum:{
            values: ['VIP', 'General'],
            message: `{VALUE} is not supported`
        }
    },
    price:{
        type: Number,
        required:[true, "Price is required"]
    },
    quantity:{
        type:Number,
        required:[true, "Quantity is required"]
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    paymentGateway: {
        type: String,
        enum: ['Stripe'],
        required: false,
    },
    status:{ 
        type: String, 
        default: 'Active' 
    },
    transactionId: {
        type: String,
        required: false,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    confirmationSent: {
        type: Boolean,
        default: false,
    },
})

const purchasedTicketModel = new mongoose.model('purchasedTickets', purchasedTicketSchema)

export default purchasedTicketModel