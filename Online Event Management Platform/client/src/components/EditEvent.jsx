import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: ''
  });

  const getData = async (eventId) => {
    try {
      let { data } = await AxiosService.get(ApiRoutes.GET_ALL_EVENTS.path, { authenticate: ApiRoutes.GET_ALL_EVENTS.auth });
      const event = data.find(ev => ev.eventId === eventId);
      if (event) {
        event.date = new Date(event.date).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        setEventData(event);
      } else {
        toast.error("Event not found");
      }
    } catch (error) {
      toast.error(error.message || 'Internal Server Error');
    }
  }

  useEffect(() => {
    if (eventId) {
      getData(eventId);
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let { message } = await AxiosService.put(`${ApiRoutes.EDIT_EVENT.path}/${eventId}`, eventData, { authenticate: ApiRoutes.EDIT_EVENT.auth });
      toast.success(message);
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Internal Server Error');
    }
  }

  return <>
    <form className="w-full max-w-lg mx-auto p-4 mt-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={eventData.title || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Event Title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
        <textarea
          name="description"
          value={eventData.description || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Event Description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={eventData.location || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Event Location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={eventData.date || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Event Date"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time</label>
        <input
          type="time"
          name="time"
          value={eventData.time || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Event Time"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={eventData.category || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Event Category"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdate}
        >
          Save Changes
        </button>
      </div>
    </form>
  </>
}

export default EditEvent;
