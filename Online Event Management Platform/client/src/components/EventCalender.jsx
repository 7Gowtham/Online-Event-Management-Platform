import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import calenderImg from '../assets/cal-img.png'

function EventCalender() {
    const [events, setEvents] = useState([])

    const fetchEvents = async()=>{
        try {
            let {data} = await AxiosService.get(ApiRoutes.GET_ALL_EVENTS_CALENDER_VIEW.path, {authenticate:ApiRoutes.GET_ALL_EVENTS_CALENDER_VIEW.auth})
            const eventData = data.map((event)=>({
                title: event.title,
                start: new Date(event.date), 
                // description: event.description,
                location: event.location,
                time: event.time,
            }))
            setEvents(eventData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    useEffect(()=>{
        fetchEvents()
    },[])
    
    return <>
        <div className="container mx-auto p-5"
        style={{ backgroundImage: `url(${calenderImg})` }}>
            <h1 className="text-3xl font-bold mb-5">Event Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={(eventInfo) => (
                    <div className="p-2">
                        <strong>{eventInfo.event.title}</strong>
                        <br />
                        {/* <span>{eventInfo.event.extendedProps.description}</span>
                        <br /> */}
                        <span>{eventInfo.event.extendedProps.location}</span>
                        <br />
                        <span>{eventInfo.event.extendedProps.time}</span>
                    </div>
                )}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
            />
        </div>
    </>
}

export default EventCalender