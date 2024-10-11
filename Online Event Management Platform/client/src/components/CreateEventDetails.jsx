import React, { useState } from 'react'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateEventDetails() {
    const [formData, setFormData] = useState({
        eventId: '',
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
        generalTotalTickets:''
    });
    const allowedExtensions = ['png','jpg','jpeg']
    let navigate = useNavigate()

    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }

    const validateExtension = (name) => {
        const extension = name.split('.')[name.split('.').length - 1]
        return allowedExtensions.includes(extension)
    }
    
    const selectFile = (event) => {
        const selectedFile = event.target.files[0]
        if (validateExtension(selectedFile.name)) {
            let reader = new FileReader()

            reader.readAsDataURL(selectedFile)

            reader.onload = () => {
            setImage(reader.result)
            }
        }
        else {
            toast.error(`Only File Type of ${allowedExtensions.join(',')} are allowed`)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const dataToSend = {
            ...formData,
            vipPrice: parseInt(formData.vipPrice, 10),
            generalPrice: parseInt(formData.generalPrice, 10),
            vipTotalTickets: parseInt(formData.vipTotalTickets, 10),
            generalTotalTickets: parseInt(formData.generalTotalTickets, 10)
        };
        try {
            let {message} = await AxiosService.post(ApiRoutes.CREATE_EVENT_DETAILS.path, dataToSend, {authenticate: ApiRoutes.CREATE_EVENT_DETAILS.path})
            toast.success(message)
            navigate('/home')
        } catch (error) {
            toast.error(error.message || 'Internal Server Error')
        }
    }

    return <>
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
            <h1 className="text-2xl font-semibold mb-6">Create Event Details</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Event ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Event ID</label>
                    <input
                        type="text"
                        name="eventId"
                        value={formData.eventId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter Event ID"
                        required
                    />
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter Event Title"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter description"
                        required
                    />
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter location"
                        required
                    />
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Time */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter Event Category"
                        required
                    />
                </div>

                {/* VIP Price */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">VIP Price</label>
                    <input
                        type="number"
                        name="vipPrice"
                        value={formData.vipPrice}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter VIP Price"
                        required
                    />
                </div>

                {/* General Price */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">General Price</label>
                    <input
                        type="number"
                        name="generalPrice"
                        value={formData.generalPrice}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter General Price"
                        required
                    />
                </div>

                {/* Total Tickets */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">VIP Total Tickets</label>
                    <input
                        type="number"
                        name="vipTotalTickets"
                        value={formData.vipTotalTickets}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter VIP Total Number of Tickets"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">General Total Tickets</label>
                    <input
                        type="number"
                        name="generalTotalTickets"
                        value={formData.generalTotalTickets}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter General Total Number of Tickets"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={selectFile}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Video Upload */}
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Video</label>
                    <input
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div> */}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Create Event Details
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default CreateEventDetails