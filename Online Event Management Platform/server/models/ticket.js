import {mongoose} from "./index.js";

const ticketSchema = new mongoose.Schema({
    eventId:{
        type: String,
        required: [true, "Event ID is required"]
    },
    userId:{
        type: String
    },
    ticketId:{
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
    }
})

const ticketModel = new mongoose.model('tickets', ticketSchema)

export default ticketModel