import eventDetailsModel from "../models/eventDetails.js";
import purchasedTicketModel from "../models/purchasedTickets.js";

const getTotalTicketsSold = async(req, res)=>{
    const {eventId} = req.params;

    try {
        const ticketsSold = await purchasedTicketModel.aggregate([
            {$match: {eventId}},
            {$group: {
                _id:null,
                totalSold: {$sum: "$quantity"}
            }}
        ])

        res.status(200).send({
            message:`Fetched the total tickets sold for the eventID ${eventId}`,
            totalTicketsSold: ticketsSold.length ? ticketsSold[0].totalSold : 0,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getTotalRevenue = async(req, res)=>{
    const {eventId} = req.params
    try {
        const totalRevenue = await purchasedTicketModel.aggregate([
            { $match:  {eventId, paymentStatus: 'Paid'}},
            {$group: {
                _id: null,
                totalRevenue: {$sum: '$totalAmount'}
            }}
        ])

        res.status(200).send({
            message:`Fetched the total tickets revenue for the eventID ${eventId}`,
            totalRevenue: totalRevenue.length ? totalRevenue[0].totalRevenue : 0,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getAttendanceRate = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await eventDetailsModel.findOne({ eventId });
        if (!event) {
            return res.status(404).send({
                message: "Event not found"
            });
        }

        const ticketsSold = await purchasedTicketModel.aggregate([
            { $match: { eventId } },
            {
                $group: {
                    _id: "$ticket_type",
                    totalSold: { $sum: '$quantity' }
                }
            }
        ]);

        // Separate the tickets sold by type (VIP and General)
        let vipTicketsSold = 0;
        let generalTicketsSold = 0;

        ticketsSold.forEach(ticket => {
            if (ticket._id === 'VIP') {
                vipTicketsSold = ticket.totalSold;
            } else if (ticket._id === 'General') {
                generalTicketsSold = ticket.totalSold;
            }
        });

        // Total tickets available for each type
        const totalVipTickets = event.vipTotalTickets;
        const totalGeneralTickets = event.generalTotalTickets;

        // Calculate the attendance rate for VIP and General tickets
        const vipAttendanceRate = (vipTicketsSold / totalVipTickets) * 100;
        const generalAttendanceRate = (generalTicketsSold / totalGeneralTickets) * 100;

        res.status(200).send({
            message: "Fetched the percentage of tickets sold relative to the total number of tickets available for the event.",
            vipAttendanceRate: vipAttendanceRate.toFixed(2) + '%',
            generalAttendanceRate: generalAttendanceRate.toFixed(2) + '%'
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};


const getTicketSalesBreakdown = async(req, res)=>{
    const {eventId} = req.params;
    try {
        const ticketSalesBreakdown = await purchasedTicketModel.aggregate([
            {$match : {eventId}},
            {
                $group:{
                    _id:'$ticket_type',
                    totalSold: { $sum: '$quantity'},
                    totalRevenue: {$sum: '$totalAmount'} 
                }
            }
        ])

        res.status(200).send({
            message:`Fetched the Total Saled Breakdown for the event ${eventId}`,
            salesBreakdown: ticketSalesBreakdown
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

export default {
    getTotalTicketsSold,
    getTotalRevenue,
    getAttendanceRate,
    getTicketSalesBreakdown 
}