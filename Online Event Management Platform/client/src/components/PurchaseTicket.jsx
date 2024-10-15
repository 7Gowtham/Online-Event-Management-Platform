import React, { useState } from 'react';
import AxiosService from '../utils/AxiosService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import tktImage from '../assets/ticket.jpeg'

function PurchaseTicket() {
    let { eventId, ticketId } = useParams();
    const { state } = useLocation();
    const [ticketType, setTicketType] = useState('General');
    const [quantity, setQuantity] = useState(1);
    const [paymentGateway, setPaymentGateway] = useState('Stripe');
    const [ticketPrice, setTicketPrice] = useState(state?.generalPrice || 0);
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let { ticket, message } = await AxiosService.post(`${ApiRoutes.PURCHASE_TICKET.path}/${eventId}/${ticketId}`, {
                ticketId,
                eventId,
                ticket_type: ticketType,
                quantity: parseInt(quantity),
                ticketPrice,
                paymentGateway
            }, { authenticate: ApiRoutes.PURCHASE_TICKET.auth });
            
            console.log(message);
            toast.success(message);

            const token = sessionStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.userId;
                console.log('Decoded User ID:', userId);
                
                navigate(`/create-checkout-session`, {
                    state: { 
                        userId,
                        ticketId, 
                        ticketPrice: ticket.price, 
                        quantity: ticket.quantity,
                        paymentGateway: ticket.paymentGateway
                    }
                });
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
        setTicketPrice(selectedType === 'VIP' ? state.vipPrice : state.generalPrice);  
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100"
            style={{ backgroundImage: `url(${tktImage})` }}
            >
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
                            </select>
                        </div>


                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600 transition"
                        >
                            Purchase Ticket
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PurchaseTicket;
