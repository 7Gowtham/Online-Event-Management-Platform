import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';

function ViewEventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketId, setTicketId] = useState(null);
    const [activeAccordion, setActiveAccordion] = useState(null); 
    let navigate = useNavigate();
    const { state } = useLocation();

    const getData = async () => {
        try {
            let { data, ticketId, message } = await AxiosService.get(`${ApiRoutes.GET_EVENT_DETAILS.path}/${eventId}`, { authenticate: ApiRoutes.GET_EVENT_DETAILS.auth });
            setEvent(data);
            setTicketId(ticketId);
            toast.success(message);
        } catch (error) {
            toast.error(error.message || 'Internal Server Error');
        }
    };

    useEffect(() => {
        getData();
    }, [eventId]);

    const toggleAccordion = (section) => {
        setActiveAccordion(prev => (prev === section ? null : section));
    };

    return (
        <div className="container mx-auto my-10 p-5">
            {event ? (
                <>
                    <div className="relative mb-6">
                        <img
                            src={event.image || "https://example.com/default.jpg"}
                            alt={event.title || "Default Title"}
                            className="w-full h-96 object-cover rounded-xl"
                        />
                    </div>

                    <div className="accordion-container">

                        <div className="accordion-item mb-4">
                            <button
                                className="w-full text-left text-2xl font-semibold py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={() => toggleAccordion('info')}
                            >
                                Event Info
                            </button>
                            {activeAccordion === 'info' && (
                                <div className="p-4 bg-white rounded-md shadow-md mt-2">
                                    <div className="text-center">
                                        <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                                        <p className="text-gray-500 mb-4">
                                            {new Date(event.date).toLocaleDateString('en-US')} {event.time}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="accordion-item mb-4">
                            <button
                                className="w-full text-left text-2xl font-semibold py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={() => toggleAccordion('description')}
                            >
                                Event Description
                            </button>
                            {activeAccordion === 'description' && (
                                <div className="p-4 bg-white rounded-md shadow-md mt-2">
                                    <p className="text-gray-700">
                                        {event.description || "This is an event description. It should provide details about the event, its purpose, and what attendees can expect."}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="accordion-item mb-4">
                            <button
                                className="w-full text-left text-2xl font-semibold py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={() => toggleAccordion('details')}
                            >
                                Additional Event Details
                            </button>
                            {activeAccordion === 'details' && (
                                <div className="p-4 bg-white rounded-md shadow-md mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                                    <div>
                                        <h3 className="font-bold">Location:</h3>
                                        <p>{event.location}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Time:</h3>
                                        <p>{event.time}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Category:</h3>
                                        <p>{event.category}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">VIP Price:</h3>
                                        <p>₹{event.vipPrice}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">General Price:</h3>
                                        <p>₹{event.generalPrice}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Available VIP Tickets:</h3>
                                        <p>{event.vipTotalTickets - event.vipTicketsSold}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Available General Tickets:</h3>
                                        <p>{event.generalTotalTickets - event.generalTicketsSold}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="text-center mt-6">
                        <button
                            className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
                            onClick={() => navigate(`/purchase-ticket/${eventId}/${ticketId}`, {
                                state: {
                                    generalPrice: event.generalPrice,
                                    vipPrice: event.vipPrice,
                                }
                            })}
                        >
                            Buy Tickets
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
}

export default ViewEventDetails;
