import React, { useState, useEffect } from 'react';

interface Location {
    lat: number;
    lng: number;
}

interface Props {
    sourceLocation?: Location;
    currentLocation?: Location;
    destinationLocation?: Location;
}

export default function MapView({ sourceLocation, currentLocation, destinationLocation }: Props) {
    const [mapError, setMapError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate map loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Calculate center point for the map
    const getCenterCoordinates = () => {
        if (currentLocation) {
            return currentLocation;
        }
        if (sourceLocation && destinationLocation) {
            return {
                lat: (sourceLocation.lat + destinationLocation.lat) / 2,
                lng: (sourceLocation.lng + destinationLocation.lng) / 2
            };
        }
        return sourceLocation || destinationLocation || { lat: 0, lng: 0 };
    };

    const center = getCenterCoordinates();

    // Placeholder map visualization
    const renderPlaceholderMap = () => {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f4f8',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background grid pattern */}
                <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d0d8e0" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Route line */}
                {sourceLocation && destinationLocation && (
                    <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                        <line
                            x1="20%"
                            y1="30%"
                            x2="80%"
                            y2="70%"
                            stroke="#D02752"
                            strokeWidth="3"
                            strokeDasharray="10,5"
                        />
                    </svg>
                )}

                {/* Source marker */}
                {sourceLocation && (
                    <div style={{
                        position: 'absolute',
                        left: '20%',
                        top: '30%',
                        transform: 'translate(-50%, -100%)'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#4CAF50',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            border: '3px solid #ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                transform: 'rotate(45deg)',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                S
                            </span>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#ffffff',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#111F35',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #4CAF50'
                        }}>
                            Source
                        </div>
                    </div>
                )}

                {/* Current location marker */}
                {currentLocation && (
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -100%)',
                        animation: 'pulse 2s infinite'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#F63049',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            border: '3px solid #ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                transform: 'rotate(45deg)',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                📦
                            </span>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#ffffff',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#F63049',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #F63049'
                        }}>
                            Current Location
                        </div>
                    </div>
                )}

                {/* Destination marker */}
                {destinationLocation && (
                    <div style={{
                        position: 'absolute',
                        left: '80%',
                        top: '70%',
                        transform: 'translate(-50%, -100%)'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#8A244B',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            border: '3px solid #ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                transform: 'rotate(45deg)',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                D
                            </span>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#ffffff',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#111F35',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #8A244B'
                        }}>
                            Destination
                        </div>
                    </div>
                )}

                <style>
                    {`
            @keyframes pulse {
              0%, 100% {
                transform: translate(-50%, -100%) scale(1);
              }
              50% {
                transform: translate(-50%, -100%) scale(1.1);
              }
            }
          `}
                </style>
            </div>
        );
    };

    if (loading) {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                minHeight: '400px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '2px solid #D02752',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #F63049',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{ color: '#8A244B', fontSize: '0.9rem' }}>Loading map...</p>
                    <style>
                        {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
                    </style>
                </div>
            </div>
        );
    }

    if (mapError) {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                minHeight: '400px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '2px solid #F63049',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <p style={{ color: '#F63049', fontSize: '1rem', marginBottom: '0.5rem' }}>
                            Unable to load map
                        </p>
                        <p style={{ color: '#8A244B', fontSize: '0.85rem' }}>
                            Please check your internet connection and try again
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '2px solid #D02752',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Map header */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                zIndex: 10,
                backgroundColor: '#ffffff',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                border: '1px solid #D02752'
            }}>
                <h3 style={{
                    margin: '0',
                    color: '#111F35',
                    fontSize: '1rem',
                    fontWeight: '600'
                }}>
                    Real-Time Tracking Map
                </h3>
                <p style={{
                    margin: '0.25rem 0 0 0',
                    color: '#8A244B',
                    fontSize: '0.75rem'
                }}>
                    Live parcel location and route visualization
                </p>
            </div>

            {/* Map container */}
            <div style={{
                width: '100%',
                height: '100%',
                minHeight: '400px'
            }}>
                {renderPlaceholderMap()}
            </div>

            {/* Legend */}
            <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: '#ffffff',
                padding: '0.75rem',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                border: '1px solid #D02752',
                fontSize: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '50%' }} />
                    <span style={{ color: '#111F35' }}>Source</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#F63049', borderRadius: '50%' }} />
                    <span style={{ color: '#111F35' }}>Current</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#8A244B', borderRadius: '50%' }} />
                    <span style={{ color: '#111F35' }}>Destination</span>
                </div>
            </div>
        </div>
    );
}