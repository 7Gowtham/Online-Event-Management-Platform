import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'

function AllUserTickets() {
    let [tickets, setTickets] = useState([])
    let color = { Paid: 'green', Pending: '#ffc107', Failed: 'red' }

    const getData = async () => {
        try {
            let { message, tickets } = await AxiosService.get(ApiRoutes.GET_ALL_USER_TICKET.path, { authenticate: ApiRoutes.GET_ALL_USER_TICKET.auth })
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(tickets) && tickets.map((ticket, i) => (
                <div key={ticket._id} className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Ticket #{i + 1}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${color[ticket.paymentStatus] || 'text-black'}`}>
                            {ticket.paymentStatus}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${color[ticket.status] || 'text-black'}`}>
                            {ticket.status}
                        </span>
                    </div>

                    <div className="text-sm text-gray-500">
                        <p className="mb-2"><strong>Ticket ID:</strong> {ticket.ticketId}</p>
                        <p className="mb-2"><strong>Booking ID:</strong> {ticket.bookingId}</p>
                        <p className="mb-2"><strong>Event ID:</strong> {ticket.eventId}</p>
                        <p className="mb-2"><strong>Ticket Type:</strong> {ticket.ticket_type}</p>
                        <p className="mb-2"><strong>Quantity:</strong> {ticket.quantity}</p>
                        <p className="mb-2"><strong>Total Amount:</strong> ₹{ticket.totalAmount}</p>
                        <p className="mb-2"><strong>Payment Gateway:</strong> {ticket.paymentGateway}</p>
                        <p className="mb-2"><strong>Purchase Date:</strong> {new Date(ticket.purchaseDate).toLocaleString()}</p>
                        <p><strong>Transaction ID:</strong> {ticket.transactionId}</p>
                    </div>
                </div>
            ))}
        </div>

    </>
}

export default AllUserTickets