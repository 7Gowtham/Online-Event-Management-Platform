import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import toast from 'react-hot-toast';
import ApiRoutes from '../utils/ApiRoutes';

const CheckOutSuccess = () => {
    const { search } = useLocation();
    const navigate = useNavigate(); 
    useEffect(() => {
        const confirmPayment = async () => {
            const params = new URLSearchParams(search);
            const sessionId = params.get('session_id');

            console.log("Session ID:", sessionId); 

            if (sessionId) {
                try {
                    const {message, transactionId} = await AxiosService.get(
                        `${ApiRoutes.CONFIRM_PAYMENT.path}?session_id=${sessionId}`,
                        { authenticate: ApiRoutes.CONFIRM_PAYMENT.auth }
                    );
                    
                    console.log("Payment confirmation response:", message, transactionId);
                    
                    toast.success(message);

                } catch (error) {
                    console.error("Payment confirmation failed:", error);
                }
            } else {
                toast.error("Session ID not found.");
            }
        };

        confirmPayment();
    }, [search, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center">Thank You!</h2>
                <p className="mt-4 text-center">
                    Your payment was successful. We will send you a confirmation email shortly.
                </p>
                <div className="mt-6 text-center">
                    <p>If you have any questions, please contact our support team.</p>
                </div>
            </div>
        </div>
    );
};

export default CheckOutSuccess;
