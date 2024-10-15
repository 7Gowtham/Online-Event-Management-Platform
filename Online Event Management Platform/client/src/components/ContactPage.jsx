import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import contactImage from '../assets/contact.jpeg';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setShowToast(true);
        setName('');
        setEmail('');
        setMessage('');

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className="container mx-auto my-10 p-5"
            style={{ backgroundImage: `url(${contactImage})` }}
        >
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg">
                    Thank you for reaching out to us, your message is received.
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md mt-8 md:mt-0 md:ml-4">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> support@eventozor.com</p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 87924 12414</p>
                    <p className="text-gray-700 mb-4"><strong>Address:</strong> Victoria Hostel Road, Opp to Chepauk Stadium, Chennai, TamilNadu 600005</p>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-blue-600 hover:text-blue-700 transition" size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-blue-400 hover:text-blue-500 transition" size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-pink-500 hover:text-pink-600 transition" size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="text-blue-700 hover:text-blue-800 transition" size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
