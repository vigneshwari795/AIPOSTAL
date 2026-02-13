
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
        <div className="min-h-screen bg-[#111F35] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gradient-to-br from-[#111F35] to-[#8A244B] p-8 rounded-xl shadow-2xl border border-[#F63049] relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#F63049] opacity-10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-full mb-6 shadow-lg transform transition-transform hover:scale-105 duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Track Your Parcel
                    </h1>
                    <p className="text-gray-300 text-sm">
                        Real-time updates on your delivery status
                    </p>
                </div>

                <div className="mb-6 relative z-10">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tracking ID
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full bg-[#0d1829] border border-[#8A244B] text-white text-lg rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#F63049] focus:ring-1 focus:ring-[#F63049] placeholder-gray-500 transition-all duration-200"
                            placeholder="e.g., TRK8859201"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 flex items-center relative z-10 animate-fade-in">
                        <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                <button
                    onClick={handleTrack}
                    className="w-full bg-gradient-to-r from-[#F63049] to-[#D02752] hover:from-[#D02752] hover:to-[#B02042] text-white font-bold py-3.5 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 relative z-10 flex items-center justify-center group"
                >
                    <span>Track Now</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}