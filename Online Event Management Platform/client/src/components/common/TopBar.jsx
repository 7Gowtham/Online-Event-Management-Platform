import React from 'react';
import useLogout from '../../hooks/useLogout';
import { useLocation, NavLink } from 'react-router-dom';
import eventLogo from '../../assets/event-logo.png';

function TopBar() {
    let logout = useLogout();
    let name = sessionStorage.getItem('name');
    let role = sessionStorage.getItem('role');

    let links = [
        { label: 'Home', path: '/home', role: ['Admin', 'User'] },
        { label: 'Create Event', path: '/create-event', role: ['Admin'] },
        { label: 'Create EventDetails', path: '/create-event-details', role: ['Admin'] },
        { label: 'Create Ticket', path: '/create-ticket', role: ['Admin'] },
        { label: 'Event Dashboard', path: '/dashboard', role: ['Admin'] },
        { label: 'Ticket Dashboard', path: '/alltickets', role: ['Admin'] },
        { label: 'My Events', path: '/events', role: ['User'] },
        { label: 'My Tickets', path: '/mytickets', role: ['User'] },
        { label: 'Profile', path: '/profile', role: ['User'] },
        { label: 'Contact', path: '/contact', role: ['User'] }
    ];

    let { pathname } = useLocation();

    return (
        <nav className="sticky top-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg z-10">
            <div className="px-4 py-2">
                <div className="flex justify-between items-center">

                    <div className="flex items-center space-x-2">
                        <img src={eventLogo} alt="Eventozor Logo" className="h-8 w-8" />
                        <NavLink to="/home" className="text-white font-bold text-xl">
                            Eventozor
                        </NavLink>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {links.map((link, i) => (
                            link.role.includes(role) && (
                                <NavLink
                                    key={i}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive || link.path === pathname
                                            ? "text-white bg-indigo-700 rounded-lg px-3 py-1"
                                            : "text-white hover:bg-indigo-600 px-3 py-1 rounded-lg transition"
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            )
                        ))}
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold text-md">
                            Hi, {name}!
                        </span>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg"
                            onClick={() => logout()}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopBar;
