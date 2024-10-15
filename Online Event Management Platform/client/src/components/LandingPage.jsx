import React from 'react';
import { useNavigate } from 'react-router-dom';
import eventLogo from '../assets/event-logo.png';
import backgroundImage from '../assets/backgroundimage1.jpg';

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center">
            <div className="text-center">
                <img src={eventLogo} alt="Eventozor Logo" className="h-24 w-24 mb-4 mx-auto" />
                <h1 className="text-white text-4xl font-bold mb-4">Welcome to Eventozor</h1>
                <p className="text-white text-lg mb-8">Online Event Management Platform. Manage your events effortlessly.</p>

                <div className="space-x-4">
                    <button className="px-6 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-100" 
                        onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button className="px-6 py-2 bg-blue-700 text-white rounded-full shadow hover:bg-blue-800"
                        onClick={() => navigate('/signup')}>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
