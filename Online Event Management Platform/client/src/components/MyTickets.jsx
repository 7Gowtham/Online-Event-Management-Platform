import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'

function MyTickets() {
    let [tickets, setTickets] = useState([])
    const [expandedTicket, setExpandedTicket] = useState(null);
    let color = { Paid: 'green', Pending: '#ffc107', Failed: 'red' }

    const getData = async () => {
        try {
            let { message, tickets } = await AxiosService.get(ApiRoutes.GET_USER_TICKET.path, { authenticate: ApiRoutes.GET_USER_TICKET.auth })
            console.log(tickets)
            if (Array.isArray(tickets)) {
                setTickets(tickets)
                toast.success(message)
            }
            else {
                toast.error("Unexpected data format");
            }
        } catch (error) {
            toast.error(error.message || "Internal Server Error")
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return <>
        <div className="space-y-4">
            {Array.isArray(tickets) && tickets.map((ticket, i) => (
                <div key={ticket._id} className="bg-white shadow-md rounded-lg">
                    <div className="flex justify-between items-center px-6 py-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {i + 1}. Ticket ID: {ticket.ticketId}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Event ID: {ticket.eventId}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="text-blue-500 focus:outline-none"
                            onClick={() => setExpandedTicket(expandedTicket === i ? null : i)}
                        >
                            {expandedTicket === i ? 'Hide Details' : 'Show Details'}
                        </button>
                    </div>

                    {expandedTicket === i && (
                        <div className="px-6 pb-4">
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Ticket Type:</strong> {ticket.ticket_type}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Quantity:</strong> {ticket.quantity}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Total Amount:</strong> ₹{ticket.totalAmount}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Payment Status:</strong>
                                <span className="font-medium" style={{ color: `${color[ticket.paymentStatus] || 'black'}` }}>
                                    {ticket.paymentStatus}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Payment Gateway:</strong> {ticket.paymentGateway}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Purchase Date:</strong> {new Date(ticket.purchaseDate).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Transaction ID:</strong> {ticket.transactionId}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </>
}

export default MyTickets