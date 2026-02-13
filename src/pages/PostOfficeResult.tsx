import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PostOffice {
    id: string;
    name: string;
    branchCode: string;
    address: string;
    pincode: string;
    distanceFromSender: string;
    estimatedHandlingTime: string;
    workloadScore: number;
    deliverySuccessRate: number;
    avgDeliveryTime: string;
    operatingHours?: string;
    contact?: string;
    aiScore: number;
    reason?: string;
    reasoning?: {
        primary: string;
        factors: Array<{
            name: string;
            score: number;
            description: string;
        }>;
    };
    estimatedDelivery: {
        date: string;
        confidence?: string;
        range: string;
    };
}

function PostOfficeResult() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recommendedOffice, setRecommendedOffice] = useState<PostOffice | null>(null);
    const [alternativeOffices, setAlternativeOffices] = useState<PostOffice[]>([]);
    const [selectedOffice, setSelectedOffice] = useState<PostOffice | null>(null);
    const [showAlternatives, setShowAlternatives] = useState(false);

    // Get address data from navigation state
    const { sender, receiver } = location.state || {};

    useEffect(() => {
        if (!sender || !receiver) {
            setError('Address data is missing. Please go back and enter addresses.');
            setIsLoading(false);
            return;
        }

        fetchPostOfficeRecommendations();
    }, [sender, receiver]);

    // Mock API call to fetch AI-recommended post offices
    const fetchPostOfficeRecommendations = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2500));

            // Mock AI recommendation response
            const mockResponse = {
                recommended: {
                    id: 'PO001',
                    name: sender?.city ? `${sender.city} Central Post Office` : 'Central Post Office',
                    branchCode: 'CPO-' + Math.floor(Math.random() * 9000 + 1000),
                    address: sender?.city ? `Main Road, ${sender.city}, ${sender.state}` : 'Main Road, City Center',
                    pincode: sender?.pincode !== 'Not detected' ? sender.pincode : '400001',
                    distanceFromSender: `${(Math.random() * 5 + 0.5).toFixed(1)} km`,
                    estimatedHandlingTime: '2-3 hours',
                    workloadScore: 85,
                    deliverySuccessRate: 97.5,
                    avgDeliveryTime: '3-4 days',
                    operatingHours: '9:00 AM - 6:00 PM',
                    contact: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
                    aiScore: 94,
                    reasoning: {
                        primary: 'Optimal balance of proximity, low workload, and high delivery success rate',
                        factors: [
                            {
                                name: 'Distance Optimization',
                                score: 95,
                                description: 'Closest post office to sender location, minimizing initial transit time'
                            },
                            {
                                name: 'Workload Analysis',
                                score: 85,
                                description: 'Current workload is below capacity, ensuring faster processing'
                            },
                            {
                                name: 'Delivery Performance',
                                score: 98,
                                description: 'Consistently high success rate for deliveries to receiver area'
                            },
                            {
                                name: 'Route Efficiency',
                                score: 92,
                                description: 'Direct delivery route available to destination with minimal transfers'
                            }
                        ]
                    },
                    estimatedDelivery: {
                        date: getEstimatedDate(3),
                        confidence: 'High',
                        range: '3-4 days'
                    }
                },
                alternatives: [
                    {
                        id: 'PO002',
                        name: sender?.city ? `${sender.city} East Post Office` : 'East Post Office',
                        branchCode: 'EPO-' + Math.floor(Math.random() * 9000 + 1000),
                        address: sender?.city ? `East Avenue, ${sender.city}, ${sender.state}` : 'East Avenue',
                        pincode: sender?.pincode !== 'Not detected' ? sender.pincode : '400002',
                        distanceFromSender: `${(Math.random() * 5 + 2).toFixed(1)} km`,
                        estimatedHandlingTime: '3-4 hours',
                        workloadScore: 72,
                        deliverySuccessRate: 94.2,
                        avgDeliveryTime: '4-5 days',
                        aiScore: 87,
                        reason: 'Slightly farther but handles high-priority parcels efficiently',
                        estimatedDelivery: {
                            date: getEstimatedDate(4),
                            range: '4-5 days'
                        }
                    },
                    {
                        id: 'PO003',
                        name: sender?.city ? `${sender.city} West Post Office` : 'West Post Office',
                        branchCode: 'WPO-' + Math.floor(Math.random() * 9000 + 1000),
                        address: sender?.city ? `West Street, ${sender.city}, ${sender.state}` : 'West Street',
                        pincode: sender?.pincode !== 'Not detected' ? sender.pincode : '400003',
                        distanceFromSender: `${(Math.random() * 5 + 3).toFixed(1)} km`,
                        estimatedHandlingTime: '2-3 hours',
                        workloadScore: 68,
                        deliverySuccessRate: 92.8,
                        avgDeliveryTime: '4-5 days',
                        aiScore: 83,
                        reason: 'Good alternative with specialized handling for fragile items',
                        estimatedDelivery: {
                            date: getEstimatedDate(5),
                            range: '4-5 days'
                        }
                    }
                ]
            };

            setRecommendedOffice(mockResponse.recommended);
            setSelectedOffice(mockResponse.recommended);
            setAlternativeOffices(mockResponse.alternatives);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch post office recommendations. Please try again.');
            setIsLoading(false);
        }
    };

    const getEstimatedDate = (daysToAdd: number) => {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleConfirmBooking = () => {
        navigate('/tracking-details', {
            state: {
                sender,
                receiver,
                postOffice: selectedOffice,
                trackingId: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
            }
        });
    };

    const handleSelectAlternative = (office: PostOffice) => {
        setSelectedOffice(office);
        setShowAlternatives(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 75) return 'text-yellow-400';
        return 'text-orange-400';
    };

    const getScoreBarColor = (score: number) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 75) return 'bg-yellow-500';
        return 'bg-orange-500';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#111F35] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#F63049] mb-6"></div>
                    <h2 className="text-white text-2xl font-semibold mb-2">AI Processing...</h2>
                    <p className="text-gray-300 text-lg">Analyzing optimal post office for your delivery</p>
                    <div className="mt-6 max-w-md mx-auto space-y-2">
                        <div className="flex items-center text-gray-400 text-sm">
                            <div className="w-4 h-4 border-2 border-[#F63049] rounded-full mr-3 animate-pulse"></div>
                            Calculating distance matrix
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <div className="w-4 h-4 border-2 border-[#F63049] rounded-full mr-3 animate-pulse"></div>
                            Evaluating workload distribution
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <div className="w-4 h-4 border-2 border-[#F63049] rounded-full mr-3 animate-pulse"></div>
                            Analyzing delivery success patterns
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#111F35] flex items-center justify-center px-4">
                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-8 max-w-md text-center">
                    <svg className="w-20 h-20 text-[#F63049] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-white mb-3">Error</h2>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/book')}
                        className="bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    >
                        Go Back to Booking
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/book')}
                        className="text-gray-400 hover:text-[#F63049] transition-colors duration-200 mb-4 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Address Entry
                    </button>
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        AI Post Office Recommendation
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Optimal post office identified based on multi-factor analysis
                    </p>
                </div>

                {/* Success Banner */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 bg-opacity-20 border-2 border-green-500 rounded-xl p-4 mb-8 flex items-center">
                    <svg className="w-8 h-8 text-green-400 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-white font-semibold text-lg">Post Office Successfully Identified</p>
                        <p className="text-green-200 text-sm">AI confidence score: {selectedOffice?.aiScore}% • Based on 4 optimization factors</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recommended Post Office Card */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-2xl">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-xl flex items-center justify-center mr-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-sm text-[#F63049] font-semibold uppercase tracking-wide">
                                            {selectedOffice?.id === recommendedOffice?.id ? '★ AI Recommended' : 'Alternative Selection'}
                                        </span>
                                        <h2 className="text-2xl font-bold text-white">{selectedOffice?.name}</h2>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-lg border-2 ${getScoreColor(selectedOffice?.aiScore || 0)} border-current bg-opacity-20`}>
                                    <p className="text-xs font-semibold">AI Score</p>
                                    <p className="text-2xl font-bold">{selectedOffice?.aiScore}</p>
                                </div>
                            </div>

                            {/* Post Office Details Grid */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#111F35] rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Branch Code</p>
                                    </div>
                                    <p className="text-lg font-semibold text-white">{selectedOffice?.branchCode}</p>
                                </div>

                                <div className="bg-[#111F35] rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Distance from Sender</p>
                                    </div>
                                    <p className="text-lg font-semibold text-white">{selectedOffice?.distanceFromSender}</p>
                                </div>

                                <div className="bg-[#111F35] rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Handling Time</p>
                                    </div>
                                    <p className="text-lg font-semibold text-white">{selectedOffice?.estimatedHandlingTime}</p>
                                </div>

                                <div className="bg-[#111F35] rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-400">Success Rate</p>
                                    </div>
                                    <p className="text-lg font-semibold text-white">{selectedOffice?.deliverySuccessRate}%</p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-3 pt-4 border-t border-[#8A244B]">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Full Address:</span>
                                    <span className="text-white font-medium text-right">{selectedOffice?.address}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Pincode:</span>
                                    <span className="text-white font-medium">{selectedOffice?.pincode}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Operating Hours:</span>
                                    <span className="text-white font-medium">{selectedOffice?.operatingHours}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Contact:</span>
                                    <span className="text-white font-medium">{selectedOffice?.contact}</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Reasoning Panel */}
                        {selectedOffice?.id === recommendedOffice?.id && recommendedOffice?.reasoning && (
                            <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <svg className="w-6 h-6 text-[#F63049] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-white">AI Selection Reasoning</h3>
                                </div>

                                <div className="bg-[#F63049] bg-opacity-10 border border-[#F63049] rounded-lg p-4 mb-6">
                                    <p className="text-white font-medium">{recommendedOffice.reasoning.primary}</p>
                                </div>

                                <div className="space-y-4">
                                    {recommendedOffice.reasoning.factors.map((factor, index) => (
                                        <div key={index} className="bg-[#111F35] rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-white font-semibold">{factor.name}</h4>
                                                <span className={`text-lg font-bold ${getScoreColor(factor.score)}`}>
                                                    {factor.score}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-[#8A244B] rounded-full h-2 mb-3">
                                                <div
                                                    className={`h-2 rounded-full ${getScoreBarColor(factor.score)} transition-all duration-500`}
                                                    style={{ width: `${factor.score}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-gray-300 text-sm">{factor.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Alternative Post Offices */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white flex items-center">
                                    <svg className="w-6 h-6 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    Alternative Post Offices
                                </h3>
                                <button
                                    onClick={() => setShowAlternatives(!showAlternatives)}
                                    className="text-[#F63049] hover:text-[#D02752] font-semibold transition-colors duration-200 flex items-center"
                                >
                                    {showAlternatives ? 'Hide' : 'Show'}
                                    <svg className={`w-5 h-5 ml-1 transform transition-transform duration-200 ${showAlternatives ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {showAlternatives && (
                                <div className="space-y-4">
                                    {alternativeOffices.map((office, index) => (
                                        <div
                                            key={office.id}
                                            className="bg-[#111F35] border border-[#8A244B] hover:border-[#F63049] rounded-lg p-5 transition-all duration-200 cursor-pointer"
                                            onClick={() => handleSelectAlternative(office)}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-white mb-1">{office.name}</h4>
                                                    <p className="text-sm text-gray-400">{office.address}</p>
                                                </div>
                                                <div className="ml-4">
                                                    <div className={`px-3 py-1 rounded-lg border ${getScoreColor(office.aiScore)} border-current bg-opacity-20 text-center`}>
                                                        <p className="text-xs font-semibold">Score</p>
                                                        <p className="text-xl font-bold">{office.aiScore}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 mb-3">
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400 mb-1">Distance</p>
                                                    <p className="text-sm font-semibold text-white">{office.distanceFromSender}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400 mb-1">Workload</p>
                                                    <p className="text-sm font-semibold text-white">{office.workloadScore}%</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400 mb-1">Success</p>
                                                    <p className="text-sm font-semibold text-white">{office.deliverySuccessRate}%</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start bg-[#8A244B] bg-opacity-30 rounded p-3">
                                                <svg className="w-4 h-4 text-[#F63049] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-xs text-gray-300">{office.reason}</p>
                                            </div>

                                            <button className="mt-3 w-full bg-transparent border border-[#F63049] hover:bg-[#F63049] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm">
                                                Select This Post Office
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Estimated Delivery Card */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-lg sticky top-6">
                            <div className="flex items-center mb-4">
                                <svg className="w-8 h-8 text-[#F63049] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-white">Estimated Delivery</h3>
                            </div>

                            <div className="bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg p-6 mb-4 text-center">
                                <p className="text-white text-sm mb-2">Expected by</p>
                                <p className="text-white text-3xl font-bold mb-1">{selectedOffice?.estimatedDelivery?.date}</p>
                                <p className="text-white text-sm opacity-80">{selectedOffice?.estimatedDelivery?.range}</p>
                            </div>

                            <div className="bg-[#111F35] rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Confidence Level</span>
                                    <span className="text-sm font-semibold text-green-400">
                                        {selectedOffice?.estimatedDelivery?.confidence || 'High'}
                                    </span>
                                </div>
                                <div className="w-full bg-[#8A244B] rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-sm">
                                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">Real-time tracking available</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">SMS & email notifications</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">Safe & secure delivery</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleConfirmBooking}
                                    className="w-full bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                                >
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Confirm & Book Parcel
                                </button>

                                {!showAlternatives && (
                                    <button
                                        onClick={() => setShowAlternatives(true)}
                                        className="w-full bg-transparent border-2 border-[#8A244B] hover:border-[#F63049] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                                    >
                                        Choose Another Post Office
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Route Summary */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 text-[#F63049] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Route Summary
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-400">From</p>
                                        <p className="text-white font-medium">{sender?.city || 'Sender Location'}</p>
                                    </div>
                                </div>

                                <div className="ml-4 border-l-2 border-dashed border-[#8A244B] h-6"></div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#F63049] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-400">Via</p>
                                        <p className="text-white font-medium">{selectedOffice?.name}</p>
                                    </div>
                                </div>

                                <div className="ml-4 border-l-2 border-dashed border-[#8A244B] h-6"></div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-400">To</p>
                                        <p className="text-white font-medium">{receiver?.city || 'Receiver Location'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostOfficeResult;