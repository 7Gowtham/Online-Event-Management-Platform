import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'

function Events() {
  let [events, setEvents] = useState([])
  const [expandedEvent, setExpandedEvent] = useState(null);
  let color = { Approved: 'green', Pending: '#ffc107', Rejected: 'red' }

  const getData = async () => {
    try {
      let { data, message } = await AxiosService.get(ApiRoutes.GET_ALL_REGISTERED_EVENTS_BY_USERID.path, { authenticate: ApiRoutes.GET_ALL_REGISTERED_EVENTS_BY_USERID.auth })
      console.log(data)
      if (Array.isArray(data)) {
        setEvents(data);
        // toast.success(message);
      } else {
        toast.error("Unexpected data format");
      }

    } catch (error) {
      toast.error(error.message || "Internal Server Error")
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return <>
    <div className="space-y-4">
      {Array.isArray(events) && events.map((event, i) => (
        <div key={event.eventDetails.eventId} className="bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {i + 1}. {event.eventDetails.title}
            </h3>
            <button
              type="button"
              className="text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}
            >
              {expandedEvent === i ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {expandedEvent === i && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-500 mb-2">
                <strong>Location:</strong> {event.eventDetails.location}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Date:</strong> {new Date(event.eventDetails.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Time:</strong> {event.eventDetails.time}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Status:</strong>
                <span className="font-medium" style={{ color: `${color[event.registeredEvents.status]}` }}>
                  {event.registeredEvents.status}
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>

  </>
}

export default Events