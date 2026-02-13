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
                    <p className="text-white text-xl font-medium tracking-wide">Loading tracking details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#111F35] flex items-center justify-center px-4">
                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#F63049] rounded-xl p-10 max-w-md text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[#F63049] opacity-10 rounded-full blur-2xl"></div>
                    <svg className="w-20 h-20 text-[#F63049] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-white mb-2">Error</h2>
                    <p className="text-gray-300 mb-8 text-lg">{error}</p>
                    <button
                        onClick={() => navigate('/track')}
                        className="bg-[#F63049] hover:bg-[#D02752] text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
            case 'Low': return 'bg-green-500 bg-opacity-10 border-green-500';
            case 'Medium': return 'bg-yellow-500 bg-opacity-10 border-yellow-500';
            case 'High': return 'bg-[#F63049] bg-opacity-10 border-[#F63049]';
            default: return 'bg-gray-500 bg-opacity-10 border-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <button
                        onClick={() => navigate('/track')}
                        className="text-gray-400 hover:text-[#F63049] transition-colors duration-200 mb-6 flex items-center group font-medium"
                    >
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Track Parcel
                    </button>
                    <div className="flex flex-col md:flex-row md:items-end justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                                Tracking Details
                            </h1>
                            <p className="text-gray-400 text-lg flex items-center">
                                Tracking ID: <span className="font-mono font-semibold text-white ml-2 bg-[#8A244B] bg-opacity-30 px-3 py-1 rounded text-base border border-[#8A244B] border-opacity-50">{trackingData?.trackingId}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Overview */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#1e2d4a] border-l-4 border-l-[#F63049] rounded-r-xl p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F63049] opacity-5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10">
                                <div>
                                    <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Current Status</h2>
                                    <h3 className="text-3xl font-bold text-white">{trackingData?.currentStatus}</h3>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#F63049] text-[#F63049] bg-[#F63049] bg-opacity-10 text-sm font-bold animate-pulse">
                                        <span className="w-2 h-2 rounded-full bg-[#F63049] mr-2"></span>
                                        Live Updates
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-lg border-t border-gray-700 pt-4 mt-2">{trackingData?.statusDescription}</p>
                        </div>

                        {/* ETA & Delay Risk */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* ETA */}
                            <div className="bg-[#111F35] border border-[#8A244B] rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-[#F63049] transition-colors duration-300">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 opacity-5 rounded-full blur-xl -mr-5 -mt-5"></div>
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-blue-500 bg-opacity-10 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Estimated Delivery</h3>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">
                                    {trackingData?.eta?.date}
                                </p>
                                <p className="text-blue-400 font-medium mb-4">{trackingData?.eta?.time}</p>
                                <div className="w-full bg-[#0d1829] rounded-full h-2 mb-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${trackingData?.eta?.confidence}%` }}></div>
                                </div>
                                <p className="text-xs text-gray-400 text-right">
                                    Confidence: <span className="text-white font-medium">{trackingData?.eta?.confidence}%</span>
                                </p>
                            </div>

                            {/* Delay Risk */}
                            <div className={`rounded-xl p-6 shadow-lg border transition-all duration-300 ${getDelayRiskBg(trackingData?.delayRisk?.level)}`}>
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-opacity-20 rounded-lg mr-4 bg-current text-white">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Delay Risk</h3>
                                </div>
                                <div className="flex items-baseline mb-2">
                                    <p className={`text-3xl font-bold ${getDelayRiskColor(trackingData?.delayRisk?.level)}`}>
                                        {trackingData?.delayRisk?.level}
                                    </p>
                                </div>
                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{trackingData?.delayRisk?.reason}</p>
                                {trackingData?.delayRisk?.factors && (
                                    <div className="space-y-2">
                                        {trackingData.delayRisk.factors.map((factor: string, index: number) => (
                                            <div key={index} className="flex items-center text-xs text-gray-400 bg-[#0d1829] bg-opacity-50 px-3 py-2 rounded border border-white border-opacity-5">
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getDelayRiskColor(trackingData?.delayRisk?.level).replace('text-', 'bg-')}`}></span>
                                                {factor}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-[#111F35] border border-[#8A244B] rounded-xl p-8 shadow-lg relative">
                            <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
                                <span className="bg-[#F63049] w-1 h-8 mr-4 rounded-full"></span>
                                Tracking History
                            </h2>
                            <TrackingTimeline trackingEvents={trackingData?.timeline} />
                        </div>

                        {/* Parcel Details */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#1e2d4a] border border-[#8A244B] rounded-xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
                                <span className="bg-[#F63049] w-1 h-8 mr-4 rounded-full"></span>
                                Parcel Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-[#0d1829] p-5 rounded-lg border border-[#8A244B] border-opacity-30">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Weight</p>
                                    </div>
                                    <p className="text-xl font-semibold text-white">{trackingData?.parcelDetails?.weight}</p>
                                </div>
                                <div className="bg-[#0d1829] p-5 rounded-lg border border-[#8A244B] border-opacity-30">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Dimensions</p>
                                    </div>
                                    <p className="text-xl font-semibold text-white">{trackingData?.parcelDetails?.dimensions}</p>
                                </div>
                                <div className="bg-[#0d1829] p-5 rounded-lg border border-[#8A244B] border-opacity-30">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Sender</p>
                                    </div>
                                    <p className="text-xl font-semibold text-white">{trackingData?.parcelDetails?.sender}</p>
                                </div>
                                <div className="bg-[#0d1829] p-5 rounded-lg border border-[#8A244B] border-opacity-30">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Recipient</p>
                                    </div>
                                    <p className="text-xl font-semibold text-white">{trackingData?.parcelDetails?.recipient}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map & Actions */}
                    <div className="space-y-8">
                        {/* Live Location Map */}
                        <div className="bg-[#111F35] border border-[#F63049] rounded-xl p-6 shadow-xl relative overflow-hidden">
                            <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-[#F63049] flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                Live Location
                            </h2>
                            <div className="rounded-lg overflow-hidden border border-[#8A244B] border-opacity-50">
                                <MapView
                                    currentLocation={trackingData?.currentLocation}
                                    destinationLocation={trackingData?.destination}
                                />
                            </div>
                        </div>

                        {/* Current Location Details */}
                        <div className="bg-[#111F35] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider text-sm flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F63049] mr-2"></span>
                                Current Location
                            </h3>
                            <div className="pl-4 border-l-2 border-[#8A244B] border-opacity-30">
                                <p className="text-white text-lg font-medium mb-1">{trackingData?.currentLocation?.facility}</p>
                                <p className="text-gray-400 text-sm mb-4">{trackingData?.currentLocation?.address}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                                <span className="text-xs text-gray-500 uppercase font-semibold">Last Updated</span>
                                <span className="text-white font-mono text-sm">{trackingData?.lastUpdated}</span>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-[#111F35] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider text-sm flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F63049] mr-2"></span>
                                Destination
                            </h3>
                            <div className="pl-4 border-l-2 border-[#8A244B] border-opacity-30">
                                <p className="text-gray-300 leading-relaxed">
                                    <span className="block text-white font-medium mb-1">{trackingData?.destination?.street}</span>
                                    {trackingData?.destination?.city}, {trackingData?.destination?.state}<br />
                                    {trackingData?.destination?.pincode}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <button className="w-full bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Status
                            </button>
                            <button className="w-full bg-[#111F35] border-2 border-[#8A244B] hover:border-[#F63049] text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center hover:bg-[#8A244B] hover:bg-opacity-10">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Get Notifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackingDetails;