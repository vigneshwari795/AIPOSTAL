
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Dummy authentication logic
        if (email && password) {
            if (password.length >= 6) {
                // Store user session (dummy)
                localStorage.setItem('token', 'dummy-jwt-token');
                localStorage.setItem('user', JSON.stringify({ email }));
                navigate('/roles');
            } else {
                setError('Password must be at least 6 characters');
            }
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                padding: '2.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
                border: '2px solid #F63049'
            }}>
                <h1 style={{
                    color: '#111F35',
                    marginBottom: '0.5rem',
                    fontSize: '2rem',
                    textAlign: 'center'
                }}>
                    Login
                </h1>
                <p style={{
                    color: '#8A244B',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                }}>
                    Postal Management System
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#111F35',
                            fontWeight: '500'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #D02752',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#F63049')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#D02752')}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#111F35',
                            fontWeight: '500'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #D02752',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#F63049')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#D02752')}
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#ffe6e6',
                            color: '#F63049',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            border: '1px solid #F63049'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            backgroundColor: '#F63049',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D02752')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F63049')}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
