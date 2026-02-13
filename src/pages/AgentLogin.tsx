import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgentLogin() {
    const [agentId, setAgentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (agentId && password) {
            // Dummy authentication for agent
            if (password.length >= 4) {
                // Store user session (dummy)
                localStorage.setItem('token', 'dummy-agent-token');
                localStorage.setItem('user', JSON.stringify({ id: agentId, role: 'agent' }));
                localStorage.setItem('role', 'agent');
                navigate('/agent/dashboard');
            } else {
                setError('Password must be at least 4 characters');
            }
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border-2 border-[#F63049]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#111F35]">
                        Agent Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to access your delivery assignments
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="agent-id" className="sr-only">Agent ID</label>
                            <input
                                id="agent-id"
                                name="agent-id"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#F63049] focus:border-[#F63049] focus:z-10 sm:text-sm"
                                placeholder="Agent ID"
                                value={agentId}
                                onChange={(e) => setAgentId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#F63049] focus:border-[#F63049] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F63049] hover:bg-[#D02752] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F63049]"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-white group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
