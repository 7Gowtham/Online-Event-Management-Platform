import React, { useEffect, useState } from 'react';
import placeholder from '../../assets/placeholder.jpg';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import toast from 'react-hot-toast';

function EventCard({ image, title, description, eventId, location, date, time, category, role, onDelete }) {
    let navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);

    const fetchRegistrationEvents = async () => {
        console.log('Fetching registration events...');
        try {
            const { data } = await AxiosService.get(
                `${ApiRoutes.GET_ALL_APPROVED_REGISTERED_EVENTS_BY_USERID.path}`,
                { authenticate: ApiRoutes.GET_ALL_APPROVED_REGISTERED_EVENTS_BY_USERID.auth }
            );
            console.log('Fetched Data:', data);

            const registeredEvent = data.find(event => event.eventDetails.eventId === eventId);
            console.log('Registered Event:', registeredEvent);

            if (registeredEvent && registeredEvent.registeredEvents.status === "Approved") {
                setIsRegistered(true); 
            } else {
                setIsRegistered(false); 
            }
        } catch (error) {
            console.error('Error fetching registered events:', error);
        }
    };


    useEffect(() => {
        fetchRegistrationEvents();
    }, [eventId])

    const handleEdit = () => {
        navigate(`/edit-event/${eventId}`);
    };

    const handleEditEventDetails = () => {
        navigate(`/edit-event-details/${eventId}`)
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const { message } = await AxiosService.delete(`${ApiRoutes.DELETE_EVENT_BY_USERID.path}/${eventId}`, { authenticate: ApiRoutes.DELETE_EVENT_BY_USERID.auth });
                toast.success(message);
                onDelete(eventId);
            } catch (error) {
                toast.error('Failed to delete event: ' + error.message);
            }
        }
    };

    const handleAnalytics = async () => {
        navigate(`/analytics/${eventId}`)
    }

    const handleRegister = () => {
        const eventDetails = {
            eventId,
            title,
            location,
            date,
            time,
        };
        navigate('/register-event', { state: { event: eventDetails } });
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-2xl">
            <img
                src={image ? image : placeholder}
                alt="Event"
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">
                    {title ? title : 'Title Goes Here'}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                    {description
                        ? description
                        : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <p>
                        <span className="font-semibold">Location:</span> {location || 'TBD'}
                    </p>
                    <p>
                        <span className="font-semibold">Date:</span> {date ? new Date(date).toLocaleDateString() : 'TBD'}
                    </p>
                    <p>
                        <span className="font-semibold">Time:</span> {time || 'TBD'}
                    </p>
                    <p>
                        <span className="font-semibold">Category:</span> {category || 'General'}
                    </p>
                </div>

                <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Event ID:</span> {eventId}
                </p>

                <div className="mt-6 flex justify-between items-center">
                    {role === 'Admin' ? (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <i className="mr-2 fa fa-edit"></i> Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <i className="mr-2 fa fa-trash"></i> Delete
                            </button>
                            <button
                                onClick={handleAnalytics}
                                className="bg-purple-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-purple-600 transition-colors"
                            >
                                <i className="mr-2 fa fa-chart-bar"></i> View Analytics
                            </button>
                            <button
                                onClick={handleEditEventDetails}
                                className="bg-purple-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-purple-600 transition-colors"
                            >
                                <i className="mr-2 fa fa-info-circle"></i> Edit Event Details
                            </button>
                        </div>
                    ) : role === 'User' ? (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleRegister}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate(`/view-details/${eventId}`)}
                                disabled={!isRegistered}
                                className={`py-2 px-4 rounded-md text-white transition-colors ${isRegistered ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                View Details
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default EventCard;