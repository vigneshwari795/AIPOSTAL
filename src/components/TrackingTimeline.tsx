

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
            <div className="text-center py-8 text-gray-400">
                No tracking events available
            </div>
        );
    }

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
        <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#8A244B] opacity-30"></div>

            <div className="space-y-8">
                {trackingEvents.map((event, index) => {
                    const isLast = index === trackingEvents.length - 1;

                    return (
                        <div key={index} className="relative pl-12">
                            {/* Timeline Dot */}
                            <div className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center border-4 border-[#111F35] ${isLast ? 'bg-[#F63049] text-white' : 'bg-[#111F35] border-[#F63049]'
                                }`}>
                                {isLast ? (
                                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                                ) : (
                                    <svg className="w-4 h-4 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>

                            {/* Content Card */}
                            <div className={`rounded-xl p-5 border transition-all duration-200 ${isLast
                                ? 'bg-gradient-to-r from-[#F63049] to-[#D02752] border-transparent shadow-lg transform scale-105'
                                : 'bg-[#111F35] border-[#8A244B] hover:border-[#F63049]'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-bold text-lg ${isLast ? 'text-white' : 'text-white'}`}>
                                        {event.status}
                                    </h3>
                                    {isLast && (
                                        <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs text-white font-medium backdrop-blur-sm">
                                            Current
                                        </span>
                                    )}
                                </div>

                                <div className={`flex items-center text-sm mb-2 ${isLast ? 'text-white text-opacity-90' : 'text-gray-300'}`}>
                                    <svg className={`w-4 h-4 mr-2 ${isLast ? 'text-white' : 'text-[#F63049]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.location}
                                </div>

                                <div className={`flex items-center text-xs ${isLast ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                                    <svg className={`w-4 h-4 mr-2 ${isLast ? 'text-white' : 'text-[#8A244B]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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