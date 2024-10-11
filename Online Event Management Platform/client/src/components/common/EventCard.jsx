import React from 'react';
import placeholder from '../../assets/placeholder.jpg';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import toast from 'react-hot-toast';

function EventCard({ image, title, description, eventId, location, date, time, category, role, onDelete }) {
    let dummyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nesciunt similique accusamus, necessitatibus fugiat qui illo? Esse, laboriosam. Maiores repudiandae ipsum deleniti inventore ipsa mollitia alias, impedit ducimus eligendi deserunt.";
    let navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-event/${eventId}`);
    };

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

    const handleAnalytics = async() =>{
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
            {/* Image */}
            <img
                src={image ? image : placeholder}
                alt="Event"
                className="w-full h-48 object-cover"
            />

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-800">
                    {title ? title : 'Title Goes Here'}
                </h3>
                <p className="mt-3 text-gray-600 line-clamp-3">
                    {description
                        ? description
                        : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                </p>

                {/* Additional Event Information */}
                <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Location:</span>{' '}
                        {location || 'TBD'}
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Date:</span>{' '}
                        {date ? new Date(date).toLocaleDateString() : 'TBD'}
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Time:</span>{' '}
                        {time || 'TBD'}
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Category:</span>{' '}
                        {category || 'General'}
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between items-center">
                    {role === 'Admin' ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleAnalytics}
                                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
                            >
                                View Analytics
                            </button>
                        </div>
                    ) : role === 'User' ? (
                        <div className="flex space-x-3">
                            <button
                                onClick={handleRegister}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Register
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/view-details/${eventId}`)
                                }
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
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