import eventModel from "../models/event.js"
import {randomString} from "../common/helper.js"
import ticketModel from "../models/ticket.js"
import {paymentService} from '../common/paymentService.js'
import {sendConfirmation} from "../common/mailService.js"
import purchasedTicketModel from "../models/purchasedTickets.js"
import 'dotenv/config.js'
import Stripe from 'stripe';
import eventDetailsModel from "../models/eventDetails.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createTicket = async(req, res)=>{
    const {eventId, ticket_type, price, quantity} = req.body
    try {
        const event = await eventModel.findOne({eventId})
        if(!event){
            res.status(400).send({
                message:"Event not found"
            })
        }
        const ticketId = randomString(5)
        
        const ticket = await ticketModel.create({
            eventId,
            ticketId,
            ticket_type,
            price,
            quantity,
            totalAmount: price * quantity,
            paymentStatus: "Pending",
            paymentGateway: null
        })

        await ticket.save()
        res.status(201).send({
            message: "Ticket Created Successfully",
            ticket
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getAllAdminCreatedTickets = async(req, res)=>{
    try {
        let tickets = await ticketModel.find()
        if(!tickets.length){
            return res.status(404).send({
                message:'No tickets found'
            })
        }
        res.status(200).send({
            message:"Fetched all the tickets which are created",
            tickets
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const purchaseTicket = async (req, res) => {
    const { ticket_type, quantity, paymentGateway, email } = req.body;
    const userId = req.headers.userId;
    const { eventId, ticketId } = req.params;

    try {
        const event = await eventDetailsModel.findOne({ eventId: eventId });
        console.log(event);
        if (!event) {
            return res.status(404).send({
                message: "Event not found",
            });
        }

        const price = ticket_type === "VIP" ? event.vipPrice : event.generalPrice;

        if (typeof price !== 'number' || isNaN(price)) {
            return res.status(400).send({
                message: "Invalid price for the selected ticket type.",
            });
        }

        if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            return res.status(400).send({
                message: "Quantity must be a positive number.",
            });
        }

        if (ticket_type === "VIP" && event.vipTicketsSold + quantity > event.vipTotalTickets) {
            return res.status(400).send({
                message: "Not enough VIP tickets available for this event.",
            });
        }

        if (ticket_type === "General" && event.generalTicketsSold + quantity > event.generalTotalTickets) {
            return res.status(400).send({
                message: "Not enough General tickets available for this event.",
            });
        }

        const totalAmount = price * quantity;

        const ticket = await purchasedTicketModel.create({
            eventId,
            ticketId,
            userId,
            ticket_type,
            price,
            quantity,
            totalAmount,
            paymentGateway: paymentGateway.charAt(0).toUpperCase() + paymentGateway.slice(1),
        });

        const paymentResult = await paymentService({
            amount: totalAmount,
            paymentGateway,
            userId,
            ticketId: ticket.ticketId,
        });

        console.log(paymentResult);
        if (paymentResult.status === "success") {
            ticket.paymentStatus = "Paid";
            ticket.transactionId = paymentResult.transactionId;
            ticket.confirmationSent = true;

            await ticket.save();

            if (ticket_type === "VIP") {
                event.vipTicketsSold += quantity;
            } else if (ticket_type === "General") {
                event.generalTicketsSold += quantity;
            }

            await event.save();

            await sendConfirmation({
                userId,
                ticketId: ticket.ticketId,
                email,
            });

            res.status(200).send({
                message: "Ticket Purchased Successfully",
                ticket,
                vipAvailableTickets: event.vipTotalTickets - event.vipTicketsSold,
                generalAvailableTickets: event.generalTotalTickets - event.generalTicketsSold,
            });
        } else {
            res.status(400).send({
                message: "Payment Failed",
                paymentResult,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
};


const getUserTicket = async(req, res)=>{
    const userId = req.headers.userId
    try {
        const tickets = await purchasedTicketModel.find({userId}).populate('eventId')
        if(!tickets.length){
            return res.status(404).send({
                message:'No tickets found'
            })
        }
        res.status(200).send({
            message:"Fetched the tickets by userId",
            tickets
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getAllUserTickets = async(req, res)=>{
    try {
        let tickets = await purchasedTicketModel.find({})

        if(!tickets.length){
            return res.status(404).send({
                message:"No Tickets found"
            })
        }

        res.status(200).send({
            message:"Fetched all the tickets",
            tickets
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const createCheckoutSession = async(req, res)=>{
    const {quantity, ticketId, ticketPrice} = req.body
    const userId = req.headers.userId
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Types of payment methods
            line_items: [
                {
                    price_data: {
                      currency: 'usd', // Or any currency you're working with
                      product_data: {
                        name: `Ticket for event: ${ticketId}`, // Ticket description
                      },
                      unit_amount: ticketPrice * 100, // Stripe expects price in cents
                    },
                    quantity: quantity,
                  },
            ],
            mode: 'payment', // Mode is set to 'payment' for one-time purchases
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
              userId, // Additional metadata to be sent with the payment
              ticketId,
            },
          });
      
          // Send session ID to the frontend
          res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'Failed to create Stripe checkout session' });
    }
}

const deleteTicket = async (req, res) => {
    try {
        const { eventId, ticketId } = req.params;
        
        const ticket = await purchasedTicketModel.findOne({ ticketId, eventId });

        if (!ticket) {
            return res.status(404).send({ message: "Ticket not found" });
        }

        // Find the event associated with the ticket
        const event = await eventDetailsModel.findOne({ eventId });

        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }

        // Update the event's tickets sold count based on the ticket type
        if (ticket.ticket_type === "VIP") {
            event.vipTicketsSold -= ticket.quantity;
        } else if (ticket.ticket_type === "General") {
            event.generalTicketsSold -= ticket.quantity;
        }

        await event.save();

        await purchasedTicketModel.deleteOne({ ticketId });

        res.status(200).send({ message: "Ticket deleted and event updated successfully" });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
};


export default {
    createTicket,
    getAllAdminCreatedTickets,
    purchaseTicket,
    getUserTicket,
    getAllUserTickets,
    createCheckoutSession,
    deleteTicket
}