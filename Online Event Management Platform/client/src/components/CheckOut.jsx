import React, { useState } from 'react';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import { useLocation } from 'react-router-dom';

function CheckOut() {
    const { state } = useLocation();
    const { quantity, userId, ticketId, ticketPrice, paymentGateway } = state || {};
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await AxiosService.post(ApiRoutes.CHECKOUT_SESSION.path, { quantity, userId, ticketId, ticketPrice, paymentGateway, email }, { authenticate: ApiRoutes.CHECKOUT_SESSION.auth });
            console.log(res);

            if (res && res.url) {
                window.location.href = res.url;
            }

        } catch (error) {
            console.error('Error creating checkout session:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <p className="text-gray-700">Quantity: {quantity}</p>
                    <p className="text-gray-700">Ticket Price: ₹{ticketPrice}</p>
                    <p className="text-gray-700">Total: ₹{(ticketPrice * quantity).toFixed(2)}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email Address:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleCheckout}
                    disabled={loading || !email}
                >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
            </div>
        </div>
    );
}

export default CheckOut;
