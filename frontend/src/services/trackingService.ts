const trackingService = {
    getParcelStatus: async (trackingId: string) => {
        // Simulate API call
        console.log('Fetching status for:', trackingId);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock response
        const isDelayed = Math.random() > 0.7; // Simulate random delay for demo

        return {
            trackingId,
            currentStatus: isDelayed ? 'Delayed' : 'In Transit',
            statusDescription: isDelayed
                ? 'Package delivery is delayed due to unforeseen circumstances.'
                : 'Package is on its way to the destination facility.',
            eta: {
                date: 'Oct 24, 2024',
                time: '2:00 PM',
                confidence: isDelayed ? 65 : 95
            },
            delayRisk: {
                level: isDelayed ? 'High' : 'Low',
                reason: isDelayed ? 'Severe weather conditions at transit hub.' : 'Traffic conditions are normal.',
                factors: isDelayed ? ['Storm warning', 'Route congestion'] : ['Clear weather', 'No road closures']
            },
            aiInsights: {
                predictedNextLocation: 'Regional Sort Facility, City B',
                predictedDeliveryDate: isDelayed ? 'Oct 26, 2024' : 'Oct 24, 2024',
                abnormalStops: isDelayed ? ['Unscheduled stop at City C due to weather'] : [],
                suggestedActions: isDelayed
                    ? ['Contact carrier for expedite options', 'Notify recipient of delay']
                    : ['No action needed', 'Monitor for updates']
            },
            timeline: [
                { status: 'In Transit', location: 'Central Hub, City A', timestamp: new Date().toISOString() },
                { status: 'Processed', location: 'Regional Facility, City B', timestamp: new Date(Date.now() - 86400000).toISOString() },
                { status: 'Booked', location: 'Local PO, City C', timestamp: new Date(Date.now() - 172800000).toISOString() }
            ],
            parcelDetails: {
                weight: '2.5 kg',
                dimensions: '30x20x15 cm',
                sender: 'John Doe',
                recipient: 'Jane Smith'
            },
            currentLocation: {
                facility: 'Central Hub',
                address: '123 Logistics Way, City A',
                lat: 12.9716,
                lng: 77.5946
            },
            destination: {
                street: '456 Delivery Ave',
                city: 'City D',
                state: 'State E',
                pincode: '654321',
                lat: 13.0827,
                lng: 80.2707
            },
            lastUpdated: 'Just now'
        };
    },

    getAssignedParcels: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        return [
            {
                trackingId: 'TRK1001',
                recipient: 'John Doe',
                destination: 'New York, NY',
                status: 'In Transit'
            },
            {
                trackingId: 'TRK1002',
                recipient: 'Jane Smith',
                destination: 'Los Angeles, CA',
                status: 'Pending'
            },
            {
                trackingId: 'TRK1003',
                recipient: 'Bob Johnson',
                destination: 'Chicago, IL',
                status: 'Delivered'
            }
        ];
    },

    updateStatus: async (trackingId: string, newStatus: string) => {
        // Simulate API call
        console.log(`Updating ${trackingId} to ${newStatus}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
    }
};

export default trackingService;
