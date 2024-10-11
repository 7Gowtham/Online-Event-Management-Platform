import React, { useState } from 'react';
import AxiosService from '../utils/AxiosService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import CheckOut from './CheckOut';

function PurchaseTicket() {
    let { eventId, ticketId } = useParams();
    const { state } = useLocation();
    const [ticketType, setTicketType] = useState('General');
    const [quantity, setQuantity] = useState(1);
    const [paymentGateway, setPaymentGateway] = useState('Stripe');
    const [email, setEmail] = useState('');
    const [ticketPrice, setTicketPrice] = useState(state?.generalPrice || 0);
    const [checkoutData, setCheckoutData] = useState(null); 
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!paymentGateway) {
            alert("Please select a valid payment gateway");
            return;
        }

        try {
            let availableTickets = 0;
            let { message, availableTickets: updatedTickets  } = await AxiosService.post(`${ApiRoutes.PURCHASE_TICKET.path}/${eventId}/${ticketId}`, {
                ticketId,
                eventId,
                ticket_type: ticketType,
                quantity: parseInt(quantity),
                paymentGateway,
                email,
                ticketPrice,
                availableTickets 
            }, { authenticate: ApiRoutes.PURCHASE_TICKET.auth });
            availableTickets = updatedTickets;
            console.log(message);
            toast.success(message);

            const token = sessionStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.userId;
                console.log('Decoded User ID:', userId);
                setCheckoutData({ userId, ticketId, ticketPrice, quantity });
                navigate(`/view-details/${eventId}`, {
                    state: {
                        updatedAvailableCount: availableTickets // Pass the new ticket count here
                    }
                });
                console.log('Checkout Data:', { userId, ticketId, ticketPrice, quantity });
            } else {
                toast.error("User not authenticated");
            }
        } catch (error) {
            toast.error(error.message || 'Internal Server Error');
        }
    }

    const handleTicketTypeChange = (e) => {
        const selectedType = e.target.value;
        setTicketType(selectedType);
        setTicketPrice(selectedType === 'VIP' ? state.vipPrice : state.generalPrice);  // Adjust the price based on ticket type
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Purchase Ticket</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Ticket ID</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={ticketId}
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Ticket Type</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={ticketType}
                                onChange={handleTicketTypeChange}
                            >
                                <option value="General">General</option>
                                <option value="VIP">VIP</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Payment Gateway</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={paymentGateway}
                                onChange={(e) => setPaymentGateway(e.target.value)}
                            >
                                <option value="stripe">Stripe</option>
                                <option value="razorpay">Razorpay</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600 transition"
                        >
                            Purchase Ticket
                        </button>
                    </form>

                    {/* Render CheckOut component conditionally */}
                    {checkoutData && (
                        <CheckOut
                            quantity={checkoutData.quantity}
                            userId={checkoutData.userId}
                            ticketId={checkoutData.ticketId}
                            ticketPrice={checkoutData.ticketPrice}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default PurchaseTicket;
