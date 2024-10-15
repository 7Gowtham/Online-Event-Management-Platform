import React, { useEffect, useState } from 'react';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import TicketSalesBreakdownChart from './common/TicketSalesBreakdownChart';
import { useParams } from 'react-router-dom';

function EventAnalytics() {
    const { eventId } = useParams();
    const [totalTicketsSold, setTotalTicketsSold] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [vipAttendanceRate, setVipAttendanceRate] = useState(0); 
    const [generalAttendanceRate, setGeneralAttendanceRate] = useState(0); 
    const [ticketSalesBreakdown, setTicketSalesBreakdown] = useState([]);

    const fetchTotalTicketsSold = async () => {
        try {
            let { message, totalTicketsSold } = await AxiosService.get(`${ApiRoutes.GET_TOTAL_TICKETS_SOLD.path}/${eventId}`, { authenticate: ApiRoutes.GET_TOTAL_TICKETS_SOLD.auth });
            setTotalTicketsSold(totalTicketsSold);
            // toast.success(message);
        } catch (error) {
            console.error(error.message || 'Internal Server Error');
        }
    };

    const fetchTotalRevenue = async () => {
        try {
            let { message, totalRevenue } = await AxiosService.get(`${ApiRoutes.GET_TOTAL_REVENUE.path}/${eventId}`, { authenticate: ApiRoutes.GET_TOTAL_REVENUE.auth });
            setTotalRevenue(totalRevenue);
            // toast.success(message);
        } catch (error) {
            console.error(error.message || 'Internal Server Error');
        }
    };

    const fetchAttendanceRate = async () => {
        try {
            let { message, vipAttendanceRate, generalAttendanceRate } = await AxiosService.get(`${ApiRoutes.GET_ATTENDANCE_RATE.path}/${eventId}`, { authenticate: ApiRoutes.GET_ATTENDANCE_RATE.auth });
            setVipAttendanceRate(vipAttendanceRate); 
            setGeneralAttendanceRate(generalAttendanceRate); 
            // toast.success(message);
        } catch (error) {
            console.error(error.message || 'Internal Server Error');
        }
    };

    const fetchTicketSalesBreakdown = async () => {
        try {
            let { message, salesBreakdown } = await AxiosService.get(`${ApiRoutes.GET_TICKET_SALES_BREAKDOWN.path}/${eventId}`, { authenticate: ApiRoutes.GET_TICKET_SALES_BREAKDOWN.auth });
            setTicketSalesBreakdown(salesBreakdown);
            // toast.success(message);
        } catch (error) {
            console.error(error.message || 'Internal Server Error');
        }
    };

    useEffect(() => {
        fetchTotalTicketsSold();
        fetchTotalRevenue();
        fetchAttendanceRate();
        fetchTicketSalesBreakdown();
    }, [eventId]);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Event Analytics</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold">Total Tickets Sold</h2>
                        <p className="text-3xl font-bold text-blue-600">{totalTicketsSold}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold">Total Revenue</h2>
                        <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold">VIP Attendance Rate</h2>
                        <p className="text-3xl font-bold text-red-600">{vipAttendanceRate}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold">General Attendance Rate</h2>
                        <p className="text-3xl font-bold text-red-600">{generalAttendanceRate}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold">Ticket Sales Breakdown</h2>
                        <ul>
                            {ticketSalesBreakdown.map((ticket, index) => (
                                <li key={index}>
                                    {ticket._id} Tickets: {ticket.totalSold} (₹{ticket.totalRevenue})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <TicketSalesBreakdownChart data={ticketSalesBreakdown} />
            </div>
        </>
    );
}

export default EventAnalytics;
