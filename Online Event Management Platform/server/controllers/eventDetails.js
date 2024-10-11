import eventModel from "../models/event.js"
import eventDetailsModel from "../models/eventDetails.js"
import ticketModel from "../models/ticket.js"

const createEventDetails = async(req, res)=>{
    try {
        const eventDetails = await eventDetailsModel.create(req.body)
        res.status(201).send({
            message:"Event Details created successfully",
            data: eventDetails
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getEventDetails = async(req, res)=>{
    try {
        const {eventId} = req.params
        const eventExists = await eventModel.findOne({eventId})
        if(!eventExists){
            return res.status(400).send({
                message:"Event not found"
            })
        }

        const eventDetails = await eventDetailsModel.findOne({eventId: eventId})
        console.log('EventDetails', eventDetails)
        if(!eventDetails){
            return res.status(400).send({
                message:"Event Details not found"
            })
        }

        const ticket = await ticketModel.findOne({ eventId });
        if (!ticket) {
            return res.status(400).send({
                message: "Ticket not found",
            });
        }

        res.status(200).send({
            message:"Fetched Event Details successfully",
            data: eventDetails,
            ticketId: ticket.ticketId,
            vipAvailableTickets: eventDetails.vipTotalTickets - eventDetails.vipTicketsSold,
            generalAvailableTickets: eventDetails.generalTotalTickets - eventDetails.generalTicketsSold
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const updateEventDetails = async(req, res)=>{
    try {
        const {eventId} = req.params
        const eventExists = await eventModel.findOne({eventId})
        if(!eventExists){
            return res.status(400).send({
                message:"Event not found"
            })
        }

        const updatedDetails = await eventDetailsModel.findOneAndUpdate({eventId}, req.body, {new: true})
        if(!updatedDetails){
            return res.status(400).send({
                message:"Event Details not found"
            })
        }
        res.status(200).send({
            message:"Updated Event Details successfully",
            data: updatedDetails
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await eventDetailsModel.find();
        res.status(200).send({
            message: "Fetched all events successfully",
            data: events,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
}

export default {
    createEventDetails,
    getEventDetails,
    updateEventDetails,
    getAllEvents
}