import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';

function ViewEventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null)
    const [ticketId, setTicketId] = useState(null)
    let navigate = useNavigate();
    const { state } = useLocation();

    const getData = async () => {
        try {
            let { data, ticketId, message } = await AxiosService.get(`${ApiRoutes.GET_EVENT_DETAILS.path}/${eventId}`, { authenticate: ApiRoutes.GET_EVENT_DETAILS.auth })
            console.log('Complete data', data, ticketId)
            setEvent(data)
            setTicketId(ticketId)
            toast.success(message)
        } catch (error) {
            toast.error(error.message || 'Internal Server Error')
        }
    }

    useEffect(() => {
        getData();
    }, [eventId])

    useEffect(() => {
        if (state?.updatedAvailableCount !== undefined) {
            setEvent(prevEvent => ({
                ...prevEvent,
                totalTickets: state.updatedAvailableCount
            }));
        }
    }, [state]);

    return <>
        <div className="container mx-auto my-10 p-5">
            {event ? (
                <>
                    {/* Large Image */}
                    <div className="relative mb-6">
                        <img
                            src={event.image || "https://example.com/default.jpg"}
                            alt={event.title || "Default Title"}
                            className="w-full h-96 object-cover rounded-xl"
                        />
                        {/* Profile and Date Overlay */}
                        <div className="absolute top-5 left-5 bg-white bg-opacity-70 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <img
                                    src="https://example.com/profile.jpg"
                                    alt="Organizer"
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                        <p className="text-gray-500 mb-4">
                        {new Date(event.date).toLocaleDateString('en-US')} {event.time}

                        </p>
                    </div>

                    {/* Event Description */}
                    <p className="text-center text-gray-700 mb-6">
                        {event.description ||
                            "This is an event description. It should provide details about the event, its purpose, and what attendees can expect."}
                    </p>

                    {/* Additional Event Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
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

                    {/* Buttons */}
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
    </>
}

export default ViewEventDetails