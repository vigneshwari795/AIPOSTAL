import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookParcel() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        senderAddress: '',
        senderCity: '',
        senderState: '',
        senderPincode: '',
        receiverAddress: '',
        receiverCity: '',
        receiverState: '',
        receiverPincode: ''
    });

    const [parsedData, setParsedData] = useState({
        sender: null,
        receiver: null
    });

    const [confidence, setConfidence] = useState({
        sender: null,
        receiver: null
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeSection, setActiveSection] = useState('sender');
    const [showParsedResults, setShowParsedResults] = useState(false);

    // Mock AI API call to parse address
    const parseAddressWithAI = async (address, city, state, pincode) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock AI parsing logic
        const words = address.toLowerCase().split(' ');
        const hasStreet = words.some(w => ['street', 'road', 'avenue', 'lane', 'st', 'rd'].includes(w));
        const hasNumber = /\d+/.test(address);
        const hasCity = city && city.length > 0;
        const hasState = state && state.length > 0;
        const hasPincode = pincode && /^\d{6}$/.test(pincode);

        // Calculate confidence
        let confidenceScore = 0;
        const issues = [];
        const suggestions = [];

        if (hasStreet) confidenceScore += 20;
        else {
            issues.push('street_name');
            suggestions.push('Add street name (e.g., Main Street, MG Road)');
        }

        if (hasNumber) confidenceScore += 20;
        else {
            issues.push('building_number');
            suggestions.push('Include building/house number');
        }

        if (hasCity) confidenceScore += 20;
        else {
            issues.push('city');
            suggestions.push('City name is required');
        }

        if (hasState) confidenceScore += 20;
        else {
            issues.push('state');
            suggestions.push('State name is required');
        }

        if (hasPincode) confidenceScore += 20;
        else {
            issues.push('pincode');
            suggestions.push('Valid 6-digit pincode recommended');
        }

        // Extract components
        const parsedCity = city || 'Not detected';
        const parsedState = state || 'Not detected';
        const parsedPincode = pincode || 'Not detected';

        // Extract street and building
        const numberMatch = address.match(/\d+/);
        const buildingNumber = numberMatch ? numberMatch[0] : 'Not detected';

        const streetMatch = address.match(/([\w\s]+(?:street|road|avenue|lane|st|rd|nagar|colony|sector))/i);
        const street = streetMatch ? streetMatch[0] : address.split(',')[0] || 'Not detected';

        const confidenceLevel = confidenceScore >= 80 ? 'High' : confidenceScore >= 60 ? 'Medium' : 'Low';

        return {
            parsed: {
                fullAddress: address,
                buildingNumber,
                street,
                city: parsedCity,
                state: parsedState,
                pincode: parsedPincode,
                standardized: `${buildingNumber !== 'Not detected' ? buildingNumber + ', ' : ''}${street !== 'Not detected' ? street + ', ' : ''}${parsedCity}, ${parsedState}${parsedPincode !== 'Not detected' ? ' - ' + parsedPincode : ''}`
            },
            confidence: {
                level: confidenceLevel,
                score: confidenceScore,
                issues,
                suggestions
            },
            coordinates: {
                lat: 19.0760 + (Math.random() - 0.5) * 0.1,
                lng: 72.8777 + (Math.random() - 0.5) * 0.1
            }
        };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-fill city and state from address (simple logic)
        if (name === 'senderAddress' || name === 'receiverAddress') {
            const prefix = name.startsWith('sender') ? 'sender' : 'receiver';
            const cityMatch = value.match(/,\s*([A-Za-z\s]+),/);
            const stateMatch = value.match(/,\s*([A-Za-z\s]+)(?:\s*-?\s*\d{6})?$/);

            if (cityMatch && cityMatch[1]) {
                setFormData(prev => ({
                    ...prev,
                    [`${prefix}City`]: cityMatch[1].trim()
                }));
            }

            if (stateMatch && stateMatch[1] && !cityMatch) {
                setFormData(prev => ({
                    ...prev,
                    [`${prefix}State`]: stateMatch[1].trim()
                }));
            }
        }

        // Clear errors for this field
        setErrors(prev => ({
            ...prev,
            [name]: null
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.senderAddress.trim()) {
            newErrors.senderAddress = 'Sender address is required';
        }

        if (!formData.receiverAddress.trim()) {
            newErrors.receiverAddress = 'Receiver address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleParseAddress = async () => {
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);
        setShowParsedResults(false);

        try {
            // Parse both addresses
            const [senderResult, receiverResult] = await Promise.all([
                parseAddressWithAI(
                    formData.senderAddress,
                    formData.senderCity,
                    formData.senderState,
                    formData.senderPincode
                ),
                parseAddressWithAI(
                    formData.receiverAddress,
                    formData.receiverCity,
                    formData.receiverState,
                    formData.receiverPincode
                )
            ]);

            setParsedData({
                sender: senderResult.parsed,
                receiver: receiverResult.parsed
            });

            setConfidence({
                sender: senderResult.confidence,
                receiver: receiverResult.confidence
            });

            setShowParsedResults(true);
        } catch (error) {
            setErrors({ general: 'Failed to parse addresses. Please try again.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleProceed = () => {
        navigate('/post-office-result', {
            state: {
                sender: parsedData.sender,
                receiver: parsedData.receiver,
                confidence: confidence
            }
        });
    };

    const getConfidenceColor = (level) => {
        switch (level) {
            case 'High': return 'text-green-400 bg-green-500 bg-opacity-20 border-green-500';
            case 'Medium': return 'text-yellow-400 bg-yellow-500 bg-opacity-20 border-yellow-500';
            case 'Low': return 'text-[#F63049] bg-[#F63049] bg-opacity-20 border-[#F63049]';
            default: return 'text-gray-400 bg-gray-500 bg-opacity-20 border-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        Book Parcel with AI Address Understanding
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Enter addresses in natural language - AI will parse and standardize them
                    </p>
                </div>

                {/* General Error */}
                {errors.general && (
                    <div className="bg-[#F63049] bg-opacity-20 border-2 border-[#F63049] rounded-xl p-4 mb-6 flex items-start">
                        <svg className="w-6 h-6 text-[#F63049] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-white">{errors.general}</p>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Address Input Forms */}
                    <div className="space-y-6">
                        {/* Sender Address */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Sender Address</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Address <span className="text-[#F63049]">*</span>
                                    </label>
                                    <textarea
                                        name="senderAddress"
                                        value={formData.senderAddress}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 123 MG Road, Near City Mall, Bangalore, Karnataka 560001"
                                        rows="4"
                                        className={`w-full bg-[#111F35] border ${errors.senderAddress ? 'border-[#F63049]' : 'border-[#8A244B]'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200 resize-none`}
                                    />
                                    {errors.senderAddress && (
                                        <p className="text-[#F63049] text-sm mt-2">{errors.senderAddress}</p>
                                    )}
                                    <p className="text-gray-400 text-xs mt-2">
                                        💡 Write naturally - AI will understand various formats
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            City (auto-filled)
                                        </label>
                                        <input
                                            type="text"
                                            name="senderCity"
                                            value={formData.senderCity}
                                            onChange={handleInputChange}
                                            placeholder="Bangalore"
                                            className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            State (auto-filled)
                                        </label>
                                        <input
                                            type="text"
                                            name="senderState"
                                            value={formData.senderState}
                                            onChange={handleInputChange}
                                            placeholder="Karnataka"
                                            className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Pincode (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="senderPincode"
                                        value={formData.senderPincode}
                                        onChange={handleInputChange}
                                        placeholder="560001"
                                        maxLength="6"
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Receiver Address */}
                        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Receiver Address</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Address <span className="text-[#F63049]">*</span>
                                    </label>
                                    <textarea
                                        name="receiverAddress"
                                        value={formData.receiverAddress}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Flat 456, Sapphire Heights, Andheri West, Mumbai, Maharashtra 400053"
                                        rows="4"
                                        className={`w-full bg-[#111F35] border ${errors.receiverAddress ? 'border-[#F63049]' : 'border-[#8A244B]'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200 resize-none`}
                                    />
                                    {errors.receiverAddress && (
                                        <p className="text-[#F63049] text-sm mt-2">{errors.receiverAddress}</p>
                                    )}
                                    <p className="text-gray-400 text-xs mt-2">
                                        💡 Include landmarks for better accuracy
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            City (auto-filled)
                                        </label>
                                        <input
                                            type="text"
                                            name="receiverCity"
                                            value={formData.receiverCity}
                                            onChange={handleInputChange}
                                            placeholder="Mumbai"
                                            className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            State (auto-filled)
                                        </label>
                                        <input
                                            type="text"
                                            name="receiverState"
                                            value={formData.receiverState}
                                            onChange={handleInputChange}
                                            placeholder="Maharashtra"
                                            className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Pincode (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="receiverPincode"
                                        value={formData.receiverPincode}
                                        onChange={handleInputChange}
                                        placeholder="400053"
                                        maxLength="6"
                                        className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Parse Button */}
                        <button
                            onClick={handleParseAddress}
                            disabled={isProcessing}
                            className="w-full bg-[#F63049] hover:bg-[#D02752] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                                    AI Processing Addresses...
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Parse with AI
                                </>
                            )}
                        </button>
                    </div>

                    {/* Parsed Results */}
                    <div className="space-y-6">
                        {!showParsedResults && !isProcessing && (
                            <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-12 shadow-lg text-center">
                                <svg className="w-20 h-20 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                    AI Address Parser Ready
                                </h3>
                                <p className="text-gray-500">
                                    Enter addresses and click "Parse with AI" to see results
                                </p>
                            </div>
                        )}

                        {showParsedResults && parsedData.sender && (
                            <>
                                {/* Sender Parsed Result */}
                                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-white">Sender - Parsed Address</h3>
                                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getConfidenceColor(confidence.sender?.level)}`}>
                                            {confidence.sender?.level} Confidence ({confidence.sender?.score}%)
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="bg-[#111F35] rounded-lg p-4">
                                            <p className="text-sm text-gray-400 mb-1">Standardized Address</p>
                                            <p className="text-white font-medium">{parsedData.sender.standardized}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Building No.</p>
                                                <p className={`text-sm font-semibold ${parsedData.sender.buildingNumber === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.sender.buildingNumber}
                                                </p>
                                            </div>
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Street</p>
                                                <p className={`text-sm font-semibold ${parsedData.sender.street === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.sender.street}
                                                </p>
                                            </div>
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">City</p>
                                                <p className={`text-sm font-semibold ${parsedData.sender.city === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.sender.city}
                                                </p>
                                            </div>
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">State</p>
                                                <p className={`text-sm font-semibold ${parsedData.sender.state === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.sender.state}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {confidence.sender?.suggestions.length > 0 && (
                                        <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4">
                                            <p className="text-yellow-400 text-sm font-semibold mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                Suggestions for improvement:
                                            </p>
                                            <ul className="text-gray-300 text-sm space-y-1">
                                                {confidence.sender.suggestions.map((suggestion, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-yellow-400 mr-2">•</span>
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Receiver Parsed Result */}
                                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#F63049] rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-white">Receiver - Parsed Address</h3>
                                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getConfidenceColor(confidence.receiver?.level)}`}>
                                            {confidence.receiver?.level} Confidence ({confidence.receiver?.score}%)
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="bg-[#111F35] rounded-lg p-4">
                                            <p className="text-sm text-gray-400 mb-1">Standardized Address</p>
                                            <p className="text-white font-medium">{parsedData.receiver.standardized}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Building No.</p>
                                                <p className={`text-sm font-semibold ${parsedData.receiver.buildingNumber === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.receiver.buildingNumber}
                                                </p>
                                            </div>
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Street</p>
                                                <p className={`text-sm font-semibold ${parsedData.receiver.street === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.receiver.street}
                                                </p>
                                            </div>
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">City</p>
                                                <p className={`text-sm font-semibold ${parsedData.receiver.city === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.receiver.city}
                                                </p>
                                            </div>
                                            <div className="bg-[#111F35] rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">State</p>
                                                <p className={`text-sm font-semibold ${parsedData.receiver.state === 'Not detected' ? 'text-yellow-400' : 'text-white'}`}>
                                                    {parsedData.receiver.state}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {confidence.receiver?.suggestions.length > 0 && (
                                        <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4">
                                            <p className="text-yellow-400 text-sm font-semibold mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                Suggestions for improvement:
                                            </p>
                                            <ul className="text-gray-300 text-sm space-y-1">
                                                {confidence.receiver.suggestions.map((suggestion, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-yellow-400 mr-2">•</span>
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Map Preview */}
                                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-[#F63049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        Detected Location Preview
                                    </h3>
                                    <div className="bg-[#111F35] rounded-lg h-64 flex items-center justify-center border border-[#8A244B]">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-gray-400">Map preview placeholder</p>
                                            <p className="text-gray-500 text-sm mt-2">Receiver location would be displayed here</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Proceed Button */}
                                <button
                                    onClick={handleProceed}
                                    className="w-full bg-[#F63049] hover:bg-[#D02752] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                                >
                                    <span>Proceed to Identify Post Office</span>
                                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookParcel;