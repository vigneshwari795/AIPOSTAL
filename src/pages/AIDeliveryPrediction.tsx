import { useState } from 'react';
import predictionService, { PredictionResult } from '../services/predictionService';

function AIDeliveryPrediction() {
    const [formData, setFormData] = useState({
        sourceAddress: '',
        destinationAddress: '',
        priority: 'Normal',
        trafficLevel: 'Low',
        weatherCondition: 'Clear'
    });

    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const trafficLevels = ['Low', 'Medium', 'High', 'Very High'];
    const weatherConditions = ['Clear', 'Rainy', 'Stormy', 'Foggy', 'Snowy'];
    const priorities = ['Normal', 'Express'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    const validateForm = () => {
        if (!formData.sourceAddress.trim()) {
            setError('Source address is required');
            return false;
        }
        if (!formData.destinationAddress.trim()) {
            setError('Destination address is required');
            return false;
        }
        return true;
    };

    const handlePredictETA = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const result = await predictionService.predictETA(formData);
            setPrediction(result);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to predict ETA. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk?.toUpperCase()) {
            case 'LOW': return 'bg-green-500 bg-opacity-20 text-green-400 border-green-500';
            case 'MEDIUM': return 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-500';
            case 'HIGH': return 'bg-red-500 bg-opacity-20 text-red-400 border-red-500';
            default: return 'bg-gray-500 bg-opacity-20 text-gray-400 border-gray-500';
        }
    };

    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-full mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        AI Delivery Prediction
                    </h1>
                    <p className="text-gray-300 text-xl">
                        Predict parcel delivery time using advanced machine learning analytics
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Delivery Details
                            </h2>

                            <div className="space-y-4">
                                {/* Source Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Source Address <span className="text-[#F63049]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="sourceAddress"
                                        value={formData.sourceAddress}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 123 MG Road, Bangalore, Karnataka"
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                    />
                                </div>

                                {/* Destination Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Destination Address <span className="text-[#F63049]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="destinationAddress"
                                        value={formData.destinationAddress}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 456 Andheri West, Mumbai, Maharashtra"
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                    />
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Parcel Priority
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F63049] transition-colors duration-200 cursor-pointer"
                                    >
                                        {priorities.map(priority => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Traffic Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Current Traffic Level
                                    </label>
                                    <select
                                        name="trafficLevel"
                                        value={formData.trafficLevel}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F63049] transition-colors duration-200 cursor-pointer"
                                    >
                                        {trafficLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Weather Condition */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Weather Condition
                                    </label>
                                    <select
                                        name="weatherCondition"
                                        value={formData.weatherCondition}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F63049] transition-colors duration-200 cursor-pointer"
                                    >
                                        {weatherConditions.map(condition => (
                                            <option key={condition} value={condition}>{condition}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mt-6 bg-red-500 bg-opacity-20 border-2 border-red-500 rounded-lg p-4 flex items-start">
                                    <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-white">{error}</p>
                                </div>
                            )}

                            {/* Predict Button */}
                            <button
                                onClick={handlePredictETA}
                                disabled={isLoading}
                                className="w-full mt-6 bg-[#F63049] hover:bg-[#D02752] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                                        AI Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Predict ETA
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Info Card */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                How AI Prediction Works
                            </h3>
                            <ul className="text-gray-300 text-sm space-y-2">
                                <li className="flex items-start">
                                    <span className="text-[#F63049] mr-2">•</span>
                                    <span>Analyzes historical delivery patterns and performance metrics</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#F63049] mr-2">•</span>
                                    <span>Evaluates real-time traffic conditions and congestion levels</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#F63049] mr-2">•</span>
                                    <span>Considers weather impact on delivery operations</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#F63049] mr-2">•</span>
                                    <span>Factors in parcel priority and operational constraints</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {!prediction && !isLoading && (
                            <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-12 shadow-lg text-center">
                                <svg className="w-24 h-24 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                    AI Prediction Ready
                                </h3>
                                <p className="text-gray-500">
                                    Enter delivery details and click "Predict ETA" to see results
                                </p>
                            </div>
                        )}

                        {prediction && (
                            <>
                                {/* Predicted ETA Card */}
                                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-lg">
                                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Predicted Delivery Time
                                    </h2>

                                    <div className="bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg p-6 mb-6 text-center">
                                        <p className="text-white text-sm mb-2">Expected Delivery</p>
                                        <p className="text-white text-4xl font-bold mb-2">
                                            {formatDateTime(prediction.predicted_eta)}
                                        </p>
                                        <p className="text-white text-lg opacity-90">
                                            {prediction.estimated_hours.toFixed(1)} hours from now
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-[#111F35] rounded-lg p-4 text-center">
                                            <p className="text-xs text-gray-400 mb-2">Distance</p>
                                            <p className="text-2xl font-bold text-white">{prediction.distance} km</p>
                                        </div>
                                        <div className={`rounded - lg p - 4 text - center border - 2 ${ getRiskColor(prediction.risk_level) } `}>
                                            <p className="text-xs mb-2 opacity-80">Delay Risk</p>
                                            <p className="text-2xl font-bold">{prediction.risk_level}</p>
                                        </div>
                                    </div>

                                    {/* Route Info */}
                                    <div className="bg-[#111F35] rounded-lg p-4 space-y-2">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-gray-400">From</p>
                                                <p className="text-white text-sm">{prediction.sourceAddress}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-gray-400">To</p>
                                                <p className="text-white text-sm">{prediction.destinationAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Confidence Interval */}
                                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Confidence Interval
                                    </h3>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                                            <span>Lower Bound</span>
                                            <span>Upper Bound</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-white mb-4">
                                            <span className="text-yellow-400">{prediction.confidence_interval.lower}%</span>
                                            <span className="text-green-400">{prediction.confidence_interval.upper}%</span>
                                        </div>
                                        <div className="relative h-4 bg-[#111F35] rounded-full overflow-hidden">
                                            <div
                                                className="absolute h-full bg-gradient-to-r from-yellow-500 via-green-500 to-green-400 rounded-full"
                                                style={{
                                                    left: `${ prediction.confidence_interval.lower }% `,
                                                    width: `${ prediction.confidence_interval.upper - prediction.confidence_interval.lower }% `
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="bg-[#111F35] rounded-lg p-4">
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            The AI model is {prediction.confidence_interval.lower}%–{prediction.confidence_interval.upper}% confident
                                            that the parcel will be delivered within the predicted timeframe based on current conditions and historical data.
                                        </p>
                                    </div>
                                </div>

                                {/* AI Explanation */}
                                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        AI Reasoning
                                    </h3>

                                    <div className="bg-[#F63049] bg-opacity-10 border border-[#F63049] rounded-lg p-5">
                                        <p className="text-white leading-relaxed">
                                            {prediction.explanation}
                                        </p>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="bg-[#111F35] rounded-lg p-3 text-center">
                                            <p className="text-xs text-gray-400 mb-1">Model Version</p>
                                            <p className="text-sm font-semibold text-white">DeliveryAI v2.1</p>
                                        </div>
                                        <div className="bg-[#111F35] rounded-lg p-3 text-center">
                                            <p className="text-xs text-gray-400 mb-1">Accuracy Rate</p>
                                            <p className="text-sm font-semibold text-green-400">94.7%</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIDeliveryPrediction;