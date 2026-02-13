import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (name && email && password && role) {
            if (password.length >= 4) {
                // Store user session (dummy)
                localStorage.setItem('token', 'dummy-jwt-token');
                localStorage.setItem('user', JSON.stringify({ name, email }));
                localStorage.setItem('role', role);

                // Dispatch auth event
                window.dispatchEvent(new Event('auth-change'));

                // Redirect based on role
                switch (role) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'staff':
                        navigate('/staff');
                        break;
                    case 'agent':
                        navigate('/agent/dashboard');
                        break;
                    case 'user':
                        // Redirect to the page they came from, or home if none
                        const from = location.state?.from?.pathname || '/';
                        navigate(from);
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError('Password must be at least 4 characters');
            }
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111F35] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gradient-to-br from-[#111F35] to-[#8A244B] p-10 rounded-xl shadow-2xl border border-[#8A244B]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F63049] to-[#D02752]">
                        Sign in to account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Postal Management System
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-300 block mb-1">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#8A244B] placeholder-gray-500 text-white bg-[#111F35] focus:outline-none focus:ring-[#F63049] focus:border-[#F63049] focus:z-10 sm:text-sm"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="text-sm font-medium text-gray-300 block mb-1">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#8A244B] placeholder-gray-500 text-white bg-[#111F35] focus:outline-none focus:ring-[#F63049] focus:border-[#F63049] focus:z-10 sm:text-sm"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="text-sm font-medium text-gray-300 block mb-1">Select Role</label>
                            <select
                                id="role"
                                name="role"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#8A244B] placeholder-gray-500 text-white bg-[#111F35] focus:outline-none focus:ring-[#F63049] focus:border-[#F63049] focus:z-10 sm:text-sm"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="agent">Delivery Agent</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#8A244B] placeholder-gray-500 text-white bg-[#111F35] focus:outline-none focus:ring-[#F63049] focus:border-[#F63049] focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-[#F63049] text-sm text-center bg-[#F63049] bg-opacity-10 p-2 rounded border border-[#F63049] border-opacity-20">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#F63049] hover:bg-[#D02752] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F63049] transform transition hover:-translate-y-0.5 shadow-lg"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/" className="text-sm text-gray-400 hover:text-[#F63049]">
                            Back to Home
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
