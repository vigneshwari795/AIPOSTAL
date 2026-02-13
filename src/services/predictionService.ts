import axios from 'axios';

export interface PredictionResult {
    predicted_eta: string;
    estimated_hours: number;
    distance: string;
    risk_level: string;
    sourceAddress: string;
    destinationAddress: string;
    confidence_interval: {
        lower: number;
        upper: number;
    };
    explanation: string;
}

export interface PredictionRequest {
    sourceAddress: string;
    destinationAddress: string;
    priority: string;
    trafficLevel: string;
    weatherCondition: string;
}

const trafficLevels = ['Low', 'Medium', 'High', 'Very High'];
const weatherConditions = ['Clear', 'Rainy', 'Stormy', 'Foggy', 'Snowy'];

const predictionService = {
    predictETA: async (data: PredictionRequest): Promise<PredictionResult> => {
        // Calculate approximate distance based on address strings (mock logic)
        const distance = Math.random() * 800 + 200; // 200-1000 km

        // Map form data to API format
        const requestData = {
            distance: parseFloat(distance.toFixed(2)),
            traffic_level: trafficLevels.indexOf(data.trafficLevel),
            weather_condition: weatherConditions.indexOf(data.weatherCondition),
            priority: data.priority === 'Express' ? 1 : 0,
            zone: Math.floor(Math.random() * 3) // 0: Urban, 1: Suburban, 2: Rural
        };

        let responseData;
        try {
            const response = await axios.post('http://localhost:8000/predict-eta', requestData);
            responseData = response.data;
        } catch (apiError) {
            console.warn('Backend API failed, using mock data for demonstration.', apiError);
            // Mock data fallback
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
            responseData = {
                predicted_eta: new Date(Date.now() + (distance / 40) * 3600 * 1000).toISOString(),
                estimated_hours: distance / 40,
                risk_level: 'Low',
                confidence_interval: { lower: 85, upper: 95 },
                explanation: "Based on historical data, traffic conditions are optimal. Weather is clear, suggesting no delays. The route is direct with minimal congestion expected."
            };
        }

        return {
            ...responseData,
            sourceAddress: data.sourceAddress,
            destinationAddress: data.destinationAddress,
            distance: distance.toFixed(2)
        };
    }
};

export default predictionService;
