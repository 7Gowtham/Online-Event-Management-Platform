import React, { useEffect, useState } from 'react'
import AxiosService from "../utils/AxiosService"
import ApiRoutes from "../utils/ApiRoutes"
import EventCard from './common/EventCard'
import { useNavigate } from 'react-router-dom'
import homeImg from '../assets/home.jpeg'

function Home() {
  let [events, setEvents] = useState([])
  let [filteredEvents, setFilteredEvents] = useState([])
  let navigate = useNavigate()
  let [location, setLocation] = useState('')
  let [date, setDate] = useState('')
  let [category, setCategory] = useState('')

  let [role, setRole] = useState(null)

  const getData = async () => {
    try {
      let { data } = await AxiosService.get(ApiRoutes.GET_ALL_EVENTS.path, { authenticate: ApiRoutes.GET_ALL_EVENTS.auth })
      setEvents(data)
      setFilteredEvents(data)
      setRole(sessionStorage.getItem('role'))
    } catch (error) {
      console.error(error.message || 'Internal Server Error')
    }
  }

  const handleSearch = () => {
    let filtered = events.filter(event => {
      return (location ? event.location.toLowerCase().includes(location.toLowerCase()) : true) &&
        (date ? event.date === date : true) &&
        (category ? event.category.toLowerCase().includes(category.toLowerCase()) : true)
    })
    setFilteredEvents(filtered.length ? filtered : events)
  }

  const handleDeleteEvent = (eventId) => {
    const filteredEvents = events.filter(event => event.eventId !== eventId);
    setEvents(filteredEvents);
    setFilteredEvents(filteredEvents)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    handleSearch();
  }, [location, date, category])

  return (
    <div className="min-h-screen bg-gray-50 py-10"
    style={{ backgroundImage: `url(${homeImg})` }}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Your Event</h2>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Search by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
            onClick={() => navigate('/calender-view')}
          >
            Calendar View
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredEvents.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.eventId}
                title={event.title}
                image={event.image}
                description={event.description}
                eventId={event.eventId}
                location={event.location}
                date={event.date}
                time={event.time}
                category={event.category}
                role={role}
                onDelete={() => handleDeleteEvent(event.eventId)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No events found</p>
        )}
      </div>
    </div>
  )
}

export default Home
