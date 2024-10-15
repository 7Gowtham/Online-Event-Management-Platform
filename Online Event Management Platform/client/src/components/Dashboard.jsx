import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'

function Dashboard() {
  let [events, setEvents] = useState([])
  let color = { Approved: 'green', Pending: '#ffc107', Rejected: 'red' }

  let buttons = [
    {
      label: 'Approve',
      variant: 'bg-green-500 hover:bg-green-600 text-white',
      status: ["Pending", "Rejected"],
      to: "Approved"
    },
    {
      label: 'Reject',
      variant: 'bg-red-500 hover:bg-red-600 text-white',
      status: ["Pending", "Approved"],
      to: "Rejected"
    }
  ]

  const getData = async () => {
    try {
      let { data, message } = await AxiosService.get(ApiRoutes.GET_ALL_REGISTERED_EVENTS.path, { authenticate: ApiRoutes.GET_ALL_REGISTERED_EVENTS.auth })
      console.log(data)
      setEvents(data)
      toast.success(message)
    } catch (error) {
      toast.error(error.message || "Internal Server Error")
    }
  }

  const changeStatus = async (status, registrationId) => {
    console.log(registrationId)
    try {
      let { message } = await AxiosService.put(`${ApiRoutes.CHANGE_STATUS.path}/${registrationId}`, { status }, { authenticate: ApiRoutes.CHANGE_STATUS.auth })
      toast.success(message)
      getData()
    } catch (error) {
      toast.error(error.message || "Internal Server Error")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  let cumulativeIndex = 0;
  return <>
    <div className="relative">
      <div className="border-l-2 border-gray-200 absolute h-full left-4 top-0"></div>

      {events?.map((user) =>
        user?.registeredEvents?.map((registration, index) => {
          let event = user?.eventDetails?.find(e => e.eventId === registration.eventId);
          if (!event) return null;

          cumulativeIndex += 1;

          return (
            <div key={registration.registrationId || index} className="mb-8 flex justify-start items-center relative">
           
              <div className="bg-blue-500 rounded-full h-8 w-8 flex justify-center items-center text-white font-bold absolute left-0">
                {cumulativeIndex}
              </div>

              <div className="ml-16 bg-white shadow-lg rounded-lg p-6 w-full">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="text-gray-500 text-sm mb-2">
                  <i className="fas fa-map-marker-alt mr-1"></i> {event.location}
                </div>
                <div className="text-gray-500 text-sm mb-2">
                  <i className="fas fa-calendar-alt mr-1"></i> {new Date(event.date).toLocaleDateString()} - {event.time}
                </div>
                <div className="text-gray-500 text-sm mb-2">
                  <i className="fas fa-user mr-1"></i> Registered by: {user.name}
                </div>

                <div
                  className="text-sm font-medium mb-4"
                  style={{ color: `${color[registration.status]}` }}
                >
                  Status: {registration.status || 'N/A'}
                </div>

                <div className="flex space-x-2">
                  {buttons.map((button, btnIndex) =>
                    button.status.includes(registration.status) ? (
                      <button
                        key={btnIndex}
                        className={`mr-2 px-3 py-1 rounded ${button.variant}`}
                        onClick={() => changeStatus(button.to, registration.registrationId)}
                      >
                        {button.label}
                      </button>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>

  </>
}

export default Dashboard