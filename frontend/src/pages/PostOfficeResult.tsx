import { useNavigate, useLocation } from 'react-router-dom';
import MapView from '../components/MapView';

function PostOfficeResult() {
    const navigate = useNavigate();
    const location = useLocation();

    // Sample data - in real app, this would come from location.state or API
    const resultData = location.state || {
        address: {
            street: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            country: 'India'
        },
        postOffice: {
            name: 'Mumbai Central Post Office',
            address: '456 Post Office Road, Mumbai, Maharashtra 400008',
            code: 'MH-MC-001',
            phone: '+91 22 2345 6789',
            hours: '9:00 AM - 6:00 PM'
        },
        distance: '2.4 km',
        estimatedTime: '15 mins',
        trackingId: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    const handleProceed = () => {
        navigate('/track', { state: { trackingId: resultData.trackingId } });
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-full mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        Post Office Identified
                    </h1>
                    <p className="text-gray-300 text-lg">
                        AI has successfully matched your delivery address
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Details */}
                    <div className="space-y-6">
                        {/* Address Summary */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
                                <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Delivery Address
                            </h2>
                            <div className="space-y-2 text-gray-300">
                                <p className="text-lg">{resultData.address.street}</p>
                                <p>{resultData.address.city}, {resultData.address.state}</p>
                                <p>{resultData.address.pincode}, {resultData.address.country}</p>
                            </div>
                        </div>

                        {/* Assigned Post Office */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
                                <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Assigned Post Office
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#F63049] mb-1">
                                        {resultData.postOffice.name}
                                    </h3>
                                    <p className="text-gray-300">{resultData.postOffice.address}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#8A244B]">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Office Code</p>
                                        <p className="font-semibold text-white">{resultData.postOffice.code}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                                        <p className="font-semibold text-white">{resultData.postOffice.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Working Hours</p>
                                        <p className="font-semibold text-white">{resultData.postOffice.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Distance & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg text-center">
                                <div className="text-3xl font-bold text-[#F63049] mb-2">
                                    {resultData.distance}
                                </div>
                                <p className="text-gray-300">Distance</p>
                            </div>
                            <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg text-center">
                                <div className="text-3xl font-bold text-[#F63049] mb-2">
                                    {resultData.estimatedTime}
                                </div>
                                <p className="text-gray-300">Est. Travel Time</p>
                            </div>
                        </div>

                        {/* Tracking ID */}
                        <div className="bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white opacity-80 mb-1">Tracking ID Generated</p>
                                    <p className="text-2xl font-bold text-white">{resultData.trackingId}</p>
                                </div>
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-white">Location Map</h2>
                            <MapView
                                sourceLocation={{ lat: 19.0760, lng: 72.8777 }}
                                destinationLocation={{ lat: 19.0800, lng: 72.8800 }}
                            />
                        </div>

                        {/* Proceed Button */}
                        <button
                            onClick={handleProceed}
                            className="w-full bg-[#F63049] hover:bg-[#D02752] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                        >
                            <span>Proceed to Tracking</span>
                            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-transparent border-2 border-[#8A244B] hover:border-[#F63049] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostOfficeResult;