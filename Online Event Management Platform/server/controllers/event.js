import {randomString} from '../common/helper.js'
import eventModel from '../models/event.js'
import userModel from '../models/user.js'

const getAllEvents = async(req, res)=>{
    try {
        let events = await eventModel.find({},{_id:0, userId:0, createdAt:0})
        res.status(200).send({
            message: "Fetched all the events successfully",
            data: events
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const createEvent = async(req, res)=>{
    try {
        req.body.eventId = randomString(5)
        req.body.userId = req.headers.userId
        await eventModel.create(req.body)

        res.status(201).send({
            message:"Event created successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const changeStatus = async(req, res)=>{
    try {
        let {registrationId} = req.params
        console.log(registrationId)
        let user = await userModel.findOne({"registeredEvents.registrationId": registrationId})
        console.log(user)
        if(user){
            let event = user.registeredEvents.find(e => e.registrationId === registrationId);
            console.log(event, 'Event')

            if(event){
                event.status = req.body.status;
                await user.save()

                res.status(200).send({
                    message:"Event Updated Successfully"
                })
            }
            else {
                res.status(400).send({
                    message: "Event not found in eventDetails"
                });
            }
        }
        else{
            res.status(400).send({
                message:"Invalid Registered Id"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const editEvent = async(req, res)=>{
    try {
        let {eventId} = req.params
        const {title, description, location, date, time, category, vipPrice, generalPrice, totalTickets} = req.body

        const event = await eventModel.findOne({eventId})
        if(!event){
            res.status(400).send({
                message:'Event not found'
            })
        }
        if (title) event.title = title || event.title;
        if (description) event.description = description || event.description;
        if (location) event.location = location || event.location;
        if (date) event.date = date || event.date
        if (time) event.time = time || event.time
        if (category) event.category = category || event.category
        if (vipPrice) event.vipPrice = vipPrice || event/vipPrice
        if (generalPrice) event.generalPrice = generalPrice || event.generalPrice
        if (totalTickets) event.totalTickets = totalTickets || event.totalTickets
        await event.save()

        res.status(200).send({
            message:"Event Schedule updated Successfully",
            data: {
                title: event.title,
                description: event.description,
                location: event.location,
                date: event.date,
                time: event.time,
                category: event.category,
                vipPrice: event.vipPrice,
                generalPrice: event.generalPrice,
                totalTickets: event.totalTickets
            }
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const deleteEventById = async(req, res)=>{
    const {eventId} = req.params;
    try {
        let event = await eventModel.deleteOne({eventId: eventId})
        if(!event){
            return res.status(400).send({
                message:"Event not found"
            })
        }
        res.status(200).send({
            message: "Event Deleted Successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}



export default {
    getAllEvents,
    createEvent,
    changeStatus,
    editEvent,
    deleteEventById
}