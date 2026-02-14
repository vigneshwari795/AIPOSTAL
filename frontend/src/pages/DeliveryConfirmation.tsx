import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeliveryConfirmation() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = () => {
        setError('');
        setSuccess(false);

        if (!otp.trim()) {
            setError('Please enter OTP');
            return;
        }

        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }

        if (!/^\d+$/.test(otp)) {
            setError('OTP must contain only numbers');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleConfirm();
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
                maxWidth: '450px',
                border: '2px solid #F63049'
            }}>
                <h1 style={{
                    color: '#111F35',
                    marginBottom: '0.5rem',
                    fontSize: '2rem',
                    textAlign: 'center'
                }}>
                    Confirm Delivery
                </h1>
                <p style={{
                    color: '#8A244B',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                }}>
                    Enter the 6-digit OTP to confirm parcel delivery
                </p>

                {!success ? (
                    <>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#111F35',
                                fontWeight: '500'
                            }}>
                                OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                onKeyPress={handleKeyPress}
                                maxLength={6}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #D02752',
                                    borderRadius: '4px',
                                    fontSize: '1.5rem',
                                    outline: 'none',
                                    textAlign: 'center',
                                    letterSpacing: '0.5rem',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = '#F63049')}
                                onBlur={(e) => (e.currentTarget.style.borderColor = '#D02752')}
                                placeholder="000000"
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
                            onClick={handleConfirm}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                backgroundColor: loading ? '#8A244B' : '#F63049',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#D02752')}
                            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#F63049')}
                        >
                            {loading ? 'Confirming...' : 'Confirm Delivery'}
                        </button>
                    </>
                ) : (
                    <div style={{
                        backgroundColor: '#e6f7e6',
                        color: '#2d5a2d',
                        padding: '1.5rem',
                        borderRadius: '4px',
                        textAlign: 'center',
                        border: '2px solid #4CAF50'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem'
                        }}>
                            ✓
                        </div>
                        <h3 style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '1.25rem',
                            color: '#111F35'
                        }}>
                            Delivery Confirmed!
                        </h3>
                        <p style={{
                            margin: '0',
                            fontSize: '0.9rem',
                            color: '#8A244B'
                        }}>
                            Your parcel has been successfully delivered
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}