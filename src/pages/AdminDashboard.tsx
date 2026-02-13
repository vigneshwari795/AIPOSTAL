import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [parcels, setParcels] = useState<any[]>([]);
    const [filteredParcels, setFilteredParcels] = useState<any[]>([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data - in real app, fetch from API
    useEffect(() => {
        const sampleParcels = [
            {
                trackingId: 'TRK001ABC',
                sender: 'John Doe',
                recipient: 'Jane Smith',
                status: 'In Transit',
                eta: 'Feb 12, 2026',
                delayRisk: 'Low',
                postOffice: 'Mumbai Central',
                createdAt: 'Feb 10, 2026'
            },
            {
                trackingId: 'TRK002XYZ',
                sender: 'Alice Johnson',
                recipient: 'Bob Wilson',
                status: 'Delayed',
                eta: 'Feb 13, 2026',
                delayRisk: 'High',
                postOffice: 'Delhi Main',
                createdAt: 'Feb 09, 2026'
            },
            {
                trackingId: 'TRK003DEF',
                sender: 'Mike Brown',
                recipient: 'Sarah Davis',
                status: 'Out for Delivery',
                eta: 'Feb 11, 2026',
                delayRisk: 'Low',
                postOffice: 'Bangalore Central',
                createdAt: 'Feb 10, 2026'
            },
            {
                trackingId: 'TRK004GHI',
                sender: 'Chris Lee',
                recipient: 'Emma White',
                status: 'Processing',
                eta: 'Feb 14, 2026',
                delayRisk: 'Medium',
                postOffice: 'Chennai GPO',
                createdAt: 'Feb 11, 2026'
            },
            {
                trackingId: 'TRK005JKL',
                sender: 'David Miller',
                recipient: 'Olivia Taylor',
                status: 'Delivered',
                eta: 'Feb 11, 2026',
                delayRisk: 'Low',
                postOffice: 'Hyderabad Main',
                createdAt: 'Feb 08, 2026'
            },
            {
                trackingId: 'TRK006MNO',
                sender: 'Ryan Garcia',
                recipient: 'Sophia Martinez',
                status: 'In Transit',
                eta: 'Feb 15, 2026',
                delayRisk: 'Medium',
                postOffice: 'Pune Central',
                createdAt: 'Feb 11, 2026'
            },
            {
                trackingId: 'TRK007PQR',
                sender: 'James Anderson',
                recipient: 'Ava Thomas',
                status: 'Delayed',
                eta: 'Feb 12, 2026',
                delayRisk: 'High',
                postOffice: 'Kolkata GPO',
                createdAt: 'Feb 08, 2026'
            }
        ];
        setParcels(sampleParcels);
        setFilteredParcels(sampleParcels);
    }, []);

    // Analytics
    const totalParcels = parcels.length;
    const deliveredParcels = parcels.filter(p => p.status === 'Delivered').length;
    const inTransitParcels = parcels.filter(p => p.status === 'In Transit').length;
    const delayedParcels = parcels.filter(p => p.status === 'Delayed').length;
    const highRiskParcels = parcels.filter(p => p.delayRisk === 'High').length;

    // Filter and search
    useEffect(() => {
        let filtered = parcels;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase());
        }

        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.recipient.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredParcels(filtered);
    }, [filterStatus, searchQuery, parcels]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-500 bg-opacity-20 text-green-400 border-green-500';
            case 'In Transit': return 'bg-blue-500 bg-opacity-20 text-blue-400 border-blue-500';
            case 'Out for Delivery': return 'bg-purple-500 bg-opacity-20 text-purple-400 border-purple-500';
            case 'Processing': return 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-500';
            case 'Delayed': return 'bg-[#F63049] bg-opacity-20 text-[#F63049] border-[#F63049]';
            default: return 'bg-gray-500 bg-opacity-20 text-gray-400 border-gray-500';
        }
    };

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return 'text-green-400';
            case 'Medium': return 'text-yellow-400';
            case 'High': return 'text-[#F63049]';
            default: return 'text-gray-400';
        }
    };

    const handleViewDetails = (trackingId) => {
        navigate(`/tracking/${trackingId}`);
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-300 text-lg">Comprehensive parcel management and analytics</p>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg hover:border-[#F63049] transition-all duration-300">
                        <div className="text-3xl font-bold text-[#F63049] mb-2">{totalParcels}</div>
                        <div className="text-sm text-gray-300">Total Parcels</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg hover:border-[#F63049] transition-all duration-300">
                        <div className="text-3xl font-bold text-green-400 mb-2">{deliveredParcels}</div>
                        <div className="text-sm text-gray-300">Delivered</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg hover:border-[#F63049] transition-all duration-300">
                        <div className="text-3xl font-bold text-blue-400 mb-2">{inTransitParcels}</div>
                        <div className="text-sm text-gray-300">In Transit</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg hover:border-[#F63049] transition-all duration-300">
                        <div className="text-3xl font-bold text-[#F63049] mb-2">{delayedParcels}</div>
                        <div className="text-sm text-gray-300">Delayed</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg hover:border-[#F63049] transition-all duration-300">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">{highRiskParcels}</div>
                        <div className="text-sm text-gray-300">High Risk</div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-6 shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by Tracking ID, Sender, or Recipient..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#111F35] border border-[#8A244B] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F63049] transition-colors duration-200"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-[#111F35] border border-[#8A244B] rounded-lg px-6 py-3 text-white focus:outline-none focus:border-[#F63049] transition-colors duration-200 cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="processing">Processing</option>
                                <option value="in transit">In Transit</option>
                                <option value="out for delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="delayed">Delayed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Parcels Table */}
                <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#8A244B] bg-opacity-30 border-b border-[#8A244B]">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tracking ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Sender</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Recipient</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ETA</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Delay Risk</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Post Office</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredParcels.map((parcel, index) => (
                                    <tr
                                        key={parcel.trackingId}
                                        className={`border-b border-[#8A244B] hover:bg-[#8A244B] hover:bg-opacity-20 transition-colors duration-200 ${parcel.status === 'Delayed' ? 'bg-[#F63049] bg-opacity-5' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-white">{parcel.trackingId}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{parcel.sender}</td>
                                        <td className="px-6 py-4 text-gray-300">{parcel.recipient}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(parcel.status)}`}>
                                                {parcel.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{parcel.eta}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-semibold ${getRiskColor(parcel.delayRisk)}`}>
                                                {parcel.delayRisk}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{parcel.postOffice}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewDetails(parcel.trackingId)}
                                                className="text-[#F63049] hover:text-[#D02752] font-semibold transition-colors duration-200 flex items-center"
                                            >
                                                View
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredParcels.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p className="text-gray-400 text-lg">No parcels found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 text-right text-gray-400 text-sm">
                    Showing {filteredParcels.length} of {totalParcels} parcels
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;