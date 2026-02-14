import React from 'react';

interface TrackingEvent {
    status: string;
    location: string;
    timestamp: string;
}

interface Props {
    trackingEvents: TrackingEvent[];
}

export default function TrackingTimeline({ trackingEvents }: Props) {
    if (!trackingEvents || trackingEvents.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No tracking events available
            </div>
        );
    }



    const getStatusIcon = (index: number, isLast: boolean) => {
        if (isLast) {
            return (
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#F63049',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 3px #F63049'
                }}>
                    ●
                </div>
            );
        }
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1.2rem',
                border: '3px solid #ffffff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                ✓
            </div>
        );
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid #D02752'
        }}>
            <h2 style={{
                color: '#111F35',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '2rem'
            }}>
                Tracking Timeline
            </h2>

            <div style={{ position: 'relative' }}>
                {trackingEvents.map((event, index) => {
                    const isLast = index === trackingEvents.length - 1;
                    const isFirst = index === 0;

                    return (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                paddingBottom: isLast ? '0' : '2.5rem',
                                paddingLeft: '60px'
                            }}
                        >
                            {/* Timeline line */}
                            {!isLast && (
                                <div style={{
                                    position: 'absolute',
                                    left: '19px',
                                    top: '40px',
                                    bottom: '0',
                                    width: '2px',
                                    backgroundColor: '#D02752'
                                }} />
                            )}

                            {/* Timeline icon */}
                            <div style={{
                                position: 'absolute',
                                left: '0',
                                top: '0'
                            }}>
                                {getStatusIcon(index, isLast)}
                            </div>

                            {/* Event content */}
                            <div style={{
                                backgroundColor: isLast ? '#fff5f7' : '#f9f9f9',
                                padding: '1rem 1.25rem',
                                borderRadius: '6px',
                                border: `2px solid ${isLast ? '#F63049' : '#e0e0e0'}`,
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '0.5rem',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem'
                                }}>
                                    <h3 style={{
                                        color: isLast ? '#F63049' : '#111F35',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        margin: '0'
                                    }}>
                                        {event.status}
                                    </h3>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        backgroundColor: isLast ? '#F63049' : '#8A244B',
                                        color: '#ffffff'
                                    }}>
                                        {isLast ? 'Current' : 'Completed'}
                                    </span>
                                </div>

                                <div style={{
                                    color: '#8A244B',
                                    fontSize: '0.9rem',
                                    marginBottom: '0.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {event.location}
                                </div>

                                <div style={{
                                    color: '#666',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {formatTimestamp(event.timestamp)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}