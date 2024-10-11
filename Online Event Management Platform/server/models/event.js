import { mongoose } from "./index.js";

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: [true, "Event ID is requied"]
    },
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    time: {
        type: String,
        required: [true, "Session time is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    vipPrice: {
        type: Number,
    },
    generalPrice: {
        type: Number,
    },
    totalTickets: {
        type: Number,
    },
    ticketsSold: {
        type: Number,
        default: 0,
    },
    status:{
        type: String,
        enum:{
            values:["Pending", "Approved", "Rejected"],
            message:`{VALUE} is not supported`
        },
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const eventModel = new mongoose.model('events', eventSchema)

export default eventModel