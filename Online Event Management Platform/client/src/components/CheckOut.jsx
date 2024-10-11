import React from 'react'
import { useState } from 'react';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';


function CheckOut({ quantity, userId, ticketId,ticketPrice }) {
    const [loading, setLoading] = useState(false);
    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await AxiosService.post(ApiRoutes.CHECKOUT_SESSION.path,{quantity, userId, ticketId, ticketPrice},{authenticate: ApiRoutes.CHECKOUT_SESSION.path})
            console.log(id)
            const sessionId = res.data.id;
            const stripe = window.Stripe(process.env.STRIPE_PUBLIC_KEY);
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error creating checkout session:', error);
        } finally {
            setLoading(false);
        }
    };
    return <>
        <button onClick={handleCheckout} disabled={loading}>
            {loading ? 'Processing...' : 'Purchase Ticket'}
        </button>
    </>
}

export default CheckOut