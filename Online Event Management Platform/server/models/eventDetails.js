import { mongoose } from "./index.js";

const eventDetailsSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: [true, "Event ID is requied"]
    },
    userId: {
        type: String,
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
    video: {
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
        required: true,
    },
    generalPrice: {
        type: Number,
        required: true,
    },
    vipTotalTickets: {
        type: Number,
        required: true,
    },
    generalTotalTickets: {
        type: Number,
        required: true,
    },
    vipTicketsSold: {
        type: Number,
        default: 0,
    },
    generalTicketsSold: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const eventDetailsModel = new mongoose.model('EventDetails', eventDetailsSchema)

export default eventDetailsModel