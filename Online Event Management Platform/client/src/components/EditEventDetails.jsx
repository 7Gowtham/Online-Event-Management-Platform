import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';

function EditEventDetails() {
    let {eventId} = useParams();
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
        totalTickets: ''
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

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            let {message} = await AxiosService.put(`${ApiRoutes.EDIT_EVENT_DETAILS.path}/${eventId}`, eventDetails, {authenticate:ApiRoutes.EDIT_EVENT_DETAILS.auth})
            toast.success(message)
            navigate(`/view-details/${eventId}`)
        } catch (error) {
            toast.error(error.message || 'Internal Server Error')
        }
    }

    useEffect(()=>{
        getData();
    },[eventId])

    return <>
        <div className="container mx-auto my-10 p-5 max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Event Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Event Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventDetails.title}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Image URL Input */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={eventDetails.image}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={eventDetails.description}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Location Input */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventDetails.location}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Date Input */}
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventDetails.date ? new Date(eventDetails.date).toISOString().substring(0, 10) : ''}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Time Input */}
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Event Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={eventDetails.time}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Category Input */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={eventDetails.category}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* VIP Price Input */}
                <div>
                    <label htmlFor="vipPrice" className="block text-sm font-medium text-gray-700">
                        VIP Ticket Price
                    </label>
                    <input
                        type="number"
                        id="vipPrice"
                        name="vipPrice"
                        value={eventDetails.vipPrice}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* General Price Input */}
                <div>
                    <label htmlFor="generalPrice" className="block text-sm font-medium text-gray-700">
                        General Ticket Price
                    </label>
                    <input
                        type="number"
                        id="generalPrice"
                        name="generalPrice"
                        value={eventDetails.generalPrice}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Total Tickets Input */}
                <div>
                    <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-700">
                        Total Tickets Available
                    </label>
                    <input
                        type="number"
                        id="totalTickets"
                        name="totalTickets"
                        value={eventDetails.totalTickets}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default EditEventDetails