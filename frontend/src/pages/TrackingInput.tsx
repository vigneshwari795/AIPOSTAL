
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackingInput() {
    const [trackingId, setTrackingId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTrack = () => {
        setError('');

        if (!trackingId.trim()) {
            setError('Please enter a tracking ID');
            return;
        }

        navigate(`/track/${trackingId}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTrack();
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
                maxWidth: '500px',
                border: '2px solid #F63049'
            }}>
                <h1 style={{
                    color: '#111F35',
                    marginBottom: '0.5rem',
                    fontSize: '2rem',
                    textAlign: 'center'
                }}>
                    Track Parcel
                </h1>
                <p style={{
                    color: '#8A244B',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                }}>
                    Enter your tracking ID to view parcel status
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#111F35',
                        fontWeight: '500'
                    }}>
                        Tracking ID
                    </label>
                    <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        onKeyPress={handleKeyPress}
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
                        placeholder="Enter tracking ID (e.g., TRK1234567890)"
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
                    onClick={handleTrack}
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
                    Track Parcel
                </button>
            </div>
        </div>
    );
}