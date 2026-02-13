
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parcelService from '../services/parcelService';

export default function BookParcel() {
    const [address, setAddress] = useState('');
    const [addressDetails, setAddressDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleIdentifyPostOffice = async () => {
        if (!address.trim()) {
            setError('Please enter an address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await parcelService.identifyPostOffice(address);
            setAddressDetails(result);
        } catch (err) {
            setError(err.message || 'Failed to identify post office');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateTracking = () => {
        if (!addressDetails) {
            setError('Please identify post office first');
            return;
        }

        const trackingId = 'TRK' + Date.now();
        localStorage.setItem('currentTracking', trackingId);
        localStorage.setItem('addressDetails', JSON.stringify(addressDetails));
        navigate('/post-office-result', { state: { trackingId, addressDetails } });
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '2rem 1rem'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                padding: '2.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '2px solid #F63049'
            }}>
                <h1 style={{
                    color: '#111F35',
                    marginBottom: '0.5rem',
                    fontSize: '2rem'
                }}>
                    Book Parcel
                </h1>
                <p style={{
                    color: '#8A244B',
                    marginBottom: '2rem',
                    fontSize: '0.9rem'
                }}>
                    Enter the delivery address to identify the post office
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#111F35',
                        fontWeight: '500',
                        fontSize: '1rem'
                    }}>
                        Delivery Address
                    </label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="6"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #D02752',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#F63049')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#D02752')}
                        placeholder="Enter full delivery address including street, city, state, and PIN code"
                    />
                </div>

                <button
                    onClick={handleIdentifyPostOffice}
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
                        marginBottom: '1.5rem',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#D02752')}
                    onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#F63049')}
                >
                    {loading ? 'Identifying...' : 'Identify Post Office'}
                </button>

                {error && (
                    <div style={{
                        backgroundColor: '#ffe6e6',
                        color: '#F63049',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        border: '1px solid #F63049'
                    }}>
                        {error}
                    </div>
                )}

                {addressDetails && (
                    <div style={{
                        backgroundColor: '#f9f9f9',
                        padding: '1.5rem',
                        borderRadius: '4px',
                        border: '2px solid #D02752',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{
                            color: '#111F35',
                            marginBottom: '1rem',
                            fontSize: '1.25rem'
                        }}>
                            Address Details
                        </h3>
                        <div style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: '#8A244B' }}>Street:</strong>{' '}
                            <span style={{ color: '#111F35' }}>{addressDetails.street}</span>
                        </div>
                        <div style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: '#8A244B' }}>City:</strong>{' '}
                            <span style={{ color: '#111F35' }}>{addressDetails.city}</span>
                        </div>
                        <div style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: '#8A244B' }}>State:</strong>{' '}
                            <span style={{ color: '#111F35' }}>{addressDetails.state}</span>
                        </div>
                        <div style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: '#8A244B' }}>PIN Code:</strong>{' '}
                            <span style={{ color: '#111F35' }}>{addressDetails.pinCode}</span>
                        </div>
                        <div>
                            <strong style={{ color: '#8A244B' }}>Post Office:</strong>{' '}
                            <span style={{ color: '#111F35' }}>{addressDetails.postOffice}</span>
                        </div>
                    </div>
                )}

                {addressDetails && (
                    <button
                        onClick={handleGenerateTracking}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            backgroundColor: '#111F35',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1a2d4d')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#111F35')}
                    >
                        Generate Tracking ID
                    </button>
                )}
            </div>
        </div>
    );
}
