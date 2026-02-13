import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TrackingTimeline from '../components/TrackingTimeline';
import MapView from '../components/MapView';
import trackingService from '../services/trackingService';

function TrackingDetails() {
    const { trackingId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [trackingData, setTrackingData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                setLoading(true);
                // Use tracking ID from params or location state
                const id = trackingId || location.state?.trackingId;

                if (!id) {
                    setError('No tracking ID provided');
                    setLoading(false);
                    return;
                }

                const data = await trackingService.getParcelStatus(id);
                setTrackingData(data);
                setError(null);
            } catch (err) {
                setError((err as Error).message || 'Failed to fetch tracking data');
            } finally {
                setLoading(false);
            }
        };

        fetchTrackingData();
    }, [trackingId, location.state]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111F35] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F63049] mb-4"></div>
                    <p className="text-white text-xl">Loading tracking details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#111F35] flex items-center justify-center px-4">
                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#F63049] rounded-xl p-8 max-w-md text-center">
                    <svg className="w-16 h-16 text-[#F63049] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/track')}
                        className="bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const getDelayRiskColor = (risk: string) => {
        switch (risk) {
            case 'Low': return 'text-green-400';
            case 'Medium': return 'text-yellow-400';
            case 'High': return 'text-[#F63049]';
            default: return 'text-gray-400';
        }
    };

    const getDelayRiskBg = (risk: string) => {
        switch (risk) {
            case 'Low': return 'bg-green-500 bg-opacity-20 border-green-500';
            case 'Medium': return 'bg-yellow-500 bg-opacity-20 border-yellow-500';
            case 'High': return 'bg-[#F63049] bg-opacity-20 border-[#F63049]';
            default: return 'bg-gray-500 bg-opacity-20 border-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/track')}
                        className="text-gray-400 hover:text-[#F63049] transition-colors duration-200 mb-4 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Track Parcel
                    </button>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        Parcel Tracking Details
                    </h1>
                    <p className="text-gray-300 text-lg">Track ID: <span className="font-semibold text-white">{trackingData?.trackingId}</span></p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Overview */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-white">Current Status</h2>
                                <span className="bg-[#F63049] text-white px-4 py-2 rounded-lg font-semibold">
                                    {trackingData?.currentStatus}
                                </span>
                            </div>
                            <p className="text-gray-300 text-lg">{trackingData?.statusDescription}</p>
                        </div>

                        {/* ETA & Delay Risk */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* ETA */}
                            <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <svg className="w-8 h-8 text-[#F63049] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-white">Estimated Delivery</h3>
                                </div>
                                <p className="text-3xl font-bold text-[#F63049] mb-2">
                                    {trackingData?.eta?.date}
                                </p>
                                <p className="text-gray-300">{trackingData?.eta?.time}</p>
                                <p className="text-sm text-gray-400 mt-3">
                                    Confidence: <span className="text-white font-semibold">{trackingData?.eta?.confidence}%</span>
                                </p>
                            </div>

                            {/* Delay Risk */}
                            <div className={`bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 rounded-xl p-6 shadow-lg ${getDelayRiskBg(trackingData?.delayRisk?.level)}`}>
                                <div className="flex items-center mb-4">
                                    <svg className="w-8 h-8 text-[#F63049] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-white">Delay Risk</h3>
                                </div>
                                <p className={`text-3xl font-bold mb-2 ${getDelayRiskColor(trackingData?.delayRisk?.level)}`}>
                                    {trackingData?.delayRisk?.level}
                                </p>
                                <p className="text-gray-300 text-sm">{trackingData?.delayRisk?.reason}</p>
                                {trackingData?.delayRisk?.factors && (
                                    <div className="mt-3 pt-3 border-t border-[#8A244B]">
                                        <p className="text-xs text-gray-400 mb-2">Contributing Factors:</p>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            {trackingData.delayRisk.factors.map((factor: string, index: number) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-[#F63049] mr-2">•</span>
                                                    {factor}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
                                <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                Tracking Timeline
                            </h2>
                            <TrackingTimeline trackingEvents={trackingData?.timeline} />
                        </div>

                        {/* Parcel Details */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 text-white">Parcel Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Weight</p>
                                    <p className="text-lg font-semibold text-white">{trackingData?.parcelDetails?.weight}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Dimensions</p>
                                    <p className="text-lg font-semibold text-white">{trackingData?.parcelDetails?.dimensions}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Sender</p>
                                    <p className="text-lg font-semibold text-white">{trackingData?.parcelDetails?.sender}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Recipient</p>
                                    <p className="text-lg font-semibold text-white">{trackingData?.parcelDetails?.recipient}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map & Actions */}
                    <div className="space-y-6">
                        {/* Live Location Map */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                                <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Live Location
                            </h2>
                            <MapView
                                currentLocation={trackingData?.currentLocation}
                                destinationLocation={trackingData?.destination}
                            />
                        </div>

                        {/* Current Location Details */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3 text-white">Current Location</h3>
                            <p className="text-gray-300 mb-2">{trackingData?.currentLocation?.facility}</p>
                            <p className="text-sm text-gray-400">{trackingData?.currentLocation?.address}</p>
                            <div className="mt-4 pt-4 border-t border-[#8A244B]">
                                <p className="text-sm text-gray-400">Last Updated</p>
                                <p className="text-white font-semibold">{trackingData?.lastUpdated}</p>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3 text-white">Delivery Address</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {trackingData?.destination?.street}<br />
                                {trackingData?.destination?.city}, {trackingData?.destination?.state}<br />
                                {trackingData?.destination?.pincode}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button className="w-full bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Status
                            </button>
                            <button className="w-full bg-transparent border-2 border-[#8A244B] hover:border-[#F63049] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Enable Notifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackingDetails;