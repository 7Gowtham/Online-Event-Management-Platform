import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TicketSalesBreakdownChart = ({ data = []}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center mt-8">
      <h2 className="text-xl font-semibold mb-4">Ticket Sales Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSold" fill="#8884d8" />
          <Bar dataKey="totalRevenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketSalesBreakdownChart;
