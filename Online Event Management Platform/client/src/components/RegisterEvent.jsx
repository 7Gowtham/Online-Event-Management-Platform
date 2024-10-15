import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function RegisterEvent() {
  const location = useLocation();
  const {event} = location.state || {};
  let [formData, setFormData] = useState({
    eventId: '',
    title: '',
    location: '',
    date: '',
    time: '',
    registerName: '',
    registerEmail: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let {message} = await AxiosService.post(ApiRoutes.REGISTER_EVENT.path, formData, {authenticate: ApiRoutes.REGISTER_EVENT.auth})
      toast.success(message)
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed');
    }
  }

  useEffect(()=>{
    if(event){
      setFormData({
        eventId: event.eventId,
        title: event.title,
        location: event.location,
        date: event.date,
        time: event.time,
      })
    }
  },[event])

  return <>
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Register for {formData.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-semibold">Event ID:</label>
          <input
            type="text"
            name="eventId"
            value={formData.eventId}
            readOnly
            className="p-2 border rounded-lg w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            readOnly
            className="p-2 border rounded-lg w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">Location:</label>
          <input
            type="text"
            value={formData.location}
            readOnly
            className="p-2 border rounded-lg w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">Date:</label>
          <input
            type="Date"
            value={formData.date}
            readOnly
            className="p-2 border rounded-lg w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">Time:</label>
          <input
            type="time"
            value={formData.time}
            readOnly
            className="p-2 border rounded-lg w-full bg-gray-100"
          />
        </div>


        <div>
          <label className="block font-semibold">Your Name:</label>
          <input
            type="text"
            name="attendeeName"
            value={formData.registerName}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Your Email:</label>
          <input
            type="email"
            name="attendeeEmail"
            value={formData.registerEmail}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  </>
}

export default RegisterEvent