import React, { useState } from 'react'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateTicket() {
    const [eventId, setEventId] = useState('');
    const [ticketType, setTicketType] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const ticketData = {
            eventId,
            ticket_type: ticketType,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        }
        try {
            let {message} = await AxiosService.post(ApiRoutes.CREATE_TICKET.path, ticketData, {authenticate:ApiRoutes.CREATE_TICKET.auth})
            console.log(message)
            toast.success(message)
            // navigate('/alltickets')
        } catch (error) {
            toast.error(error.message || 'Internal Server Error')
        }
    }
    return <>
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Ticket</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventId">
                            Event ID
                        </label>
                        <input
                            type="text"
                            id="eventId"
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketType">
                            Ticket Type
                        </label>
                        <select
                            id="ticketType"
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
                            required
                        >
                            <option value="">Select Ticket Type</option>
                            <option value="VIP">VIP</option>
                            <option value="General">General</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
                        
                    >
                        Create Ticket
                    </button>
                </form>
            </div>
        </div>
    </>
}

export default CreateTicket