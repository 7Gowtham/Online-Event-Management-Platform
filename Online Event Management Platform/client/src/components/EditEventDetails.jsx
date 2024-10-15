import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';

function EditEventDetails() {
    let { eventId } = useParams();
    let [eventDetails, setEventDetails] = useState({
        title: '',
        image: '',
        description: '',
        location: '',
        date: '',
        time: '',
        category: '',
        vipPrice: '',
        generalPrice: '',
        vipTotalTickets: '',
        generalTotalTickets: ''
    })

    let navigate = useNavigate()

    const getData = async () => {
        try {
            let { data, message } = await AxiosService.get(`${ApiRoutes.GET_EVENT_DETAILS.path}/${eventId}`, { authenticate: ApiRoutes.GET_EVENT_DETAILS.auth })
            console.log(data)
            setEventDetails(data)
            toast.success(message)
        } catch (error) {
            toast.error(error.message || 'Internal Server Error')
        }
    }

    const handleChange = (e) => {
        setEventDetails({
            ...eventDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { message } = await AxiosService.put(`${ApiRoutes.EDIT_EVENT_DETAILS.path}/${eventId}`, eventDetails, { authenticate: ApiRoutes.EDIT_EVENT_DETAILS.auth })
            toast.success(message)
            navigate(`/view-details/${eventId}`)
        } catch (error) {
            toast.error(error.message || 'Internal Server Error')
        }
    }

    useEffect(() => {
        getData();
    }, [eventId])

    return <>
        <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-md my-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Update Event Details</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
               
                <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Event Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventDetails.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Event Title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={eventDetails.image}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Event Image URL"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={eventDetails.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Event Description"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventDetails.location}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Event Location"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventDetails.date ? new Date(eventDetails.date).toISOString().substring(0, 10) : ''}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                        Event Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={eventDetails.time}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={eventDetails.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Event Category"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="vipPrice" className="block text-gray-700 text-sm font-bold mb-2">
                        VIP Ticket Price
                    </label>
                    <input
                        type="number"
                        id="vipPrice"
                        name="vipPrice"
                        value={eventDetails.vipPrice}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="VIP Ticket Price"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="generalPrice" className="block text-gray-700 text-sm font-bold mb-2">
                        General Ticket Price
                    </label>
                    <input
                        type="number"
                        id="generalPrice"
                        name="generalPrice"
                        value={eventDetails.generalPrice}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="General Ticket Price"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="vipTotalTickets" className="block text-gray-700 text-sm font-bold mb-2">
                        VIP Total Tickets Available
                    </label>
                    <input
                        type="number"
                        id="vipTotalTickets"
                        name="vipTotalTickets"
                        value={eventDetails.vipTotalTickets}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="VIP Tickets"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="generalTotalTickets" className="block text-gray-700 text-sm font-bold mb-2">
                        General Total Tickets Available
                    </label>
                    <input
                        type="number"
                        id="generalTotalTickets"
                        name="generalTotalTickets"
                        value={eventDetails.generalTotalTickets}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="General Tickets"
                        required
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>

    </>
}

export default EditEventDetails